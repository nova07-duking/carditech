import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, ChevronRight, Menu, Shield, X } from 'lucide-react'
import { navItems } from '../data/content'
import { CookieConsent } from './CookieConsent'
import { Seo } from './Seo'

function Brand() {
  return (
    <Link className="brand" to="/" aria-label="CardinalTech — Accueil">
      <span className="brand-mark"><Shield size={20} strokeWidth={2.4} /></span>
      <span><b>CARDINAL</b><em>TECH</em><small>CYBERSÉCURITÉ & INFRASTRUCTURES</small></span>
    </Link>
  )
}

export function Layout({ children }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
    const elements = [...document.querySelectorAll('[data-reveal]')]
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible'))
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' })
    elements.forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [location.pathname])

  return <div className="site-shell">
    <Seo />
    <a className="skip-link" href="#contenu">Aller au contenu</a>
    <div className="announcement"><span>CardinalTech</span> Votre partenaire local en cybersécurité et infrastructures <ChevronRight size={15} /></div>
    <div className="utility-bar"><span>Libreville · Gabon</span><div><Link to="/veille">Veille cyber</Link><Link to="/contact">Assistance</Link><b>FR</b></div></div>
    <header className="topbar">
      <Brand />
      <button className="menu-button" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Navigation principale">
        {navItems.map(([label, href]) => <NavLink key={href} to={href}>{label}</NavLink>)}
        <Link className="button small" to="/contact">Demander un audit <ArrowUpRight size={16} /></Link>
      </nav>
    </header>
    <main id="contenu">{children}</main>
    <footer className="footer">
      <div className="footer-lead">
        <Brand />
        <p>La sécurité qui protège l’essentiel, du diagnostic à la réaction.</p>
      </div>
      <div><span>Expertises</span><Link to="/services">Audit & protection</Link><Link to="/services">Surveillance & réaction</Link></div>
      <div><span>CardinalTech</span><Link to="/a-propos">À propos</Link><Link to="/equipe">Équipe</Link><Link to="/contact">Contact</Link></div>
      <div><span>Informations</span><Link to="/mentions-legales">Mentions légales</Link><Link to="/conditions-generales">Conditions générales</Link><Link to="/confidentialite">Confidentialité</Link><Link to="/rgpd">Protection des données</Link></div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} CardinalTech. Tous droits réservés.</p><p>Libreville · Gabon</p></div>
    </footer>
    <CookieConsent />
  </div>
}

export function PageHero({ eyebrow, title, intro }) {
  return <section className="page-hero grid-bg"><div className="wrap page-hero-grid"><div data-reveal><div className="breadcrumbs"><Link to="/">Accueil</Link><ChevronRight size={13} /><span>{eyebrow}</span></div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-intro">{intro}</p></div><div className="page-orbit" aria-hidden="true"><span className="orbit-ring one"/><span className="orbit-ring two"/><Shield /></div></div></section>
}

export function CTA() {
  return <section className="cta-band" data-reveal><div><p className="eyebrow light">Une question de sécurité ?</p><h2>Transformons le risque en plan d’action.</h2></div><Link className="button light" to="/contact">Parler à un expert <ArrowUpRight size={18} /></Link></section>
}
