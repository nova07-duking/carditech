import { Link, Route, Routes } from 'react-router-dom'
import {
  ArrowRight, Check, ChevronRight, Clock3, Crosshair, Mail, MapPin,
  Phone, Quote, ShieldCheck, Target, UsersRound,
} from 'lucide-react'
import { CTA, Layout, PageHero } from './components/Layout'
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

function Home() {
  return <>
    <section className="hero grid-bg">
      <div className="hero-copy">
        <p className="eyebrow"><span /> Cybersécurité & infrastructures</p>
        <h1>Prévenir.<br />Protéger.<br /><em>Réagir.</em></h1>
        <p className="hero-intro">CardinalTech aide les organisations gabonaises à comprendre leurs risques, renforcer leurs systèmes et maintenir leurs activités.</p>
        <div className="hero-actions"><Link className="button" to="/contact">Demander un audit <ArrowRight size={18} /></Link><Link className="text-link" to="/services">Découvrir nos expertises <ChevronRight size={17} /></Link></div>
        <div className="hero-proof"><span><b>4</b> piliers complémentaires</span><span><b>360°</b> du risque à la reprise</span><span><b>Local</b> ancrage à Libreville</span></div>
      </div>
      <div className="hero-art"><div className="hero-glow" /><img src="/images/brand-hero.webp" alt="Emblème rouge et noir CardinalTech" /><span className="status-chip"><i /> Protection active</span></div>
    </section>

    <section className="section wrap"><div className="section-heading"><div><p className="eyebrow">Nos expertises</p><h2>Quatre piliers.<br />Une défense cohérente.</h2></div><p>Une approche continue : voir les faiblesses, réduire l’exposition, surveiller les signaux et agir quand chaque minute compte.</p></div><PillarCards /></section>

    <section className="split-section">
      <div className="image-panel"><img src="/images/cardinaltech-building.webp" alt="Projection de l’identité CardinalTech sur un bâtiment" /><span>Une expertise proche du terrain</span></div>
      <div className="split-copy"><p className="eyebrow">Notre conviction</p><h2>La cybersécurité doit rester compréhensible.</h2><p>Nous transformons les constats techniques en décisions claires. Chaque recommandation répond à un risque, une priorité et un résultat attendu.</p><div className="mini-list"><span><Crosshair /> Recommandations priorisées</span><span><ShieldCheck /> Défenses adaptées à l’existant</span><span><UsersRound /> Transfert de compétences</span></div><Link className="text-link" to="/a-propos">Comprendre notre approche <ArrowRight size={17} /></Link></div>
    </section>

    <section className="section wrap"><div className="section-heading"><div><p className="eyebrow">Notre méthode</p><h2>De la visibilité à la maîtrise.</h2></div></div><div className="process">{processSteps.map(([n, title, text]) => <div key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></div>)}</div></section>

    <section className="section wrap dark-panel"><div className="section-heading"><div><p className="eyebrow">Secteurs</p><h2>Des enjeux différents.<br />Une exigence constante.</h2></div><Link className="text-link" to="/secteurs">Voir les secteurs <ArrowRight size={17} /></Link></div><div className="sector-grid">{sectors.map(({ title, text, icon: Icon }) => <article key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="section wrap"><div className="section-heading"><div><p className="eyebrow">Veille cyber</p><h2>Des repères pour décider.</h2></div><Link className="text-link" to="/veille">Toute la veille <ArrowRight size={17} /></Link></div><div className="article-grid">{articles.map(a => <article key={a.title}><span>{a.date}</span><h3>{a.title}</h3><p>{a.excerpt}</p><Link to="/veille" aria-label={`Lire ${a.title}`}><ArrowRight /></Link></article>)}</div></section>
    <CTA />
  </>
}

function About() {
  return <><PageHero eyebrow="À propos" title="Une cybersécurité ancrée dans le réel." intro="CardinalTech accompagne les organisations dans la protection de leurs systèmes, de leurs données et de leur continuité d’activité." />
    <section className="section wrap story-grid"><div><p className="eyebrow">Notre mission</p><h2>Rendre la sécurité actionnable.</h2></div><div><p>Nous rapprochons expertise technique et réalités opérationnelles. Notre rôle n’est pas d’ajouter de la complexité, mais de rendre les risques visibles et les réponses possibles.</p><p>Depuis Libreville, nous construisons une relation de proximité fondée sur la précision, la transparence et la transmission.</p></div></section>
    <section className="values"><article><Target /><span>01</span><h3>Précision</h3><p>Des constats vérifiables et des priorités explicites.</p></article><article><ShieldCheck /><span>02</span><h3>Responsabilité</h3><p>La sécurité pensée pour durer, pas pour impressionner.</p></article><article><UsersRound /><span>03</span><h3>Proximité</h3><p>Une équipe accessible qui comprend votre contexte.</p></article></section>
    <section className="section wrap quote-block"><Quote /><blockquote>La confiance numérique se construit avant l’incident — et se mesure dans la capacité à y répondre.</blockquote></section><CTA /></>
}

function Services() {
  return <><PageHero eyebrow="Services" title="Du diagnostic à la continuité." intro="Une offre structurée autour de quatre piliers pour sécuriser l’ensemble du cycle de risque." /><section className="section wrap"><PillarCards detailed /></section><CTA /></>
}

function Sectors() {
  return <><PageHero eyebrow="Secteurs" title="Protéger ce qui fait fonctionner votre organisation." intro="Nous adaptons la méthode aux contraintes, aux équipes et au niveau de maturité de chaque structure." /><section className="section wrap"><div className="sector-grid large">{sectors.map(({ title, text, icon: Icon }, i) => <article key={title}><span>0{i+1}</span><Icon /><h2>{title}</h2><p>{text}</p><ul><li>Analyse du contexte</li><li>Priorisation des actifs critiques</li><li>Plan d’amélioration progressif</li></ul></article>)}</div></section><CTA /></>
}

function References() {
  return <><PageHero eyebrow="Références" title="La méthode avant la promesse." intro="Quelques scénarios d’intervention représentatifs. Les informations clients restent confidentielles." /><section className="section wrap"><div className="case-grid">{cases.map(({ tag, title, text, icon: Icon }, i) => <article key={title}><div><Icon /><span>{tag}</span></div><p className="case-number">CAS 0{i+1}</p><h2>{title}</h2><p>{text}</p><small>Scénario anonymisé</small></article>)}</div></section><CTA /></>
}

function Watch() {
  return <><PageHero eyebrow="Blog & veille" title="Comprendre pour mieux protéger." intro="Des contenus courts et utiles pour améliorer les décisions de sécurité au quotidien." /><section className="section wrap"><div className="article-grid featured">{articles.map((a, i) => <article key={a.title}><span>{a.date} · Lecture {3+i} min</span><h2>{a.title}</h2><p>{a.excerpt}</p><button className="text-link" type="button">Article prochainement disponible <ArrowRight size={17} /></button></article>)}</div></section><CTA /></>
}

function Team() {
  return <><PageHero eyebrow="Équipe" title="Des expertises qui travaillent ensemble." intro="La cybersécurité exige des regards complémentaires : gouvernance, systèmes, réseaux, développement et accompagnement." /><section className="section wrap"><div className="team-intro"><div><p className="eyebrow">Organisation</p><h2>Une équipe conçue autour de vos enjeux.</h2></div><p>Les profils nominatifs et portraits seront publiés après validation. La structure ci-dessous présente les fonctions mobilisées selon les missions.</p></div><div className="team-grid">{teamRoles.map(([role, text], i) => <article key={role}><span>0{i+1}</span><div className="avatar-placeholder">CT</div><h3>{role}</h3><p>{text}</p></article>)}</div></section><CTA /></>
}

function Contact() {
  return <><PageHero eyebrow="Contact" title="Commençons par votre priorité." intro="Décrivez le contexte en quelques lignes. Nous vous recontactons pour qualifier le besoin et la prochaine étape." /><section className="section wrap contact-grid"><div className="contact-details"><h2>Parlons sécurité, simplement.</h2><p>Audit, incident, protection ou supervision : indiquez ce qui vous préoccupe et le niveau d’urgence.</p><div><span><MapPin /> Libreville, Gabon</span><span><Clock3 /> Lun–Ven · 08:00–17:00</span><span><Mail /> Adresse e-mail à confirmer</span><span><Phone /> Numéro à confirmer</span></div></div><form className="contact-form" onSubmit={e => e.preventDefault()}><label>Nom complet<input required name="name" placeholder="Votre nom" /></label><label>Adresse e-mail<input required type="email" name="email" placeholder="vous@entreprise.com" /></label><label>Organisation<input name="company" placeholder="Nom de votre organisation" /></label><label>Votre besoin<select name="need" defaultValue=""><option value="" disabled>Sélectionner</option>{pillars.map(p => <option key={p.slug}>{p.title}</option>)}</select></label><label className="full">Message<textarea required name="message" rows="6" placeholder="Contexte, systèmes concernés, urgence…" /></label><button className="button full" type="submit">Préparer la demande <ArrowRight size={18} /></button><small className="full">Formulaire de démonstration — aucun message n’est encore transmis.</small></form></section></>
}

function Legal({ privacy = false }) {
  return <><PageHero eyebrow={privacy ? 'Confidentialité' : 'Informations légales'} title={privacy ? 'Vos données méritent de la clarté.' : 'Mentions légales.'} intro="Cette page sera finalisée avec les informations administratives et l’hébergement validés avant la mise en ligne." /><section className="section wrap legal-copy">{privacy ? <><h2>Données collectées</h2><p>Le futur formulaire pourra collecter les coordonnées et le message transmis volontairement afin de répondre à la demande. La durée de conservation et le responsable de traitement seront précisés avant activation.</p><h2>Vos droits</h2><p>Les modalités d’accès, de rectification et de suppression seront publiées avec une adresse de contact dédiée.</p></> : <><h2>Éditeur</h2><p>CardinalTech — Cybersécurité & Infrastructures. Forme juridique, immatriculation, direction de publication et coordonnées complètes à confirmer.</p><h2>Hébergement</h2><p>Prestataire, adresse et contact à renseigner après choix de l’infrastructure de production.</p></>}</section></>
}

function NotFound() { return <section className="not-found grid-bg"><p className="eyebrow">Erreur 404</p><h1>Cette page n’existe pas.</h1><Link className="button" to="/">Retour à l’accueil</Link></section> }

export default function App() {
  return <Layout><Routes><Route path="/" element={<Home />} /><Route path="/a-propos" element={<About />} /><Route path="/services" element={<Services />} /><Route path="/secteurs" element={<Sectors />} /><Route path="/references" element={<References />} /><Route path="/veille" element={<Watch />} /><Route path="/equipe" element={<Team />} /><Route path="/contact" element={<Contact />} /><Route path="/mentions-legales" element={<Legal />} /><Route path="/confidentialite" element={<Legal privacy />} /><Route path="*" element={<NotFound />} /></Routes></Layout>
}
