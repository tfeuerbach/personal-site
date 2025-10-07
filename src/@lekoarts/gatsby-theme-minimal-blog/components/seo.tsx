import * as React from "react"
import { withPrefix } from "gatsby"
import useSiteMetadata from "../hooks/use-site-metadata"

type SEOProps = {
  title?: string
  description?: string
  pathname?: string
  image?: string
  children?: React.ReactNode
  canonicalUrl?: string
  datePublished?: string
  dateModified?: string
  type?: "article" | "website"
  tags?: string[]
}

const Seo = ({
  title = ``,
  description = ``,
  pathname = ``,
  image = ``,
  children = null,
  canonicalUrl = ``,
  datePublished = ``,
  dateModified = ``,
  type = `website`,
  tags = [],
}: SEOProps) => {
  const site = useSiteMetadata()

  const {
    siteTitle,
    siteTitleAlt: defaultTitle,
    siteUrl,
    siteDescription: defaultDescription,
    siteImage: defaultImage,
    author,
  } = site

  const seo = {
    title: title ? `${title} | ${siteTitle}` : defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname || ``}`,
    image: `${siteUrl}${image || defaultImage}`,
  }

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteTitle,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/android-chrome-512x512.png`,
    },
    sameAs: [
      "https://github.com/tfeuerbach",
      "https://linkedin.com/in/tfeuerbach",
      "https://youtube.com/@tfeuerbach",
    ],
  }

  // Article Schema (for blog posts)
  const articleSchema = type === `article` && {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: seo.description,
    image: seo.image,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteTitle,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/android-chrome-512x512.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": seo.url,
    },
    keywords: tags.join(", "),
  }

  // BreadcrumbList Schema (for blog posts)
  const breadcrumbSchema = type === `article` && {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: seo.url,
      },
    ],
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:type" content={type === `article` ? `article` : `website`} />
      <meta property="og:image:alt" content={seo.description} />
      {type === `article` && datePublished && (
        <>
          <meta property="article:published_time" content={datePublished} />
          {dateModified && <meta property="article:modified_time" content={dateModified} />}
          <meta property="article:author" content={author} />
          {tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:image:alt" content={seo.description} />
      <meta name="twitter:creator" content={author} />
      <meta name="gatsby-theme" content="@lekoarts/gatsby-theme-minimal-blog" />
      <link rel="icon" type="image/png" sizes="32x32" href={withPrefix(`/favicon-32x32.png`)} />
      <link rel="icon" type="image/png" sizes="16x16" href={withPrefix(`/favicon-16x16.png`)} />
      <link rel="apple-touch-icon" sizes="180x180" href={withPrefix(`/apple-touch-icon.png`)} />
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      {/* Organization Schema */}
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      {/* Article Schema */}
      {articleSchema && <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>}
      {/* Breadcrumb Schema */}
      {breadcrumbSchema && <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>}
      {children}
    </>
  )
}

export default Seo
