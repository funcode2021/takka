import { StrictMode } from "react";
import { prerender } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import i18n from "./i18n/index.ts";
import { AppContent } from "./App.tsx";
import { EVENT_SLUGS, EVENT_KEYS } from "./pages/EventPage/EventDetailPage.tsx";

export const routes = [
  "/",
  "/produkt",
  "/hva-skjer",
  ...EVENT_SLUGS.map((slug) => `/hva-skjer/${slug}`),
];

// Event pages without a title yet are prerendered but kept out of the sitemap
export const sitemapRoutes = routes.filter((route) => {
  const slug = route.match(/^\/hva-skjer\/(.+)$/)?.[1];
  return !slug || i18n.t(`events.items.${EVENT_KEYS[slug]}.label`) !== "";
});

export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <HelmetProvider>
        <StaticRouter location={url}>
          <AppContent />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
  );
  return new Response(prelude).text();
}
