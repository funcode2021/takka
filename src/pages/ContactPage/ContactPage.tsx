import { useState, useId } from 'react'
import { useTranslation } from 'react-i18next'
import SEO from '../../components/SEO/SEO'
import JsonLd from '../../components/JsonLd/JsonLd'
import styles from './ContactPage.module.css'

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Takka AS',
  url: 'https://takka.no',
  telephone: '+4700000000',
  email: 'hei@takka.no',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Eksempelgata 1',
    addressLocality: 'Oslo',
    postalCode: '0001',
    addressCountry: 'NO',
  },
  sameAs: [
    'https://www.facebook.com/takkaas',
    'https://www.instagram.com/takkaas',
  ],
}

interface FormState {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactPage() {
  const { t } = useTranslation()
  const nameId = useId()
  const emailId = useId()
  const messageId = useId()
  const nameErrorId = useId()
  const emailErrorId = useId()
  const messageErrorId = useId()

  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): FormErrors => {
    const errs: FormErrors = {}
    if (!form.name.trim()) errs.name = t('contact.form.required')
    if (!form.email.trim()) {
      errs.email = t('contact.form.required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = t('contact.form.invalidEmail')
    }
    if (!form.message.trim()) errs.message = t('contact.form.required')
    return errs
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <>
      <SEO
        title={t('contact.title')}
        description={t('contact.description')}
        canonical="https://takka.no/kontakt-oss"
      />
      <JsonLd schema={localBusinessSchema} />

      <section className={styles.page} aria-labelledby="contact-heading">
        <div className={styles.inner}>
          <h1 id="contact-heading" className={styles.heading}>
            {t('contact.heading')}
          </h1>
          <p className={styles.intro}>{t('contact.intro')}</p>

          <div className={styles.layout}>
            <div className={styles.formWrapper}>
              {submitted ? (
                <div className={styles.success} role="alert" aria-live="polite">
                  {t('contact.form.success')}
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className={styles.form}
                  aria-label={t('contact.heading')}
                >
                  <div className={styles.field}>
                    <label htmlFor={nameId} className={styles.label}>
                      {t('contact.form.name')}
                      <span className={styles.required} aria-hidden="true"> *</span>
                    </label>
                    <input
                      id={nameId}
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t('contact.form.namePlaceholder')}
                      className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      aria-required="true"
                      aria-describedby={errors.name ? nameErrorId : undefined}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      autoComplete="name"
                    />
                    {errors.name && (
                      <span id={nameErrorId} className={styles.error} role="alert">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor={emailId} className={styles.label}>
                      {t('contact.form.email')}
                      <span className={styles.required} aria-hidden="true"> *</span>
                    </label>
                    <input
                      id={emailId}
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t('contact.form.emailPlaceholder')}
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      aria-required="true"
                      aria-describedby={errors.email ? emailErrorId : undefined}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <span id={emailErrorId} className={styles.error} role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor={messageId} className={styles.label}>
                      {t('contact.form.message')}
                      <span className={styles.required} aria-hidden="true"> *</span>
                    </label>
                    <textarea
                      id={messageId}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t('contact.form.messagePlaceholder')}
                      rows={6}
                      className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                      aria-required="true"
                      aria-describedby={errors.message ? messageErrorId : undefined}
                      aria-invalid={errors.message ? 'true' : 'false'}
                    />
                    {errors.message && (
                      <span id={messageErrorId} className={styles.error} role="alert">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <button type="submit" className={styles.submit}>
                    {t('contact.form.submit')}
                  </button>
                </form>
              )}
            </div>

            <aside className={styles.info} aria-labelledby="contact-info-heading">
              <h2 id="contact-info-heading" className={styles.infoHeading}>
                {t('contact.info.heading')}
              </h2>
              <dl className={styles.infoList}>
                <div className={styles.infoItem}>
                  <dt className={styles.infoLabel}>{t('contact.info.address')}</dt>
                  <dd className={styles.infoValue}>{t('contact.info.addressValue')}</dd>
                </div>
                <div className={styles.infoItem}>
                  <dt className={styles.infoLabel}>{t('contact.info.email')}</dt>
                  <dd className={styles.infoValue}>
                    <a href={`mailto:${t('contact.info.emailValue')}`} className={styles.infoLink}>
                      {t('contact.info.emailValue')}
                    </a>
                  </dd>
                </div>
                <div className={styles.infoItem}>
                  <dt className={styles.infoLabel}>{t('contact.info.phone')}</dt>
                  <dd className={styles.infoValue}>
                    <a href={`tel:${t('contact.info.phoneValue').replace(/\s/g, '')}`} className={styles.infoLink}>
                      {t('contact.info.phoneValue')}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className={styles.mapPlaceholder} role="img" aria-label={t('contact.map')}>
                <p>{t('contact.map')}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
