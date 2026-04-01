import { useTranslation } from 'react-i18next'
import SEO from '../../components/SEO/SEO'
import JsonLd from '../../components/JsonLd/JsonLd'
import styles from './EventPage.module.css'

const EVENT_KEYS = ['e1', 'e2', 'e3'] as const

interface EventData {
  title: string
  date: string
  location: string
  description: string
}

function buildEventSchema(events: EventData[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: events.map((ev, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Event',
        name: ev.title,
        startDate: ev.date,
        location: {
          '@type': 'Place',
          name: ev.location,
        },
        description: ev.description,
        organizer: {
          '@type': 'Organization',
          name: 'Takka AS',
          url: 'https://takka.no',
        },
      },
    })),
  }
}

export default function EventPage() {
  const { t } = useTranslation()

  const events = EVENT_KEYS.map((key) => ({
    key,
    title: t(`events.items.${key}.title`),
    date: t(`events.items.${key}.date`),
    location: t(`events.items.${key}.location`),
    description: t(`events.items.${key}.description`),
  }))

  const eventSchema = buildEventSchema(events)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('no-NO', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <>
      <SEO
        title={t('events.title')}
        description={t('events.description')}
        canonical="https://takka.no/hva-skjer"
      />
      <JsonLd schema={eventSchema} />

      <section className={styles.page} aria-labelledby="events-heading">
        <div className={styles.inner}>
          <h1 id="events-heading" className={styles.heading}>
            {t('events.heading')}
          </h1>
          <p className={styles.intro}>{t('events.intro')}</p>

          <ul className={styles.eventList} role="list">
            {events.map(({ key, title, date, location, description }) => (
              <li key={key} className={styles.eventCard}>
                <article aria-labelledby={`event-${key}-title`}>
                  <time className={styles.eventDate} dateTime={date}>
                    {formatDate(date)}
                  </time>
                  <h2 id={`event-${key}-title`} className={styles.eventTitle}>
                    {title}
                  </h2>
                  <p className={styles.eventLocation}>
                    <span className={styles.srOnly}>Sted: </span>
                    {location}
                  </p>
                  <p className={styles.eventDesc}>{description}</p>
                  <a href="#kontakt" className={styles.registerLink}>
                    {t('events.register')}
                  </a>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
