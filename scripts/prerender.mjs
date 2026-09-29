// Renders every route to static HTML after `vite build`, so crawlers (and AI
// crawlers that don't run JavaScript) get real content and metadata.
// Also writes sitemap.xml from the same route list, so the two can't drift.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const SITE = "https://takka.no";

const { render, routes, sitemapRoutes } = await import(
  path.join(root, "dist-server/entry-server.js")
);

const template = await fs.readFile(path.join(dist, "index.html"), "utf8");

// Untouched SPA shell for URLs that aren't prerendered (see netlify.toml)
await fs.writeFile(path.join(dist, "spa.html"), template);

// React 19 emits hoistable tags (<title>, <meta>, <link>) ahead of the app markup
const HOISTED = /^(?:<title>[^<]*<\/title>|<meta [^>]*\/>|<link [^>]*\/>)+/;

for (const route of routes) {
  const rendered = await render(route);
  const head = rendered.match(HOISTED)?.[0] ?? "";
  const body = rendered.slice(head.length);

  const html = template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, head)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  // /produkt → produkt.html: Netlify serves it at /produkt with no trailing-slash redirect
  const file = path.join(dist, route === "/" ? "index.html" : `${route}.html`);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html);
  console.log(`prerendered ${route}`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map(
    (route) =>
      `  <url>\n    <loc>${SITE}${route}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
  )
  .join("\n")}
</urlset>
`;
await fs.writeFile(path.join(dist, "sitemap.xml"), sitemap);
console.log(`wrote sitemap.xml (${sitemapRoutes.length} urls)`);

await fs.rm(path.join(root, "dist-server"), { recursive: true, force: true });
