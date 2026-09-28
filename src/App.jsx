import { useEffect, useRef, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import {
  ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Clock3, Crosshair, Mail, MapPin,
  Phone, Quote, ShieldCheck, Sparkles, Target, UsersRound, X,
} from 'lucide-react'
import { CTA, Layout, PageHero } from './components/Layout'
import { legalDocuments } from './config/site'
import { articles, cases, pillars, processSteps, sectors, teamRoles } from './data/content'

function PillarCards({ detailed = false }) {
  return <div className={detailed ? 'pillar-grid detailed' : 'pillar-grid'}>
    {pillars.map(({ slug, title, eyebrow, summary, icon: Icon, services }, index) => <article className="pillar-card" id={slug} key={title}>
      <div className="card-top"><span>0{index + 1}</span><Icon /></div>
      <p className="card-eyebrow">{eyebrow}</p><h3>{title}</h3><p>{summary}</p>
      {detailed && <ul>{services.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul>}
      {!detailed && <Link to={`/services#${slug}`}>Explorer <ArrowRight size={16} /></Link>}
    </article>)}
  </div>
}

function CapabilityTabs() {
  const [active, setActive] = useState(0)
  const pillar = pillars[active]
  const Icon = pillar.icon

  function handleTabKeyDown(event, index) {
    const last = pillars.length - 1
    const destinations = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowRight: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }
    const next = destinations[event.key]
    if (next === undefined) return
    event.preventDefault()
    setActive(next)
    event.currentTarget.parentElement.children[next]?.focus()
  }

  return <div className="capability-tabs">
    <div className="tab-rail" role="tablist" aria-label="Piliers CardinalTech">
      {pillars.map((item, index) => <button key={item.slug} id={`pillar-tab-${item.slug}`} role="tab" aria-controls="pillar-panel" aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => handleTabKeyDown(event, index)}><span>0{index + 1}</span>{item.title}<ChevronRight /></button>)}
    </div>
    <div className="tab-stage" id="pillar-panel" role="tabpanel" aria-labelledby={`pillar-tab-${pillar.slug}`}>
      <div className="tab-visual" key={`${pillar.slug}-visual`}><i/><i/><i/><Icon /></div>
      <div className="tab-content" key={`${pillar.slug}-content`}><p className="eyebrow">{pillar.eyebrow}</p><h3>{pillar.title}</h3><p>{pillar.summary}</p><ul>{pillar.services.slice(0, 4).map(service => <li key={service}><Check />{service}</li>)}</ul><Link className="button" to={`/services#${pillar.slug}`}>Explorer ce pilier <ArrowRight size={17} /></Link></div>
    </div>
  </div>
}

function FAQ() {
  const items = [
    ['Pourquoi commencer par un audit ?', 'L’audit donne une vision factuelle des actifs, des faiblesses et des priorités. Il évite d’investir à l’aveugle dans des outils qui ne répondent pas au risque principal.'],
    ['CardinalTech intervient-il après un incident ?', 'Oui. Le pilier Réaction couvre l’assistance, la récupération de premier niveau, les sauvegardes et la remise en sécurité progressive.'],
    ['Pouvez-vous superviser une infrastructure existante ?', 'Oui. Nous pouvons déployer une supervision Zabbix et une approche SIEM sans imposer le remplacement complet de l’environnement.'],
    ['Travaillez-vous avec les PME ?', 'Oui. L’offre est pensée pour être progressive, documentée et proportionnée aux moyens techniques et financiers de chaque organisation.'],
  ]
  const [open, setOpen] = useState(0)
  return <div className="faq-list">{items.map(([q, a], index) => <article className={open === index ? 'open' : ''} key={q}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>0{index + 1}</span><b>{q}</b><ChevronDown /></button><div className="faq-answer"><p>{a}</p></div></article>)}</div>
}

function Home() {
  return <>
    <section className="ops-hero grid-bg">
      <div className="hero-streaks" aria-hidden="true" />
      <img className="ops-hero-mark" src="/images/brand-hero.webp" alt="" aria-hidden="true" />
      <div className="ops-hero-copy" data-reveal>
        <p className="eyebrow"><span /> Cybersécurité & infrastructures</p>
        <h1>Nous protégeons<br />vos infrastructures<br /><em>critiques.</em></h1>
        <p>CardinalTech empêche les risques numériques de devenir des interruptions d’activité. Audit, protection, surveillance et réaction réunis dans une approche claire et locale.</p>
        <div className="hero-actions"><Link className="button" to="/contact">Parler à un expert <ArrowRight size={18} /></Link><Link className="button ghost" to="/services">Explorer nos services</Link></div>
      </div>
      <div className="scroll-cue"><span>Découvrir</span><i /></div>
    </section>

    <section className="capability-intro" data-reveal><article><span>01</span><ShieldCheck/><h3>Protection intégrée</h3><p>Des contrôles cohérents pour les systèmes, réseaux, applications et données.</p><Link to="/services">Découvrir <ArrowRight/></Link></article><article><span>02</span><Sparkles/><h3>Visibilité opérationnelle</h3><p>Des alertes exploitables et une supervision qui reste lisible par vos équipes.</p><Link to="/services">Découvrir <ArrowRight/></Link></article><article><span>03</span><UsersRound/><h3>Expertise locale</h3><p>Un accompagnement proche du terrain, documenté et adapté à votre maturité.</p><Link to="/a-propos">Nous connaître <ArrowRight/></Link></article></section>

    <section className="metric-band"><div><b>4</b><span>piliers complémentaires</span></div><div><b>360°</b><span>du diagnostic à la reprise</span></div><div><b>24/7</b><span>une sécurité pensée en continu</span></div><div><b>+1</b><span>partenaire local à Libreville</span></div></section>

    <section className="section wrap" data-reveal><div className="section-heading"><div><p className="eyebrow">Notre plateforme de services</p><h2>Analyser. Protéger.<br />Surveiller. Réagir.</h2></div><p>Une architecture d’intervention inspirée des environnements critiques : chaque pilier renforce le suivant et produit des résultats mesurables.</p></div><CapabilityTabs /></section>

    <section className="split-section" data-reveal>
      <div className="image-panel"><img src="/images/cardinaltech-building.webp" alt="Projection de l’identité CardinalTech sur un bâtiment" /><span>Une expertise proche du terrain</span></div>
      <div className="split-copy"><p className="eyebrow">L’avantage CardinalTech</p><h2>La cybersécurité doit rester compréhensible.</h2><p>Nous transformons les constats techniques en décisions claires. Chaque recommandation répond à un risque, une priorité et un résultat attendu.</p><div className="mini-list"><span><Crosshair /> Recommandations priorisées</span><span><ShieldCheck /> Défenses adaptées à l’existant</span><span><UsersRound /> Transfert de compétences</span></div><Link className="button ghost" to="/a-propos">Comprendre notre approche <ArrowRight size={17} /></Link></div>
    </section>

    <section className="section wrap" data-reveal><div className="section-heading"><div><p className="eyebrow">Notre méthode</p><h2>De la visibilité à la maîtrise.</h2></div></div><div className="process">{processSteps.map(([n, title, text]) => <div key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>

    <section className="industry-showcase" data-reveal><div className="industry-copy"><p className="eyebrow">Secteurs critiques</p><h2>Protéger les organisations qui font avancer le pays.</h2><p>PME. Administrations. Banques. Infrastructures. Les contextes changent, l’exigence de continuité reste la même.</p><Link className="button" to="/secteurs">Explorer les secteurs <ArrowRight/></Link></div><div className="industry-list">{sectors.map(({ title, text, icon: Icon }, i) => <Link to="/secteurs" key={title}><span>0{i+1}</span><Icon/><div><h3>{title}</h3><p>{text}</p></div><ArrowRight/></Link>)}</div></section>

    <section className="principle-statement" data-reveal><p className="eyebrow">Notre principe</p><blockquote>Une défense utile ne se contente pas d’alerter. Elle aide l’organisation à comprendre, décider et continuer.</blockquote><Link className="text-link" to="/a-propos">Découvrir notre approche <ArrowRight /></Link></section>

    <section className="section wrap" data-reveal><div className="section-heading"><div><p className="eyebrow">Informations du terrain</p><h2>Des repères pour décider.</h2></div><Link className="text-link" to="/veille">Toutes les ressources <ArrowRight size={17} /></Link></div><div className="article-grid ops-cards">{articles.map((a,i) => <article key={a.title}><div className="resource-index">0{i+1}</div><span>{a.date}</span><h3>{a.title}</h3><p>{a.excerpt}</p><Link to="/veille" aria-label={`Lire ${a.title}`}><ArrowRight /></Link></article>)}</div></section>

    <section className="section wrap faq-section" data-reveal><div><p className="eyebrow">Questions fréquentes</p><h2>Ce qu’il faut savoir avant de commencer.</h2></div><FAQ /></section>
    <CTA />
  </>
}

function About() {
  return <><section className="about-hero grid-bg"><div className="about-hero-copy" data-reveal><p className="eyebrow">À propos de CardinalTech</p><h1>Une cybersécurité ancrée dans le réel.</h1><p>CardinalTech accompagne les organisations dans la protection de leurs systèmes, de leurs données et de leur continuité d’activité.</p></div><figure className="about-hero-media" data-reveal><img src="/images/cardinaltech-building.webp" alt="Identité CardinalTech présentée sur un bâtiment" /><figcaption>Libreville · Expertise de proximité</figcaption></figure></section>
    <section className="section wrap story-grid" data-reveal><div><p className="eyebrow">Notre mission</p><h2>Rendre la sécurité actionnable.</h2></div><div><p>Nous rapprochons expertise technique et réalités opérationnelles. Notre rôle n’est pas d’ajouter de la complexité, mais de rendre les risques visibles et les réponses possibles.</p><p>Depuis Libreville, nous construisons une relation de proximité fondée sur la précision, la transparence et la transmission.</p></div></section>
    <section className="values" data-reveal><article><Target /><span>01</span><h3>Précision</h3><p>Des constats vérifiables et des priorités explicites.</p></article><article><ShieldCheck /><span>02</span><h3>Responsabilité</h3><p>La sécurité pensée pour durer, pas pour impressionner.</p></article><article><UsersRound /><span>03</span><h3>Proximité</h3><p>Une équipe accessible qui comprend votre contexte.</p></article></section>
    <section className="metric-band" data-reveal><div><b>Local</b><span>une présence à Libreville</span></div><div><b>4</b><span>piliers de défense</span></div><div><b>Clair</b><span>des décisions explicables</span></div><div><b>Durable</b><span>des solutions maintenables</span></div></section>
    <section className="section wrap quote-block" data-reveal><Quote /><blockquote>La confiance numérique se construit avant l’incident — et se mesure dans la capacité à y répondre.</blockquote></section><CTA /></>
}

function Services() {
  return <><PageHero eyebrow="Services" title="Du diagnostic à la continuité." intro="Une offre structurée autour de quatre piliers pour sécuriser l’ensemble du cycle de risque." /><section className="metric-band" data-reveal><div><b>01</b><span>identifier les risques</span></div><div><b>02</b><span>réduire l’exposition</span></div><div><b>03</b><span>détecter les écarts</span></div><div><b>04</b><span>restaurer l’activité</span></div></section><section className="section wrap" data-reveal><PillarCards detailed /></section><CTA /></>
}

function Sectors() {
  return <><PageHero eyebrow="Secteurs" title="Protéger ce qui fait fonctionner votre organisation." intro="Nous adaptons la méthode aux contraintes, aux équipes et au niveau de maturité de chaque structure." /><section className="section wrap" data-reveal><div className="sector-grid large">{sectors.map(({ title, text, icon: Icon }, i) => <article key={title}><span>0{i+1}</span><Icon /><h2>{title}</h2><p>{text}</p><ul><li>Analyse du contexte</li><li>Priorisation des actifs critiques</li><li>Plan d’amélioration progressif</li></ul></article>)}</div></section><CTA /></>
}

function References() {
  return <><PageHero eyebrow="Références" title="La méthode avant la promesse." intro="Quelques scénarios d’intervention représentatifs. Les informations clients restent confidentielles." /><section className="section wrap" data-reveal><div className="case-grid">{cases.map(({ tag, title, text, icon: Icon }, i) => <article key={title}><div><Icon /><span>{tag}</span></div><p className="case-number">CAS 0{i+1}</p><h2>{title}</h2><p>{text}</p><small>Scénario anonymisé</small></article>)}</div></section><CTA /></>
}

function Watch() {
  return <><PageHero eyebrow="Blog & veille" title="Comprendre pour mieux protéger." intro="Des contenus courts et utiles pour améliorer les décisions de sécurité au quotidien." /><section className="resource-filter" data-reveal><button className="active">Tous</button><button>Audit</button><button>Protection</button><button>Surveillance</button><button>Réaction</button></section><section className="section wrap" data-reveal><div className="article-grid featured">{articles.map((a, i) => <article key={a.title}><span>{a.date} · Lecture {3+i} min</span><h2>{a.title}</h2><p>{a.excerpt}</p><button className="text-link" type="button">Article prochainement disponible <ArrowRight size={17} /></button></article>)}</div></section><CTA /></>
}

function TeamProfileDialog({ index, onClose, onNavigate }) {
  const dialogRef = useRef(null)
  const profile = teamRoles[index]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog?.open) dialog?.showModal()
    return () => { if (dialog?.open) dialog.close() }
  }, [])

  return <dialog className="profile-dialog" ref={dialogRef} onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="profile-dialog-inner">
      <button className="profile-close" type="button" aria-label="Fermer la fiche" onClick={onClose}><X /></button>
      <button className="profile-nav previous" type="button" aria-label="Rôle précédent" onClick={() => onNavigate(index === 0 ? teamRoles.length - 1 : index - 1)}><ChevronLeft /></button>
      <div className="profile-copy"><p className="eyebrow">Pôle 0{index + 1}</p><h2>{profile.role}</h2><p>{profile.description}</p><ul>{profile.responsibilities.map(item => <li key={item}><Check />{item}</li>)}</ul></div>
      <div className="profile-mark" aria-hidden="true"><span>CT</span><b>0{index + 1}</b></div>
      <button className="profile-nav next" type="button" aria-label="Rôle suivant" onClick={() => onNavigate(index === teamRoles.length - 1 ? 0 : index + 1)}><ChevronRight /></button>
    </div>
  </dialog>
}

function Team() {
  const [selectedProfile, setSelectedProfile] = useState(null)
  return <><PageHero eyebrow="Équipe" title="Des expertises qui travaillent ensemble." intro="La cybersécurité exige des regards complémentaires : gouvernance, systèmes, réseaux, développement et accompagnement." /><section className="section wrap" data-reveal><div className="team-intro"><div><p className="eyebrow">Organisation</p><h2>Une équipe conçue autour de vos enjeux.</h2></div><p>Les profils nominatifs et portraits seront publiés après validation. Nous présentons ici, sans inventer de biographies, les fonctions réellement mobilisées selon les missions.</p></div><div className="team-grid">{teamRoles.map(({ role, summary }, i) => <article key={role}><button type="button" onClick={() => setSelectedProfile(i)} aria-label={`Découvrir le pôle ${role}`}><span>0{i+1}</span><div className="role-mark">CT</div><h3>{role}</h3><p>{summary}</p><b>Voir le rôle <ArrowRight /></b></button></article>)}</div></section>{selectedProfile !== null && <TeamProfileDialog index={selectedProfile} onClose={() => setSelectedProfile(null)} onNavigate={setSelectedProfile} />}<CTA /></>
}

function Contact() {
  const [status, setStatus] = useState('')
  const [startedAt] = useState(() => Date.now())

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    if (data.get('website') || Date.now() - startedAt < 2500) {
      setStatus('La demande ne peut pas être préparée. Réessayez dans quelques instants.')
      return
    }
    setStatus('Le formulaire est valide. La transmission sécurisée sera activée avec le backend de production.')
  }

  return <><PageHero eyebrow="Contact" title="Commençons par votre priorité." intro="Décrivez le contexte en quelques lignes. Nous vous recontactons pour qualifier le besoin et la prochaine étape." /><section className="section wrap contact-grid" data-reveal><div className="contact-details"><h2>Parlons sécurité, simplement.</h2><p>Audit, incident, protection ou supervision : indiquez ce qui vous préoccupe et le niveau d’urgence.</p><div><span><MapPin /> Libreville, Gabon</span><span><Clock3 /> Lun–Ven · 08:00–17:00</span><span><Mail /> Adresse e-mail à confirmer</span><span><Phone /> Numéro à confirmer</span></div></div><form className="contact-form" onSubmit={handleSubmit}><label>Nom complet<input required minLength="2" maxLength="100" autoComplete="name" name="name" placeholder="Votre nom" /></label><label>Adresse e-mail<input required type="email" maxLength="160" autoComplete="email" name="email" placeholder="vous@entreprise.com" /></label><label>Organisation<input maxLength="140" autoComplete="organization" name="company" placeholder="Nom de votre organisation" /></label><label>Votre besoin<select required name="need" defaultValue=""><option value="" disabled>Sélectionner</option>{pillars.map(p => <option key={p.slug} value={p.slug}>{p.title}</option>)}</select></label><label className="full">Message<textarea required minLength="20" maxLength="3000" name="message" rows="6" placeholder="Contexte, systèmes concernés, urgence…" /></label><label className="hp-field" aria-hidden="true">Votre site web<input tabIndex="-1" autoComplete="off" name="website" /></label><label className="consent-field full"><input required type="checkbox" name="privacy" /> <span>J’ai lu la <Link to="/confidentialite">politique de confidentialité</Link> et j’accepte que ma demande soit traitée.</span></label><button className="button full" type="submit">Préparer la demande <ArrowRight size={18} /></button><p className="form-status full" aria-live="polite">{status || 'Formulaire de démonstration — aucune donnée n’est encore transmise.'}</p></form></section></>
}

function LegalPage({ type }) {
  const document = legalDocuments[type]
  return <><PageHero eyebrow={document.eyebrow} title={document.title} intro={document.intro} /><section className="section wrap legal-copy" data-reveal>{document.sections.map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}</section></>
}

function NotFound() { return <section className="not-found grid-bg"><p className="eyebrow">Erreur 404</p><h1>Cette page n’existe pas.</h1><Link className="button" to="/">Retour à l’accueil</Link></section> }

export default function App() {
  return <Layout><Routes><Route path="/" element={<Home />} /><Route path="/a-propos" element={<About />} /><Route path="/services" element={<Services />} /><Route path="/secteurs" element={<Sectors />} /><Route path="/references" element={<References />} /><Route path="/veille" element={<Watch />} /><Route path="/equipe" element={<Team />} /><Route path="/contact" element={<Contact />} /><Route path="/mentions-legales" element={<LegalPage type="legal" />} /><Route path="/confidentialite" element={<LegalPage type="privacy" />} /><Route path="/rgpd" element={<LegalPage type="rgpd" />} /><Route path="/conditions-generales" element={<LegalPage type="terms" />} /><Route path="*" element={<NotFound />} /></Routes></Layout>
}
