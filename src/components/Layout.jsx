import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, Shield, X } from 'lucide-react'
import { navItems } from '../data/content'

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
  useEffect(() => { setOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname])

  return <div className="site-shell">
    <header className="topbar">
      <Brand />
      <button className="menu-button" aria-label="Ouvrir le menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'nav open' : 'nav'} aria-label="Navigation principale">
        {navItems.map(([label, href]) => <NavLink key={href} to={href}>{label}</NavLink>)}
        <Link className="button small" to="/contact">Demander un audit <ArrowUpRight size={16} /></Link>
      </nav>
    </header>
    <main>{children}</main>
    <footer className="footer">
      <div className="footer-lead">
        <Brand />
        <p>La sécurité qui protège l’essentiel, du diagnostic à la réaction.</p>
      </div>
      <div><span>Expertises</span><Link to="/services">Audit & protection</Link><Link to="/services">Surveillance & réaction</Link></div>
      <div><span>CardinalTech</span><Link to="/a-propos">À propos</Link><Link to="/equipe">Équipe</Link><Link to="/contact">Contact</Link></div>
      <div><span>Informations</span><Link to="/mentions-legales">Mentions légales</Link><Link to="/confidentialite">Confidentialité</Link></div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} CardinalTech. Tous droits réservés.</p><p>Libreville · Gabon</p></div>
    </footer>
  </div>
}

export function PageHero({ eyebrow, title, intro }) {
  return <section className="page-hero grid-bg"><div className="wrap"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-intro">{intro}</p></div></section>
}

export function CTA() {
  return <section className="cta-band"><div><p className="eyebrow light">Une question de sécurité ?</p><h2>Transformons le risque en plan d’action.</h2></div><Link className="button light" to="/contact">Parler à un expert <ArrowUpRight size={18} /></Link></section>
}
