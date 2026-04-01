import { useTranslation } from "react-i18next";
import { NavLink, Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import JsonLd from "../../components/JsonLd/JsonLd";
import { EVENT_SLUGS, EVENT_KEYS, EVENT_IMAGES } from "./EventDetailPage";
import styles from "./EventPage.module.css";

const eventSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Takka AS – Hva skjer",
  itemListElement: EVENT_SLUGS.map((slug, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: slug,
    url: `https://takka.no/hva-skjer/${slug}`,
  })),
};

/** Bento grid sizing per item index */
const SIZES: Array<"small" | "medium" | "large"> = [
  "small",
  "medium",
  "large",
  "small",
  "medium",
  "large",
];

export default function EventPage() {
  const { t } = useTranslation();

  /* Split items into 3 columns: [0,3], [1,4], [2,5] */
  const columns = [
    [0, 3],
    [1, 4],
    [2, 5],
  ];

  return (
    <>
      <SEO
        title={t("events.title")}
        description={t("events.description")}
        canonical="https://takka.no/hva-skjer"
      />
      <JsonLd schema={eventSchema} />

      <section className={styles.page} aria-labelledby="events-heading">
        <div className={styles.inner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <NavLink to="/" className={styles.breadcrumbLink}>
              {t("nav.home")}
            </NavLink>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{t("nav.events")}</span>
          </nav>

          <h1 id="events-heading" className="sr-only">
            {t("events.heading")}
          </h1>

          <div className={styles.grid} role="list">
            {columns.map((indices, colIdx) => (
              <div key={colIdx} className={styles.column}>
                {indices.map((i) => {
                  const slug = EVENT_SLUGS[i];
                  const key = EVENT_KEYS[slug];
                  const image = EVENT_IMAGES[slug];
                  const size = SIZES[i];
                  return (
                    <Link
                      key={slug}
                      to={`/hva-skjer/${slug}`}
                      className={`${styles.card} ${styles[size]}`}
                      role="listitem"
                      aria-label={t(`events.items.${key}.label`)}
                    >
                      <img
                        src={image}
                        alt=""
                        className={styles.cardImage}
                        loading={i < 3 ? "eager" : "lazy"}
                      />
                      <span className={styles.cardLabel}>
                        {t(`events.items.${key}.label`)}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          <div className={styles.indicator} aria-hidden="true">
            <span className={styles.indicatorActive}>1</span>
            <span className={styles.indicatorSep}>/</span>
            <span>2</span>
            <span className={styles.indicatorSep}>/</span>
            <span>3</span>
          </div>
        </div>
      </section>
    </>
  );
}
