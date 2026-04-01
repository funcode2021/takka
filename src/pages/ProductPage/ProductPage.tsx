import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import JsonLd from "../../components/JsonLd/JsonLd";
import styles from "./ProductPage.module.css";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Takka AS – Produkter",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Solemdalslefse" },
    { "@type": "ListItem", position: 2, name: "Buggelefse" },
    { "@type": "ListItem", position: 3, name: "Mors lefse" },
  ],
};

const PRODUCTS = [
  { key: "solemdalslefse", image: "/webp/Takka_Takk for sist_26.webp" },
  { key: "buggelefse", image: "/webp/Takka_Takk for sist_34.webp" },
  { key: "morsLefse", image: "/webp/Takka_Takk for sist_25.webp" },
] as const;

export default function ProductPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t("product.title")}
        description={t("product.description")}
        canonical="https://takka.no/produkt"
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
            {PRODUCTS.map(({ key, image }, i) => (
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
