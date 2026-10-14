// Post-build: writes per-post static HTML (real meta tags + content for crawlers),
// sitemap.xml and robots.txt into dist/.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://nyayniti.in';
const { posts } = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/generated/blogs.json'), 'utf8'));
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = (p) => (p.startsWith('http') ? p : `${SITE}${p}`);
const DEFAULT_IMAGE = `${SITE}/logo.png`;

function page({ title, description, url, image, type, jsonLd, body }) {
  const head = `
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:site_name" content="NyayNiti" />
    <meta property="og:type" content="${type}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${image}" />
    ${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>` : ''}`;

  return template
    .replace(/<title>.*?<\/title>/s, '')
    .replace(/<meta name="description"[^>]*>/, '')
    .replace('</head>', `${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

function write(rel, content) {
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

// Blog index
write(
  'blog/index.html',
  page({
    title: 'Legal Blog | NyayNiti',
    description: 'Insights on Indian law, matrimonial disputes, bail, and litigation from the advocates at NyayNiti.',
    url: `${SITE}/blog`,
    image: DEFAULT_IMAGE,
    type: 'website',
    body: `<main><h1>NyayNiti Legal Blog</h1><ul>${posts
      .map((p) => `<li><a href="/blog/${p.slug}">${esc(p.title)}</a><p>${esc(p.excerpt)}</p></li>`)
      .join('')}</ul></main>`,
  })
);

// Individual posts
for (const p of posts) {
  const url = `${SITE}/blog/${p.slug}`;
  const image = p.cover ? abs(p.cover) : DEFAULT_IMAGE;
  write(
    `blog/${p.slug}/index.html`,
    page({
      title: `${p.title} | NyayNiti`,
      description: p.excerpt,
      url,
      image,
      type: 'article',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.excerpt,
        image,
        datePublished: p.date,
        dateModified: p.updated,
        author: { '@type': 'Person', name: p.author, image: `${SITE}/authors/anubhav-jain.png` },
        publisher: { '@type': 'Organization', name: 'NyayNiti', logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE } },
        mainEntityOfPage: url,
        keywords: p.tags.join(', '),
      },
      body: `<article><h1>${esc(p.title)}</h1>${p.html}</article>`,
    })
  );
}

// Sitemap
const urls = [
  { loc: `${SITE}/`, lastmod: null },
  { loc: `${SITE}/about`, lastmod: null },
  { loc: `${SITE}/blog`, lastmod: posts[0]?.updated ?? null },
  { loc: `${SITE}/contact`, lastmod: null },
  ...posts.map((p) => ({ loc: `${SITE}/blog/${p.slug}`, lastmod: p.updated })),
];
write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
    .join('\n')}\n</urlset>\n`
);

write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`[prerender] ${posts.length} post(s), sitemap.xml, robots.txt`);
