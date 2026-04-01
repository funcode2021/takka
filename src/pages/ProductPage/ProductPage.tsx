import { useTranslation } from 'react-i18next'
import SEO from '../../components/SEO/SEO'
import JsonLd from '../../components/JsonLd/JsonLd'
import styles from './ProductPage.module.css'

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Takka AS – Produkter',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Produkt Alpha' },
    { '@type': 'ListItem', position: 2, name: 'Produkt Beta' },
    { '@type': 'ListItem', position: 3, name: 'Produkt Gamma' },
    { '@type': 'ListItem', position: 4, name: 'Produkt Delta' },
  ],
}

const PRODUCT_KEYS = ['p1', 'p2', 'p3', 'p4'] as const

export default function ProductPage() {
  const { t } = useTranslation()

  return (
    <>
      <SEO
        title={t('product.title')}
        description={t('product.description')}
        canonical="https://takka.no/produkt"
      />
      <JsonLd schema={productSchema} />

      <section className={styles.page} aria-labelledby="product-heading">
        <div className={styles.inner}>
          <h1 id="product-heading" className={styles.heading}>
            {t('product.heading')}
          </h1>
          <p className={styles.intro}>{t('product.intro')}</p>

          <ul className={styles.grid} role="list">
            {PRODUCT_KEYS.map((key) => (
              <li key={key} className={styles.card}>
                <div
                  className={styles.cardImage}
                  role="img"
                  aria-label={t(`product.items.${key}.name`)}
                />
                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{t(`product.items.${key}.name`)}</h2>
                  <p className={styles.cardDesc}>{t(`product.items.${key}.description`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
