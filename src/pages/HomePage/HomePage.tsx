import { useTranslation } from "react-i18next";
import SEO from "../../components/SEO/SEO";
import JsonLd from "../../components/JsonLd/JsonLd";
import styles from "./HomePage.module.css";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Takka AS",
  url: "https://takka.no",
  description:
    "Takka AS – din lokale partner for kvalitetsprodukter og tjenester.",
  sameAs: [
    "https://www.facebook.com/takkaas",
    "https://www.instagram.com/takkaas",
  ],
};

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t("home.title")}
        description={t("home.description")}
        canonical="https://takka.no/"
      />
      <JsonLd schema={websiteSchema} />

      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroImageWrap}>
          <img
            src="/webp/Takka_Takk for sist_13.webp"
            alt=""
            className={styles.heroImage}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width={1920}
            height={1080}
          />

          <div className={styles.textCard}>
            <h1 id="hero-heading" className="sr-only">
              {t("home.title")}
            </h1>
            <p>{t("home.hero.p1")}</p>
            <p>{t("home.hero.p2")}</p>
            <p>{t("home.hero.p3")}</p>
          </div>
        </div>

        <div className={styles.indicator} aria-hidden="true">
          <span className={styles.indicatorActive}>1</span>
          <span className={styles.indicatorSep}> / </span>
          <span className={styles.indicatorMuted}>2</span>
          <span className={styles.indicatorSep}> / </span>
          <span className={styles.indicatorMuted}>3</span>
        </div>
      </section>
    </>
  );
}
