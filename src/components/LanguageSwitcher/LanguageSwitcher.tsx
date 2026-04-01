import { useTranslation } from 'react-i18next'
import styles from './LanguageSwitcher.module.css'

const LANGUAGES = [
  { code: 'no-nb', label: 'NO' },
  { code: 'no-nn', label: 'NN' },
  { code: 'en', label: 'EN' },
] as const

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()

  const handleChange = (lang: string) => {
    void i18n.changeLanguage(lang)
  }

  return (
    <nav aria-label={t('lang.switch')} className={styles.switcher}>
      <ul className={styles.list} role="list">
        {LANGUAGES.map(({ code, label }) => (
          <li key={code}>
            <button
              type="button"
              onClick={() => handleChange(code)}
              aria-label={t(`lang.${code}`)}
              aria-current={i18n.language === code ? 'true' : undefined}
              className={`${styles.btn} ${i18n.language === code ? styles.active : ''}`}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
