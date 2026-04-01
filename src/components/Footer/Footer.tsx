import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

const SOCIAL_LINKS = [
  {
    platform: 'Facebook',
    url: 'https://www.facebook.com/takkaas',
    label: 'social.facebook',
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/takkaas',
    label: 'social.instagram',
  },
]

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/om-oss', label: t('nav.about') },
    { path: '/produkt', label: t('nav.product') },
    { path: '/hva-skjer', label: t('nav.events') },
    { path: '/kontakt-oss', label: t('nav.contact') },
  ]

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <p className={styles.brandName}>Takka AS</p>
          <p className={styles.copyright}>{t('footer.copyright', { year })}</p>
        </div>

        <nav aria-label={t('footer.nav')} className={styles.nav}>
          <h2 className={styles.navHeading}>{t('footer.nav')}</h2>
          <ul className={styles.navList} role="list">
            {navItems.map(({ path, label }) => (
              <li key={path}>
                <NavLink to={path} end={path === '/'} className={styles.navLink}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.social}>
          <h2 className={styles.socialHeading}>{t('footer.follow')}</h2>
          <ul className={styles.socialList} role="list">
            {SOCIAL_LINKS.map(({ platform, url, label }) => (
              <li key={platform}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(label)}
                  className={styles.socialLink}
                >
                  {platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
