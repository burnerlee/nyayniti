// Pulls blog posts from Notion into src/generated/blogs.json. Each child page of NOTION_BLOG_PARENT_ID
// is one post. If unset, falls back to every top-level page shared with the integration (except the
// attorneys page), optionally narrowed by NOTION_BLOG_TITLE_REGEX. The "Meet Our Attorneys" page's inline database feeds src/generated/attorneys.json.
// Needs NOTION_TOKEN (env or .env). Without it the existing JSON is kept.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_FILE = path.join(ROOT, 'src/generated/blogs.json');
const IMG_DIR = path.join(ROOT, 'public/blog-images');
const ATTORNEYS_FILE = path.join(ROOT, 'src/generated/attorneys.json');
const ATTORNEYS_IMG_DIR = path.join(ROOT, 'public/attorney-images');
const ATTORNEYS_TITLE_RE = new RegExp(process.env.NOTION_ATTORNEYS_TITLE_REGEX || '^\\s*meet our attorneys\\s*$', 'i');
const NOTION_VERSION = '2022-06-28';

loadDotEnv();
const { NOTION_TOKEN, NOTION_BLOG_PARENT_ID } = process.env;
const TITLE_RE = new RegExp(process.env.NOTION_BLOG_TITLE_REGEX || '.', 'i');

if (!NOTION_TOKEN) {
  console.warn('[notion] NOTION_TOKEN not set, keeping existing blogs.json');
  process.exit(0);
}

function loadDotEnv() {
  const file = path.join(ROOT, '.env');
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

async function notion(endpoint, body) {
  const res = await fetch(`https://api.notion.com/v1/${endpoint}`, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`Notion ${endpoint} -> ${res.status} ${await res.text()}`);
  return res.json();
}

async function paginate(endpoint, body) {
  const results = [];
  let cursor;
  do {
    const sep = endpoint.includes('?') ? '&' : '?';
    const page = body
      ? await notion(endpoint, { ...body, start_cursor: cursor })
      : await notion(`${endpoint}${cursor ? `${sep}start_cursor=${cursor}` : ''}`);
    results.push(...page.results);
    cursor = page.has_more ? page.next_cursor : undefined;
  } while (cursor);
  return results;
}

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const slugify = (s) =>
  s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-');

const unesc = (s) =>
  s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');

const STOP_WORDS = new Set(
  'a an the of to in on for and or but is are was be can could will would do does you your it its that this with by at from as how what why when who which if'.split(' ')
);
// Words that read as unfinished when a slug ends on them ("...-judgment-still").
const DANGLING = new Set(['still', 'not', 'before', 'after', 'whether', 'during', 'without', 'because', 'between', 'under']);

// Short, readable URL from the headline: the topic before ':' or '?', stop words dropped, <= 6 words.
const shortSlug = (title) => {
  const head = title.split(/[:?]/)[0];
  const base = head.trim().split(/\s+/).length >= 3 ? head : title;
  const words = slugify(base.replace(/[–—]/g, ' ')).split('-').filter(Boolean);
  const keep = words.filter((w) => !STOP_WORDS.has(w));
  const pick = (keep.length >= 3 ? keep : words).slice(0, 6);
  while (pick.length > 2 && DANGLING.has(pick[pick.length - 1])) pick.pop();
  return pick.join('-');
};

const plain = (rt = []) => rt.map((t) => t.plain_text).join('');

function richText(rt = []) {
  return rt
    .map((t) => {
      let s = esc(t.plain_text).replace(/\n/g, '<br />');
      const a = t.annotations || {};
      if (a.code) s = `<code>${s}</code>`;
      if (a.bold) s = `<strong>${s}</strong>`;
      if (a.italic) s = `<em>${s}</em>`;
      if (a.strikethrough) s = `<s>${s}</s>`;
      if (a.underline) s = `<u>${s}</u>`;
      if (t.href) {
        const external = /^https?:\/\//.test(t.href) && !t.href.startsWith('https://nyayniti.in');
        s = `<a href="${esc(t.href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${s}</a>`;
      }
      return s;
    })
    .join('');
}

// Notion-hosted file URLs expire after ~1h, so copy images into the build.
async function localizeImage(url, key, dir = IMG_DIR, urlBase = '/blog-images') {
  const clean = new URL(url);
  const ext = path.extname(clean.pathname).toLowerCase().replace(/[^.a-z0-9]/g, '') || '.jpg';
  const name = `${crypto.createHash('sha1').update(key).digest('hex').slice(0, 12)}${ext}`;
  fs.mkdirSync(dir, { recursive: true });
  const dest = path.join(dir, name);
  if (!fs.existsSync(dest)) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`image ${res.status}: ${clean.origin}${clean.pathname}`);
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  }
  return `${urlBase}/${name}`;
}

async function fileUrl(file, key) {
  const url = file.type === 'external' ? file.external.url : file.file.url;
  try {
    return await localizeImage(url, key);
  } catch (e) {
    console.warn(`[notion] ${e.message}`);
    return null;
  }
}

async function blocksToHtml(blockId) {
  const blocks = await paginate(`blocks/${blockId}/children?page_size=100`);
  let html = '';
  let openList = null;
  const closeList = () => {
    if (openList) html += `</${openList}>`;
    openList = null;
  };

  for (const b of blocks) {
    const d = b[b.type];
    const listTag = b.type === 'bulleted_list_item' ? 'ul' : b.type === 'numbered_list_item' ? 'ol' : null;
    if (openList && openList !== listTag) closeList();
    const children = b.has_children && b.type !== 'child_page' ? await blocksToHtml(b.id) : '';

    switch (b.type) {
      case 'paragraph':
        if (plain(d.rich_text)) html += `<p>${richText(d.rich_text)}</p>`;
        html += children;
        break;
      case 'heading_1':
      case 'heading_2':
      case 'heading_3': {
        // Page title is the h1, so shift headings down one level.
        const level = Number(b.type.slice(-1)) + 1;
        html += `<h${level} id="${slugify(plain(d.rich_text))}">${richText(d.rich_text)}</h${level}>`;
        break;
      }
      case 'bulleted_list_item':
      case 'numbered_list_item':
        if (!openList) {
          openList = listTag;
          html += `<${listTag}>`;
        }
        html += `<li>${richText(d.rich_text)}${children}</li>`;
        break;
      case 'quote':
        html += `<blockquote>${richText(d.rich_text)}${children}</blockquote>`;
        break;
      case 'callout':
        html += `<aside class="callout">${richText(d.rich_text)}${children}</aside>`;
        break;
      case 'code':
        html += `<pre><code>${esc(plain(d.rich_text))}</code></pre>`;
        break;
      case 'divider':
        html += '<hr />';
        break;
      case 'toggle':
        html += `<details><summary>${richText(d.rich_text)}</summary>${children}</details>`;
        break;
      case 'to_do':
        html += `<p>${d.checked ? '☑' : '☐'} ${richText(d.rich_text)}</p>`;
        break;
      case 'image': {
        const src = await fileUrl(d, b.id);
        if (src) {
          const caption = plain(d.caption);
          html += `<figure><img src="${src}" alt="${esc(caption)}" loading="lazy" />${
            caption ? `<figcaption>${richText(d.caption)}</figcaption>` : ''
          }</figure>`;
        }
        break;
      }
      case 'bookmark':
      case 'embed':
      case 'link_preview':
        html += `<p><a href="${esc(d.url)}" target="_blank" rel="noopener noreferrer">${esc(d.url)}</a></p>`;
        break;
      case 'table': {
        const rows = await paginate(`blocks/${b.id}/children?page_size=100`);
        html += '<div class="table-wrap"><table>';
        rows.forEach((row, i) => {
          const tag = i === 0 && d.has_column_header ? 'th' : 'td';
          html += `<tr>${row.table_row.cells.map((c) => `<${tag}>${richText(c)}</${tag}>`).join('')}</tr>`;
        });
        html += '</table></div>';
        break;
      }
      case 'column_list':
      case 'column':
      case 'synced_block':
        html += children;
        break;
      default:
        console.warn(`[notion] unsupported block "${b.type}" skipped`);
    }
  }
  closeList();
  return html;
}

const prop = (page, name, type) => {
  const p = Object.entries(page.properties).find(
    ([k, v]) => k.toLowerCase() === name.toLowerCase() && (!type || v.type === type)
  );
  return p?.[1];
};

async function fetchAttorneys(page, heading) {
  const blocks = await paginate(`blocks/${page.id}/children?page_size=100`);
  const db = blocks.find((b) => b.type === 'child_database');
  if (!db) {
    console.warn('[notion] no inline database on attorneys page, keeping existing attorneys.json');
    return;
  }
  const rows = await paginate(`databases/${db.id}/query`, {
    filter: { property: 'Enabled', checkbox: { equals: true } },
    // The API can't read a view's drag order, so Order sets display order; created_time breaks ties.
    sorts: [
      { property: 'Order', direction: 'ascending' },
      { timestamp: 'created_time', direction: 'ascending' },
    ],
  });

  const attorneys = [];
  for (const row of rows) {
    const name = plain(prop(row, 'Name', 'title')?.title).trim();
    if (!name) continue;
    const file = prop(row, 'Image', 'files')?.files?.[0];
    let image = null;
    if (file) {
      const url = file.type === 'external' ? file.external.url : file.file.url;
      try {
        image = await localizeImage(url, `attorney-${row.id}`, ATTORNEYS_IMG_DIR, '/attorney-images');
      } catch (e) {
        console.warn(`[notion] ${e.message}`);
      }
    }
    attorneys.push({ name, title: plain(prop(row, 'Position', 'rich_text')?.rich_text).trim(), image });
    console.log(`[notion] attorney: ${name}`);
  }

  fs.mkdirSync(path.dirname(ATTORNEYS_FILE), { recursive: true });
  fs.writeFileSync(ATTORNEYS_FILE, JSON.stringify({ heading, attorneys }, null, 2) + '\n');
  console.log(`[notion] wrote ${attorneys.length} attorney(s)`);
}

async function main() {
  const all = await paginate('search', { filter: { property: 'object', value: 'page' } });
  const titleOf = (pg) => plain(Object.values(pg.properties).find((p) => p.type === 'title')?.title).trim();
  const topLevel = all.filter((pg) => !pg.archived && pg.parent.type === 'workspace');
  const attorneysPage = topLevel.find((pg) => ATTORNEYS_TITLE_RE.test(titleOf(pg)));

  let pages;
  if (NOTION_BLOG_PARENT_ID) {
    const children = await paginate(`blocks/${NOTION_BLOG_PARENT_ID}/children?page_size=100`);
    pages = await Promise.all(children.filter((b) => b.type === 'child_page').map((b) => notion(`pages/${b.id}`)));
    pages = pages.filter((pg) => !pg.archived);
  } else {
    console.warn('[notion] NOTION_BLOG_PARENT_ID not set, using every top-level page as a post');
    pages = topLevel.filter((pg) => pg !== attorneysPage && TITLE_RE.test(titleOf(pg)));
  }

  if (attorneysPage) await fetchAttorneys(attorneysPage, titleOf(attorneysPage));
  else console.warn('[notion] "Meet Our Attorneys" page not found, keeping existing attorneys.json');

  let previous = new Map();
  try {
    const old = JSON.parse(fs.readFileSync(OUT_FILE, 'utf8')).posts;
    // Key by page id; fall back to slug for entries written before ids were stored.
    previous = new Map(old.flatMap((p) => [[p.id ?? `slug:${p.slug}`, p]]));
  } catch {
    // no previous file
  }

  const posts = [];
  for (const page of pages) {
    const titleProp = Object.values(page.properties).find((p) => p.type === 'title');
    const title = plain(titleProp?.title).trim();
    if (!title) continue;

    let html = await blocksToHtml(page.id);
    // Drop a leading heading that just repeats the page title (the page renders its own h1).
    const lead = html.match(/^<h2 id="[^"]*">(.*?)<\/h2>/);
    if (lead && unesc(lead[1].replace(/<[^>]+>/g, '')).trim() === title) html = html.slice(lead[0].length);
    // An image right after the heading is the cover; lift it out of the body.
    let inlineCover = null;
    const lift = html.match(/^(<h[2-4] id="[^"]*">.*?<\/h[2-4]>)?<figure><img src="([^"]+)"[^>]*\/>(?:<figcaption>.*?<\/figcaption>)?<\/figure>/);
    if (lift) {
      inlineCover = lift[2];
      html = (lift[1] ?? '') + html.slice(lift[0].length);
    }

    const slug = plain(prop(page, 'Slug', 'rich_text')?.rich_text).trim() || shortSlug(title);
    const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    const excerptProp = plain(prop(page, 'Excerpt', 'rich_text')?.rich_text).trim();
    const dateProp = prop(page, 'Date', 'date')?.date?.start;

    // Slugs this page had in the last committed blogs.json stay as redirects (shared links keep working).
    const prev = previous.get(page.id) ?? previous.get(`slug:${slug}`);
    const aliases = [...new Set([...(prev?.aliases ?? []), ...(prev && prev.slug !== slug ? [prev.slug] : [])])].filter((a) => a !== slug);

    posts.push({
      id: page.id,
      slug,
      aliases,
      title,
      excerpt: excerptProp || html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 157) + '...',
      date: dateProp || page.created_time.slice(0, 10),
      updated: page.last_edited_time.slice(0, 10),
      author: plain(prop(page, 'Author', 'rich_text')?.rich_text).trim() || 'Adv. Anubhav Jain',
      tags: (prop(page, 'Tags', 'multi_select')?.multi_select || []).map((t) => t.name),
      cover: inlineCover ?? (page.cover ? await fileUrl(page.cover, `cover-${page.id}`) : null),
      readTime: `${Math.max(1, Math.round(words / 200))} min read`,
      html,
    });
    console.log(`[notion] ${slug}`);
  }

  const dupes = posts.map((p) => p.slug).filter((s, i, all) => all.indexOf(s) !== i);
  if (dupes.length) throw new Error(`duplicate slugs: ${[...new Set(dupes)].join(', ')}`);

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, JSON.stringify({ posts }, null, 2) + '\n');
  console.log(`[notion] wrote ${posts.length} post(s)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
