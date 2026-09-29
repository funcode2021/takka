import { useTranslation } from "react-i18next";
import { NavLink, useParams, Navigate } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import JsonLd from "../../components/JsonLd/JsonLd";
import {
  BAKERY_ID,
  SITE_URL,
  absoluteUrl,
  breadcrumbSchema,
  graph,
} from "../../seo/schema";
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
  "gode-ravarer": "/webp/raavarer.webp",
  "hviletiden-det-tar": "/webp/Takka_Takk for sist_4.webp",
  "mot-oss-pa-marked": "/webp/Takka_Takk for sist_7.webp",
  "pa-takka": "/webp/takka.webp",
  "vi-sikter-hoyt": "/webp/Takka_Takk for sist_12.webp",
  redskap: "/webp/Takka_Takk for sist_22.webp",
};

export { EVENT_SLUGS, EVENT_KEYS, EVENT_IMAGES };

// Meta descriptions get cut off around 155 characters; end on a whole word
function summarize(text: string, max = 155) {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max - 1)) + "…";
}

export default function EventDetailPage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !EVENT_KEYS[slug]) {
    return <Navigate to="/hva-skjer" replace />;
  }

  const key = EVENT_KEYS[slug];
  const image = EVENT_IMAGES[slug];
  const label = t(`events.items.${key}.label`);
  const url = `${SITE_URL}/hva-skjer/${slug}`;

  const articleSchema = graph(
    breadcrumbSchema([
      { name: t("nav.home"), path: "/" },
      { name: t("nav.events"), path: "/hva-skjer" },
      { name: label },
    ]),
    {
      "@type": "Article",
      headline: label,
      url,
      mainEntityOfPage: url,
      image: absoluteUrl(image),
      inLanguage: "nb",
      author: { "@type": "Person", name: "Kirsti Edøy" },
      publisher: { "@id": BAKERY_ID },
      articleBody: [1, 2, 3, 4, 5]
        .map((n) => t(`events.items.${key}.story.p${n}`))
        .join("\n\n"),
    },
  );

  return (
    <>
      <SEO
        title={label}
        description={summarize(
          `${t(`events.items.${key}.story.p1`)} ${t(`events.items.${key}.story.p2`)}`,
        )}
        canonical={url}
        ogImage={image}
        ogType="article"
        noindex={label === ""}
      />
      <JsonLd schema={articleSchema} />

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
