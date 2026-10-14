// Post-build: writes static HTML with real meta tags + content for every page and post (for crawlers),
// plus sitemap.xml and robots.txt, into dist/.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://nyayniti.in';
const { posts } = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/generated/blogs.json'), 'utf8'));
const pages = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/utils/pages.json'), 'utf8'));
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = (p) => (p.startsWith('http') ? p : `${SITE}${p}`);
const LOGO = `${SITE}/logo.png`;
const DEFAULT_IMAGE = `${SITE}/og-default.jpg`; // 1200x630 share image

// Trim on a word boundary so search snippets don't end mid-word.
const clip = (s, max) => {
  const t = s.replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,:;.\-–]+$/, '') + '…';
};
// Keep the full headline in the h1; only the <title> is shortened (Google shows ~60 chars).
const postTitle = (t) => {
  const full = `${t} | NyayNiti`;
  return full.length <= 65 ? full : `${clip(t, 65 - 12)} | NyayNiti`;
};

const FIRM = {
  '@type': 'LegalService',
  '@id': `${SITE}/#firm`,
  name: 'NyayNiti',
  url: `${SITE}/`,
  logo: LOGO,
  image: DEFAULT_IMAGE,
  email: 'nyaynitilegal@gmail.com',
  telephone: '+91-85889-93524',
  priceRange: 'Free first consultation',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '29/181, Vikram Vihar, Lajpat Nagar IV',
    addressLocality: 'New Delhi',
    addressRegion: 'Delhi',
    postalCode: '110024',
    addressCountry: 'IN',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:00',
    closes: '21:00',
  },
  areaServed: 'IN',
  knowsAbout: ['Matrimonial law', 'Criminal defence', 'Civil disputes', 'Money laundering', 'Constitutional matters', 'Intellectual property law', 'Sports law'],
  sameAs: [
    'https://www.instagram.com/nyayniti_associates',
    'https://www.linkedin.com/company/nyayniti',
    'https://www.youtube.com/@advocateshubhamkumar',
  ],
};

function page({ title, description, url, image, type, jsonLd, body, preload }) {
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
    <meta property="og:locale" content="en_IN" />
    ${preload ? `<link rel="preload" as="image" href="${preload}" />` : ''}
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

// Built asset URL for a source image, e.g. "hero-home" -> /assets/hero-home-abc123.webp
const distAssets = fs.readdirSync(path.join(DIST, 'assets'));
const assetUrl = (name) => {
  const f = distAssets.find((a) => new RegExp(`^${name}-[\\w]+\\.webp$`).test(a));
  return f ? `/assets/${f}` : null;
};

const pageBody = (key, extra = '') => `<main><h1>${esc(pages[key].h1)}</h1><p>${esc(pages[key].description)}</p>${extra}</main>`;
const home = pages['/'];

for (const [route, meta] of Object.entries(pages)) {
  const url = route === '/' ? `${SITE}/` : `${SITE}${route}`;
  const jsonLd = [];
  if (route === '/') {
    jsonLd.push(FIRM, { '@context': 'https://schema.org', '@type': 'WebSite', url: `${SITE}/`, name: 'NyayNiti', publisher: { '@id': `${SITE}/#firm` } });
  }
  if (route === '/contact') jsonLd.push({ '@context': 'https://schema.org', '@type': 'ContactPage', url, mainEntity: { '@id': `${SITE}/#firm` } });
  if (route === '/about') jsonLd.push({ '@context': 'https://schema.org', '@type': 'AboutPage', url, about: { '@id': `${SITE}/#firm` } });
  if (route !== '/') {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: meta.h1, item: url },
      ],
    });
  }
  // @context lives on each node; the firm node needs one too when emitted alone
  const nodes = jsonLd.map((n) => (n['@context'] ? n : { '@context': 'https://schema.org', ...n }));

  const body =
    route === '/blog'
      ? pageBody(route, `<ul>${posts.map((p) => `<li><a href="/blog/${p.slug}">${esc(p.title)}</a><p>${esc(p.excerpt)}</p></li>`).join('')}</ul>`)
      : pageBody(route, route === '/' ? '<nav><a href="/about">About</a> <a href="/blog">Blog</a> <a href="/contact">Contact</a></nav>' : '');
  const html = page({
    title: meta.title,
    description: meta.description,
    url,
    image: DEFAULT_IMAGE,
    type: 'website',
    jsonLd: nodes.length === 1 ? nodes[0] : nodes,
    body,
    preload: meta.preload ? assetUrl(meta.preload) : null,
  });
  write(route === '/' ? 'index.html' : `${route.slice(1)}/index.html`, html);
}

// Individual posts
for (const p of posts) {
  const url = `${SITE}/blog/${p.slug}`;
  const image = p.cover ? abs(p.cover) : DEFAULT_IMAGE;
  write(
    `blog/${p.slug}/index.html`,
    page({
      title: postTitle(p.title),
      description: clip(p.excerpt, 155),
      url,
      image,
      type: 'article',
      jsonLd: [{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
          { '@type': 'ListItem', position: 3, name: p.title, item: url },
        ],
      }, {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: p.title,
        description: clip(p.excerpt, 155),
        image,
        datePublished: p.date,
        dateModified: p.updated,
        author: { '@type': 'Person', name: p.author, image: `${SITE}/authors/anubhav-jain.png` },
        publisher: { '@type': 'Organization', name: 'NyayNiti', logo: { '@type': 'ImageObject', url: LOGO } },
        mainEntityOfPage: url,
        keywords: p.tags.join(', '),
      }],
      body: `<article><h1>${esc(p.title)}</h1>${p.html}</article>`,
    })
  );
}

// Old slugs -> current slug (301), so previously shared or indexed links keep working
write(
  '_redirects',
  posts.flatMap((p) => (p.aliases ?? []).map((a) => `/blog/${a} /blog/${p.slug} 301`)).join('\n') + '\n'
);

// 404 page: noindex, client router renders the not-found state
write(
  '404.html',
  page({
    title: 'Page not found | NyayNiti',
    description: 'The page you are looking for does not exist.',
    url: `${SITE}/404`,
    image: DEFAULT_IMAGE,
    type: 'website',
    body: '<main><h1>Page not found</h1><p><a href="/">Back to the NyayNiti home page</a></p></main>',
  }).replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>')
);

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

console.log(`[prerender] ${Object.keys(pages).length} page(s), ${posts.length} post(s), sitemap.xml, robots.txt`);
