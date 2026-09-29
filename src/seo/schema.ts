// Shared schema.org data. Pages reference the bakery by @id instead of
// repeating it, so search engines and AI crawlers see a single entity.

export const SITE_URL = "https://www.takka.no";
export const BAKERY_ID = `${SITE_URL}/#bakery`;

// Crawlers need absolute URLs; also encodes the spaces in image file names
export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : SITE_URL + encodeURI(path);

export const bakerySchema = {
  "@type": "Bakery",
  "@id": BAKERY_ID,
  name: "Takka AS",
  alternateName: "Takka",
  url: `${SITE_URL}/`,
  logo: absoluteUrl("/logo.png"),
  image: absoluteUrl("/og-image.jpg"),
  description:
    "Lefsebakeri på Skåla i Romsdal som baker tradisjonelle lefser for hånd etter gamle oppskrifter: Solemdalslefse, Buggelefse og Mors Tynnlefse. Selges hos COOP Mega, COOP Extra og Bunnpris i Møre og Romsdal, på REKO-ringen og på lokale markeder.",
  telephone: "+4797666969",
  email: "post@takka.no",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Grønnesvegen 335",
    postalCode: "6456",
    addressLocality: "Skåla",
    addressRegion: "Møre og Romsdal",
    addressCountry: "NO",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Møre og Romsdal" },
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Organisasjonsnummer",
    value: "937001673",
  },
  founder: {
    "@type": "Person",
    name: "Kirsti Edøy",
    jobTitle: "Daglig leder og lefsebaker",
    email: "kirsti@takka.no",
  },
  knowsAbout: [
    "Lefse",
    "Tradisjonsbakst",
    "Solemdalslefse",
    "Buggelefse",
    "Tynnlefse",
  ],
  sameAs: [
    "https://www.facebook.com/takkaas",
    "https://www.instagram.com/takkaas",
    "https://virksomhet.brreg.no/nb/oppslag/enheter/937001673",
  ],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Takka",
  url: `${SITE_URL}/`,
  inLanguage: "nb",
  publisher: { "@id": BAKERY_ID },
};

/** Mirrors the visible breadcrumb; `path` is omitted for the current page. */
export function breadcrumbSchema(items: Array<{ name: string; path?: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      ...(path && { item: `${SITE_URL}${path}` }),
    })),
  };
}

export const graph = (...nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
