import { useTranslation } from "react-i18next";
import { NavLink, useParams, Navigate } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import styles from "./EventDetailPage.module.css";

const EVENT_SLUGS = [
  "gode-ravarer",
  "hviletiden-det-tar",
  "mot-oss-pa-marked",
  "pa-takka",
  "vi-sikter-hoyt",
  "redskap",
] as const;

const EVENT_KEYS: Record<string, string> = {
  "gode-ravarer": "godeRavarer",
  "hviletiden-det-tar": "hviletidenDetTar",
  "mot-oss-pa-marked": "motOssPaMarked",
  "pa-takka": "paTakka",
  "vi-sikter-hoyt": "viSikterHoyt",
  redskap: "redskap",
};

const EVENT_IMAGES: Record<string, string> = {
  "gode-ravarer": "/webp/Takka_Takk for sist_1.webp",
  "hviletiden-det-tar": "/webp/Takka_Takk for sist_4.webp",
  "mot-oss-pa-marked": "/webp/Takka_Takk for sist_7.webp",
  "pa-takka": "/webp/Takka_Takk for sist_6.webp",
  "vi-sikter-hoyt": "/webp/Takka_Takk for sist_12.webp",
  redskap: "/webp/Takka_Takk for sist_22.webp",
};

export { EVENT_SLUGS, EVENT_KEYS, EVENT_IMAGES };

export default function EventDetailPage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !EVENT_KEYS[slug]) {
    return <Navigate to="/hva-skjer" replace />;
  }

  const key = EVENT_KEYS[slug];
  const image = EVENT_IMAGES[slug];

  return (
    <>
      <SEO
        title={`${t(`events.items.${key}.label`)} – Takka AS`}
        description={t(`events.items.${key}.story.p1`)}
        canonical={`https://takka.no/hva-skjer/${slug}`}
      />

      <section className={styles.page}>
        <div className={styles.inner}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <NavLink to="/" className={styles.breadcrumbLink}>
              {t("nav.home")}
            </NavLink>
            <span className={styles.breadcrumbSep}>/</span>
            <NavLink to="/hva-skjer" className={styles.breadcrumbLink}>
              {t("nav.events")}
            </NavLink>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>
              {t(`events.items.${key}.label`)}
            </span>
          </nav>

          <div className={styles.layout}>
            <div className={styles.content}>
              <h1 className={styles.heading}>
                {t(`events.items.${key}.label`)}
              </h1>
              <div className={styles.story}>
                <p>{t(`events.items.${key}.story.p1`)}</p>
                <p>{t(`events.items.${key}.story.p2`)}</p>
                <p>{t(`events.items.${key}.story.p3`)}</p>
                <p>{t(`events.items.${key}.story.p4`)}</p>
                <p>{t(`events.items.${key}.story.p5`)}</p>
              </div>
            </div>
            <div className={styles.imageWrap}>
              <img
                src={image}
                alt={t(`events.items.${key}.label`)}
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
