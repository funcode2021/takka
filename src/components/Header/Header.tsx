import { useState, useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import styles from './Header.module.css'

const SOCIAL_LINKS = [
  {
    platform: 'Facebook',
    url: 'https://www.facebook.com/takkaas',
    label: 'social.facebook',
    icon: 'f',
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/takkaas',
    label: 'social.instagram',
    icon: 'ig',
  },
]

export default function Header() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/om-oss', label: t('nav.about') },
    { path: '/produkt', label: t('nav.product') },
    { path: '/hva-skjer', label: t('nav.events') },
    { path: '/kontakt-oss', label: t('nav.contact') },
  ]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  return (
    <header className={styles.header} role="banner">
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo} aria-label="Takka AS – gå til forsiden">
          Takka AS
        </NavLink>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label={menuOpen ? 'Lukk meny' : 'Åpne meny'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={styles.toggleBar} aria-hidden="true" />
          <span className={styles.toggleBar} aria-hidden="true" />
          <span className={styles.toggleBar} aria-hidden="true" />
        </button>

        <div
          ref={menuRef}
          id="main-nav"
          className={`${styles.navWrapper} ${menuOpen ? styles.navOpen : ''}`}
        >
          <nav aria-label="Primær navigasjon" className={styles.nav}>
            <ul className={styles.navList} role="list">
              {navItems.map(({ path, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <LanguageSwitcher />
            <ul className={styles.socialList} role="list" aria-label="Sosiale medier">
              {SOCIAL_LINKS.map(({ platform, url, label, icon }) => (
                <li key={platform}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t(label)}
                    className={styles.socialLink}
                  >
                    <span aria-hidden="true" className={styles.socialIcon}>{icon}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
