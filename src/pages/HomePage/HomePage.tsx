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
    streetAddress: "Grønnesvegen 335",
    addressLocality: "Skåla",
    postalCode: "6456",
    addressCountry: "NO",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Takka AS",
  url: "https://takka.no",
  telephone: "+4797666969",
  email: "post@takka.no",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Grønnesvegen 335",
    addressLocality: "Skåla",
    postalCode: "6456",
    addressCountry: "NO",
  },
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
      <JsonLd schema={orgSchema} />
      <JsonLd schema={localBusinessSchema} />

      {/* Hero */}
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

      {/* About */}
      <section
        id="om-oss"
        className={styles.about}
        aria-labelledby="about-heading"
      >
        <div className={styles.aboutInner}>
          <div className={styles.aboutContent}>
            <div className={styles.aboutLeft}>
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
                loading="lazy"
              />
            </div>

            <div className={styles.aboutRight}>
              <h2 id="about-heading" className="sr-only">
                {t("about.heading")}
              </h2>
              <p>{t("about.story.p1")}</p>
              <p>{t("about.story.p2")}</p>
              <p>{t("about.story.p3")}</p>
              <p>{t("about.story.p4")}</p>
              <p>{t("about.story.p5")}</p>
              <p className={styles.signature}>{t("about.signature")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="kontakt-oss"
        className={styles.contact}
        aria-labelledby="contact-heading"
      >
        <div className={styles.contactInner}>
          <div className={styles.contactLayout}>
            <div className={styles.contactInfo}>
              <h2 id="contact-heading" className="sr-only">
                {t("contact.heading")}
              </h2>
              <p className={styles.contactCompany}>
                {t("contact.info.company")}
              </p>
              <p className={styles.contactDetail}>
                {t("contact.info.addressLine1")}
              </p>
              <p className={styles.contactDetail}>
                {t("contact.info.addressLine2")}
              </p>

              <div className={styles.contactGap} />

              <p className={styles.contactDetail}>
                {t("contact.info.phoneLabel")}: {t("contact.info.phone")}
              </p>
              <p className={styles.contactDetail}>
                {t("contact.info.emailLabel")}:{" "}
                <a
                  href={`mailto:${t("contact.info.email")}`}
                  className={styles.contactLink}
                >
                  {t("contact.info.email")}
                </a>
              </p>
            </div>

            <div className={styles.contactPerson}>
              <img
                src="/webp/Takka_Takk for sist_8.webp"
                alt={t("about.imageAlt")}
                className={styles.contactPortrait}
                loading="lazy"
              />
              <div className={styles.personCard}>
                <p className={styles.personName}>{t("contact.person.name")}</p>
                <p className={styles.personTitle}>
                  {t("contact.person.title")}
                </p>

                <div className={styles.contactGap} />

                <p className={styles.contactDetail}>
                  {t("contact.person.phoneLabel")}: {t("contact.person.phone")}
                </p>
                <p className={styles.contactDetail}>
                  {t("contact.person.emailLabel")}:{" "}
                  <a
                    href={`mailto:${t("contact.person.email")}`}
                    className={styles.contactLink}
                  >
                    {t("contact.person.email")}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
