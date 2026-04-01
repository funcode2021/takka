import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
}

export default function SEO({ title, description, canonical, ogImage }: SEOProps) {
  const siteName = 'Takka AS'
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`
  const defaultOgImage = '/og-image.jpg'

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage ?? defaultOgImage} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage ?? defaultOgImage} />
    </Helmet>
  )
}
