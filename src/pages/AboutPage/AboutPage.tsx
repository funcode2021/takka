import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import JsonLd from "../../components/JsonLd/JsonLd";
import styles from "./AboutPage.module.css";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Takka AS",
  url: "https://takka.no",
  logo: "https://takka.no/logo.png",
  sameAs: [
    "https://www.facebook.com/takkaas",
    "https://www.instagram.com/takkaas",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Eksempelgata 1",
    addressLocality: "Oslo",
    postalCode: "0001",
    addressCountry: "NO",
  },
};

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t("about.title")}
        description={t("about.description")}
        canonical="https://takka.no/om-oss"
      />
      <JsonLd schema={orgSchema} />

      <article className={styles.page}>
        <div className={styles.inner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <NavLink to="/" className={styles.breadcrumbLink}>
              {t("nav.home")}
            </NavLink>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{t("nav.about")}</span>
          </nav>

          <div className={styles.content}>
            <div className={styles.left}>
              <img
                src="/bumerker.svg"
                alt=""
                className={styles.bumerker}
                aria-hidden="true"
              />
              <img
                src="/webp/Takka_Takk for sist_8.webp"
                alt={t("about.imageAlt")}
                className={styles.portrait}
              />
            </div>

            <div className={styles.right}>
              <h1 className="sr-only">{t("about.heading")}</h1>
              <p>{t("about.story.p1")}</p>
              <p>{t("about.story.p2")}</p>
              <p>{t("about.story.p3")}</p>
              <p>{t("about.story.p4")}</p>
              <p>{t("about.story.p5")}</p>
              <p className={styles.signature}>{t("about.signature")}</p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
