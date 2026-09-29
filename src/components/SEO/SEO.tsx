import { Helmet } from 'react-helmet-async'
import { absoluteUrl } from '../../seo/schema'

const SITE_NAME = 'Takka AS'
const DEFAULT_OG_IMAGE = '/og-image.jpg'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  noindex?: boolean
}

export default function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
}: SEOProps) {
  // Titles that already name the brand (e.g. the home page) get no suffix
  const fullTitle = title.includes('Takka') ? title : `${title} | ${SITE_NAME}`
  const image = absoluteUrl(ogImage)

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
