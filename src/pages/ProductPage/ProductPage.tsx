import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import JsonLd from "../../components/JsonLd/JsonLd";
import {
  BAKERY_ID,
  SITE_URL,
  absoluteUrl,
  breadcrumbSchema,
  graph,
} from "../../seo/schema";
import styles from "./ProductPage.module.css";

const PRODUCTS = [
  {
    key: "solemdalslefse",
    image: "/webp/Takka_Takk for sist_26.webp",
    spesialitet: true,
  },
  {
    key: "buggelefse",
    image: "/webp/Takka_Takk for sist_34.webp",
    spesialitet: false,
  },
  {
    key: "morsLefse",
    image: "/webp/Takka_Takk for sist_25.webp",
    spesialitet: true,
  },
] as const;

export default function ProductPage() {
  const { t } = useTranslation();

  const productSchema = graph(
    breadcrumbSchema([
      { name: t("nav.home"), path: "/" },
      { name: t("nav.product") },
    ]),
    {
      "@type": "ItemList",
      name: t("product.heading"),
      itemListElement: PRODUCTS.map(({ key, image, spesialitet }, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: t(`product.items.${key}.name`),
          description: t(`product.items.${key}.desc1`),
          image: absoluteUrl(image),
          category: "Lefse",
          brand: { "@type": "Brand", name: "Takka" },
          manufacturer: { "@id": BAKERY_ID },
          countryOfOrigin: "NO",
          ...(spesialitet && { award: "Spesialitet (Matmerk)" }),
        },
      })),
    },
  );

  return (
    <>
      <SEO
        title={t("product.title")}
        description={t("product.description")}
        canonical={`${SITE_URL}/produkt`}
      />
      <JsonLd schema={productSchema} />

      <section className={styles.page} aria-labelledby="product-heading">
        <div className={styles.inner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <NavLink to="/" className={styles.breadcrumbLink}>
              {t("nav.home")}
            </NavLink>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{t("nav.product")}</span>
          </nav>

          <h1 id="product-heading" className="sr-only">
            {t("product.heading")}
          </h1>

          <ul className={styles.grid} role="list">
            {PRODUCTS.map(({ key, image, spesialitet }, i) => (
              <li key={key} className={styles.card}>
                <div className={styles.cardImageWrap}>
                  <img
                    src={image}
                    alt={t(`product.items.${key}.name`)}
                    className={styles.cardImage}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  <span className={styles.cardLabel}>
                    {t(`product.items.${key}.name`)}
                  </span>
                  {spesialitet && (
                    <img
                      src="/spesialitet.svg"
                      alt="Spesialitet"
                      className={styles.spesialitet}
                    />
                  )}
                  {i === PRODUCTS.length - 1 && (
                    <img
                      src="/bumerker.svg"
                      alt=""
                      className={styles.bumerker}
                      aria-hidden="true"
                    />
                  )}
                </div>
                <div className={styles.cardBody}>
                  <p>{t(`product.items.${key}.desc1`)}</p>
                  <p>{t(`product.items.${key}.desc2`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
