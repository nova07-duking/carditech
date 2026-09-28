import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { pageMeta, site } from '../config/site'

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value))
}

export function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const [label, description] = pageMeta[pathname] || ['Page introuvable', site.defaultDescription]
    const title = pathname === '/' ? `${site.name} — ${label}` : `${label} | ${site.name}`
    const canonical = new URL(pathname, window.location.origin).toString()
    const image = new URL(site.socialImage, window.location.origin).toString()

    document.title = title
    document.documentElement.lang = 'fr'
    setMeta('meta[name="description"]', { name: 'description', content: description })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    setMeta('meta[property="og:locale"]', { property: 'og:locale', content: site.locale })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonical })
    setMeta('meta[property="og:image"]', { property: 'og:image', content: image })
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image })

    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = canonical
  }, [pathname])

  return null
}
