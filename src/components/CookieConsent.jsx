import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, X } from 'lucide-react'

const STORAGE_KEY = 'cardinaltech-consent-v1'

function enableAnalytics() {
  const measurementId = import.meta.env.VITE_GA_ID
  if (!/^G-[A-Z0-9]+$/.test(measurementId || '') || document.querySelector('[data-cardinaltech-analytics]')) return

  const script = document.createElement('script')
  script.async = true
  script.dataset.cardinaltechAnalytics = 'true'
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  document.head.appendChild(script)
  window.dataLayer = window.dataLayer || []
  window.gtag = (...args) => window.dataLayer.push(args)
  window.gtag('js', new Date())
  window.gtag('config', measurementId, { anonymize_ip: true })
}

export function CookieConsent() {
  const [choice, setChoice] = useState(() => localStorage.getItem(STORAGE_KEY))

  useEffect(() => {
    if (choice === 'accepted') enableAnalytics()
  }, [choice])

  function save(value) {
    localStorage.setItem(STORAGE_KEY, value)
    setChoice(value)
  }

  if (choice) return null

  return <aside className="cookie-banner" aria-label="Préférences de confidentialité">
    <ShieldCheck aria-hidden="true" />
    <div><strong>Votre confidentialité, sans détour.</strong><p>Le site utilise uniquement le stockage nécessaire à votre choix. La mesure d’audience optionnelle reste désactivée sans votre accord.</p><Link to="/confidentialite">Lire la politique de confidentialité</Link></div>
    <div className="cookie-actions"><button className="button secondary" onClick={() => save('refused')}>Refuser</button><button className="button" onClick={() => save('accepted')}>Accepter</button></div>
    <button className="cookie-close" aria-label="Refuser et fermer" onClick={() => save('refused')}><X /></button>
  </aside>
}
