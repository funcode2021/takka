import { useTranslation } from 'react-i18next'
import SEO from '../../components/SEO/SEO'
import JsonLd from '../../components/JsonLd/JsonLd'
import styles from './AboutPage.module.css'

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Takka AS',
  url: 'https://takka.no',
  logo: 'https://takka.no/logo.png',
  sameAs: [
    'https://www.facebook.com/takkaas',
    'https://www.instagram.com/takkaas',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Eksempelgata 1',
    addressLocality: 'Oslo',
    postalCode: '0001',
    addressCountry: 'NO',
  },
}

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <>
      <SEO
        title={t('about.title')}
        description={t('about.description')}
        canonical="https://takka.no/om-oss"
      />
      <JsonLd schema={orgSchema} />

      <article className={styles.page}>
        <div className={styles.inner}>
          <h1 className={styles.heading}>{t('about.heading')}</h1>

          <section className={styles.section} aria-labelledby="history-heading">
            <h2 id="history-heading" className={styles.sectionHeading}>
              {t('about.history.heading')}
            </h2>
            <p className={styles.text}>{t('about.history.text')}</p>
          </section>

          <section className={styles.section} aria-labelledby="values-heading">
            <h2 id="values-heading" className={styles.sectionHeading}>
              {t('about.values.heading')}
            </h2>
            <ul className={styles.valueList} role="list">
              {(['integrity', 'innovation', 'community'] as const).map((key) => (
                <li key={key} className={styles.valueCard}>
                  <h3 className={styles.valueTitle}>{t(`about.values.${key}.title`)}</h3>
                  <p className={styles.valueText}>{t(`about.values.${key}.text`)}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section} aria-labelledby="team-heading">
            <h2 id="team-heading" className={styles.sectionHeading}>
              {t('about.team.heading')}
            </h2>
            <p className={styles.text}>{t('about.team.text')}</p>
          </section>
        </div>
      </article>
    </>
  )
}
