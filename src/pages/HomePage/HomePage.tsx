import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO/SEO'
import JsonLd from '../../components/JsonLd/JsonLd'
import styles from './HomePage.module.css'

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Takka AS',
  url: 'https://takka.no',
  description: 'Takka AS – din lokale partner for kvalitetsprodukter og tjenester.',
  sameAs: [
    'https://www.facebook.com/takkaas',
    'https://www.instagram.com/takkaas',
  ],
}

export default function HomePage() {
  const { t } = useTranslation()

  return (
    <>
      <SEO
        title={t('home.title')}
        description={t('home.description')}
        canonical="https://takka.no/"
      />
      <JsonLd schema={websiteSchema} />

      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroInner}>
          <h1 id="hero-heading" className={styles.heroHeading}>
            {t('home.hero.heading')}
          </h1>
          <p className={styles.heroSub}>{t('home.hero.sub')}</p>
          <Link to="/om-oss" className={styles.heroCta}>
            {t('home.hero.cta')}
          </Link>
        </div>
      </section>

      <section className={styles.features} aria-labelledby="features-heading">
        <div className={styles.featuresInner}>
          <h2 id="features-heading" className={styles.featuresHeading}>
            {t('home.features.heading')}
          </h2>
          <ul className={styles.featureList} role="list">
            {(['quality', 'local', 'service'] as const).map((key) => (
              <li key={key} className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{t(`home.features.${key}.title`)}</h3>
                <p className={styles.featureText}>{t(`home.features.${key}.text`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
