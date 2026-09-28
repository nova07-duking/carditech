import '@fontsource/barlow-condensed/latin-600.css'
import '@fontsource/barlow-condensed/latin-700.css'
import {
  createIcons, Activity, ArrowRight, ArrowUpRight, Building2, Check, ChevronDown,
  ChevronLeft, ChevronRight, Clock3, DatabaseBackup, Eye, Landmark, LockKeyhole,
  Mail, MapPin, Menu, Phone, Radar, ServerCog, ShieldCheck, Siren, Stethoscope,
  Target, UsersRound, X,
} from 'lucide'
import './styles.css'
import { articles, cases, faqItems, navItems, pillars, processSteps, sectors, teamRoles } from './data/content'
import { legalDocuments, pageMeta, site } from './config/site'

const iconSet = {
  Activity, ArrowRight, ArrowUpRight, Building2, Check, ChevronDown, ChevronLeft,
  ChevronRight, Clock3, DatabaseBackup, Eye, Landmark, LockKeyhole, Mail, MapPin,
  Menu, Phone, Radar, ServerCog, ShieldCheck, Siren, Stethoscope, Target, UsersRound, X,
}
const app = document.querySelector('#app')
const consentKey = 'cardinaltech-consent-v1'

const icon = name => `<i data-lucide="${name}" aria-hidden="true"></i>`
const link = (label, href, className = '') => `<a class="${className}" href="${href}">${label}</a>`

function replaceMarkup(element, markup) {
  const documentFragment = new DOMParser().parseFromString(markup, 'text/html')
  element.replaceChildren(...[...documentFragment.body.childNodes].map(node => document.importNode(node, true)))
}

function brand() {
  return `<a class="brand" href="/" aria-label="CardinalTech — accueil"><img src="/images/logo-acs-header.png" alt="ACS — Agence de Cyber Sécurité"></a>`
}

function header() {
  const navigation = navItems.map(([label, href]) => `<a href="${href}">${label}</a>`).join('')
  return `<div class="announcement"><span>CardinalTech</span> Votre partenaire local en cybersécurité et infrastructures ${icon('chevron-right')}</div>
    <header class="site-header">
      ${brand()}
      <button class="menu-toggle" type="button" aria-expanded="false" aria-label="Ouvrir le menu">${icon('menu')}</button>
      <nav class="main-nav" aria-label="Navigation principale">${navigation}${link(`Demander un audit ${icon('arrow-up-right')}`, '/contact', 'button small')}</nav>
    </header>`
}

function footer() {
  return `<footer class="site-footer"><div class="footer-grid">
    <div class="footer-lead">${brand()}<p>Cybersécurité et infrastructures pensées pour les réalités du terrain.</p></div>
    <div><strong>Expertises</strong><a href="/services">Audit & protection</a><a href="/services">Surveillance & réaction</a></div>
    <div><strong>CardinalTech</strong><a href="/a-propos">À propos</a><a href="/equipe">Équipe</a><a href="/contact">Contact</a></div>
    <div><strong>Informations</strong><a href="/mentions-legales">Mentions légales</a><a href="/conditions-generales">Conditions générales</a><a href="/confidentialite">Confidentialité</a><a href="/rgpd">Protection des données</a></div>
    <div class="footer-bottom"><span>© ${new Date().getFullYear()} CardinalTech</span><span>Libreville · Gabon</span></div>
  </div></footer>`
}

function cookieBanner() {
  let choice = null
  try { choice = localStorage.getItem(consentKey) } catch { choice = 'refused' }
  if (choice) return ''
  return `<aside class="cookie-banner" aria-label="Préférences de confidentialité">${icon('shield-check')}<div><strong>Votre confidentialité, sans détour.</strong><p>Seul votre choix est mémorisé. La mesure d’audience reste désactivée sans votre accord.</p><a href="/confidentialite">Lire la politique de confidentialité</a></div><div class="cookie-actions"><button class="button outline" type="button" data-consent="refused">Refuser</button><button class="button" type="button" data-consent="accepted">Accepter</button></div><button class="cookie-close" type="button" data-consent="refused" aria-label="Refuser et fermer">${icon('x')}</button></aside>`
}

function pageHero(eyebrow, title, intro) {
  return `<section class="page-hero"><div class="wrap"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${intro}</p></div></section>`
}

function cta() {
  return `<section class="cta-band"><div><p class="eyebrow">Une question de sécurité ?</p><h2>Transformons le risque en plan d’action.</h2></div>${link(`Parler à un expert ${icon('arrow-up-right')}`, '/contact', 'button dark')}</section>`
}

function metrics(items) {
  return `<section class="metrics wrap">${items.map(([value, label]) => `<div><b>${value}</b><span>${label}</span></div>`).join('')}</section>`
}

function capabilityPanel(index = 0) {
  const pillar = pillars[index]
  return `<div class="pillar-visual">${icon(pillar.icon)}<span></span><span></span></div><div class="pillar-copy"><p class="eyebrow">${pillar.eyebrow}</p><h3>${pillar.title}</h3><p>${pillar.summary}</p><ul>${pillar.services.slice(0, 4).map(item => `<li>${icon('check')}${item}</li>`).join('')}</ul>${link(`Explorer ce pilier ${icon('arrow-right')}`, `/services#${pillar.slug}`, 'button')}</div>`
}

function homePage() {
  const highlights = [
    ['shield-check', 'Protection intégrée', 'Des contrôles cohérents pour les systèmes, réseaux et données.'],
    ['radar', 'Visibilité opérationnelle', 'Des alertes utiles et une supervision lisible par vos équipes.'],
    ['users-round', 'Expertise locale', 'Un accompagnement documenté et adapté à votre maturité.'],
  ]
  return `<section class="home-hero"><div class="hero-copy"><p class="eyebrow">Cybersécurité & infrastructures</p><h1>Nous protégeons vos infrastructures <em>critiques.</em></h1><p>CardinalTech empêche les risques numériques de devenir des interruptions d’activité. Une approche claire, locale et structurée.</p><div class="actions">${link(`Parler à un expert ${icon('arrow-right')}`, '/contact', 'button')}${link('Explorer nos services', '/services', 'text-link')}</div></div><div class="hero-logo"><img src="/images/logo-acs-transparent.png" alt="ACS — Agence de Cyber Sécurité"></div></section>
    <section class="highlights wrap">${highlights.map(([name, title, text], i) => `<article>${icon(name)}<span>0${i + 1}</span><h2>${title}</h2><p>${text}</p></article>`).join('')}</section>
    ${metrics([['4', 'piliers complémentaires'], ['360°', 'du diagnostic à la reprise'], ['24/7', 'une sécurité pensée en continu'], ['Local', 'un partenaire à Libreville']])}
    <section class="section wrap"><div class="section-heading"><div><p class="eyebrow">Notre plateforme de services</p><h2>Analyser. Protéger.<br>Surveiller. Réagir.</h2></div><p>Chaque pilier renforce le suivant pour produire des résultats compréhensibles et mesurables.</p></div><div class="capabilities"><div class="capability-tabs" role="tablist" aria-label="Piliers CardinalTech">${pillars.map((pillar, i) => `<button type="button" role="tab" data-pillar="${i}" aria-selected="${i === 0}"><span>0${i + 1}</span>${pillar.title}${icon('chevron-right')}</button>`).join('')}</div><div class="capability-panel" role="tabpanel">${capabilityPanel()}</div></div></section>
    <section class="image-story wrap"><figure><img src="/images/cardinaltech-building.webp" alt="Identité CardinalTech sur un bâtiment"><figcaption>Une expertise proche du terrain</figcaption></figure><div><p class="eyebrow">L’avantage CardinalTech</p><h2>La cybersécurité doit rester compréhensible.</h2><p>Nous transformons les constats techniques en décisions claires. Chaque recommandation répond à un risque et à un résultat attendu.</p>${link(`Comprendre notre approche ${icon('arrow-right')}`, '/a-propos', 'text-link')}</div></section>
    <section class="section soft"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">Notre méthode</p><h2>De la visibilité à la maîtrise.</h2></div></div><div class="process">${processSteps.map(([n, title, text]) => `<article><span>${n}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></div></section>
    <section class="section wrap"><div class="section-heading"><div><p class="eyebrow">Secteurs critiques</p><h2>Protéger les organisations qui font avancer le pays.</h2></div><p>PME, administrations, finance et infrastructures : les contextes changent, l’exigence de continuité reste la même.</p></div><div class="sector-list">${sectors.map(({ title, text, icon: iconName }, i) => `<a href="/secteurs"><span>0${i + 1}</span>${icon(iconName)}<div><h3>${title}</h3><p>${text}</p></div>${icon('arrow-right')}</a>`).join('')}</div></section>
    <section class="statement"><p class="eyebrow">Notre principe</p><blockquote>Une défense utile aide l’organisation à comprendre, décider et continuer.</blockquote>${link(`Découvrir notre approche ${icon('arrow-right')}`, '/a-propos', 'text-link light')}</section>
    <section class="section wrap"><div class="section-heading"><div><p class="eyebrow">Informations du terrain</p><h2>Des repères pour décider.</h2></div>${link(`Toutes les ressources ${icon('arrow-right')}`, '/veille', 'text-link')}</div>${articleGrid()}</section>
    <section class="section soft"><div class="wrap faq-layout"><div><p class="eyebrow">Questions fréquentes</p><h2>Ce qu’il faut savoir avant de commencer.</h2></div><div class="faq-list">${faqItems.map(([q, a], i) => `<article><button type="button" aria-expanded="${i === 0}" data-faq><span>0${i + 1}</span><b>${q}</b>${icon('chevron-down')}</button><div class="faq-answer" ${i === 0 ? '' : 'hidden'}><p>${a}</p></div></article>`).join('')}</div></div></section>${cta()}`
}

function articleGrid(featured = false) {
  return `<div class="article-grid ${featured ? 'featured' : ''}">${articles.map((article, i) => `<article data-category="${article.category.toLowerCase()}"><span>${article.category}</span><b>0${i + 1}</b><h3>${article.title}</h3><p>${article.excerpt}</p>${featured ? '<button class="text-link" type="button">Article prochainement disponible</button>' : `<a href="/veille" aria-label="Lire ${article.title}">${icon('arrow-right')}</a>`}</article>`).join('')}</div>`
}

function aboutPage() {
  return `<section class="about-hero"><div><p class="eyebrow">À propos de CardinalTech</p><h1>Une cybersécurité ancrée dans le réel.</h1><p>Nous accompagnons les organisations dans la protection de leurs systèmes, de leurs données et de leur continuité d’activité.</p></div><figure><img src="/images/cardinaltech-building.webp" alt="Identité CardinalTech sur un bâtiment"><figcaption>Libreville · Expertise de proximité</figcaption></figure></section>
    <section class="section wrap two-columns"><div><p class="eyebrow">Notre mission</p><h2>Rendre la sécurité actionnable.</h2></div><div><p>Nous rapprochons expertise technique et réalités opérationnelles. Notre rôle n’est pas d’ajouter de la complexité, mais de rendre les risques visibles et les réponses possibles.</p><p>Depuis Libreville, nous construisons une relation fondée sur la précision, la transparence et la transmission.</p></div></section>
    <section class="values wrap">${[['target','Précision','Des constats vérifiables et des priorités explicites.'],['shield-check','Responsabilité','La sécurité pensée pour durer, pas pour impressionner.'],['users-round','Proximité','Une équipe accessible qui comprend votre contexte.']].map(([name,title,text],i)=>`<article>${icon(name)}<span>0${i+1}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</section>
    ${metrics([['Local','une présence à Libreville'],['4','piliers de défense'],['Clair','des décisions explicables'],['Durable','des solutions maintenables']])}
    <section class="quote wrap"><blockquote>La confiance numérique se construit avant l’incident — et se mesure dans la capacité à y répondre.</blockquote></section>${cta()}`
}

function servicesPage() {
  return `${pageHero('Services', 'Du diagnostic à la continuité.', 'Une offre structurée autour de quatre piliers pour sécuriser l’ensemble du cycle de risque.')}${metrics([['01','identifier les risques'],['02','réduire l’exposition'],['03','détecter les écarts'],['04','restaurer l’activité']])}<section class="section wrap service-list">${pillars.map((pillar,i)=>`<article id="${pillar.slug}"><header><span>0${i+1}</span>${icon(pillar.icon)}<div><p class="eyebrow">${pillar.eyebrow}</p><h2>${pillar.title}</h2><p>${pillar.summary}</p></div></header><ul>${pillar.services.map(item=>`<li>${icon('check')}${item}</li>`).join('')}</ul></article>`).join('')}</section>${cta()}`
}

function sectorsPage() {
  return `${pageHero('Secteurs', 'Protéger ce qui fait fonctionner votre organisation.', 'Nous adaptons la méthode aux contraintes, aux équipes et au niveau de maturité de chaque structure.')}<section class="section wrap sector-pages">${sectors.map(({title,text,icon:iconName},i)=>`<article><span>0${i+1}</span>${icon(iconName)}<h2>${title}</h2><p>${text}</p><ul><li>Analyse du contexte</li><li>Priorisation des actifs critiques</li><li>Plan d’amélioration progressif</li></ul></article>`).join('')}</section>${cta()}`
}

function referencesPage() {
  return `${pageHero('Références', 'La méthode avant la promesse.', 'Des scénarios représentatifs. Les informations clients restent confidentielles.')}<section class="section wrap case-list">${cases.map(({tag,title,text,icon:iconName},i)=>`<article><div>${icon(iconName)}<span>${tag}</span></div><b>CAS 0${i+1}</b><h2>${title}</h2><p>${text}</p><small>Scénario anonymisé</small></article>`).join('')}</section>${cta()}`
}

function watchPage() {
  const filters = ['Tous', 'Guide', 'Conseil', 'Continuité']
  return `${pageHero('Blog & veille', 'Comprendre pour mieux protéger.', 'Des contenus courts et utiles pour améliorer les décisions de sécurité au quotidien.')}<section class="filters wrap" aria-label="Filtrer les ressources">${filters.map((item,i)=>`<button type="button" data-filter="${item.toLowerCase()}" class="${i===0?'active':''}">${item}</button>`).join('')}</section><section class="section wrap">${articleGrid(true)}</section>${cta()}`
}

function teamPage() {
  return `${pageHero('Équipe', 'Des expertises qui travaillent ensemble.', 'La cybersécurité exige des regards complémentaires : gouvernance, systèmes, réseaux, développement et accompagnement.')}<section class="section wrap"><div class="section-heading"><div><p class="eyebrow">Organisation</p><h2>Une équipe conçue autour de vos enjeux.</h2></div><p>Nous présentons les fonctions réellement mobilisées, sans inventer de biographies ou de portraits.</p></div><div class="team-grid">${teamRoles.map(({role,summary},i)=>`<article><button type="button" data-profile="${i}" aria-label="Découvrir le pôle ${role}"><span>0${i+1}</span><div class="role-mark">CT</div><h3>${role}</h3><p>${summary}</p><b>Voir le rôle ${icon('arrow-right')}</b></button></article>`).join('')}</div></section>${cta()}`
}

function contactPage() {
  return `${pageHero('Contact', 'Commençons par votre priorité.', 'Décrivez le contexte en quelques lignes. Nous vous recontacterons pour qualifier le besoin.')}<section class="section wrap contact-layout"><div><p class="eyebrow">Contact</p><h2>Parlons sécurité, simplement.</h2><p>Audit, incident, protection ou supervision : indiquez votre préoccupation et le niveau d’urgence.</p><ul><li>${icon('map-pin')}Libreville, Gabon</li><li>${icon('clock-3')}Lun–Ven · 08:00–17:00</li><li>${icon('mail')}Adresse e-mail à confirmer</li><li>${icon('phone')}Numéro à confirmer</li></ul></div><form class="contact-form"><label>Nom complet<input required minlength="2" maxlength="100" autocomplete="name" name="name"></label><label>Adresse e-mail<input required type="email" maxlength="160" autocomplete="email" name="email"></label><label>Organisation<input maxlength="140" autocomplete="organization" name="company"></label><label>Votre besoin<select required name="need"><option value="">Sélectionner</option>${pillars.map(p=>`<option value="${p.slug}">${p.title}</option>`).join('')}</select></label><label class="full">Message<textarea required minlength="20" maxlength="3000" name="message" rows="6"></textarea></label><label class="honeypot" aria-hidden="true">Votre site web<input tabindex="-1" autocomplete="off" name="website"></label><label class="consent full"><input required type="checkbox" name="privacy"><span>J’ai lu la <a href="/confidentialite">politique de confidentialité</a> et j’accepte le traitement de ma demande.</span></label><button class="button full" type="submit">Préparer la demande ${icon('arrow-right')}</button><p class="form-status full" aria-live="polite">Formulaire de démonstration — aucune donnée n’est encore transmise.</p></form></section>`
}

function legalPage(type) {
  const document = legalDocuments[type]
  return `${pageHero(document.eyebrow, document.title, document.intro)}<section class="section wrap legal-copy">${document.sections.map(([title,body])=>`<section><h2>${title}</h2><p>${body}</p></section>`).join('')}</section>`
}

function notFoundPage() {
  return `<section class="not-found"><p class="eyebrow">Erreur 404</p><h1>Cette page n’existe pas.</h1>${link('Retour à l’accueil','/','button')}</section>`
}

const routes = {
  '/': homePage, '/a-propos': aboutPage, '/services': servicesPage, '/secteurs': sectorsPage,
  '/references': referencesPage, '/veille': watchPage, '/equipe': teamPage, '/contact': contactPage,
  '/mentions-legales': () => legalPage('legal'), '/confidentialite': () => legalPage('privacy'),
  '/rgpd': () => legalPage('rgpd'), '/conditions-generales': () => legalPage('terms'),
}

function layout(content) {
  return `<a class="skip-link" href="#contenu">Aller au contenu</a>${header()}<main id="contenu">${content}</main>${footer()}${cookieBanner()}`
}

function setMeta(pathname) {
  const [label, description] = pageMeta[pathname] || ['Page introuvable', site.defaultDescription]
  const title = pathname === '/' ? `${site.name} — ${label}` : `${label} | ${site.name}`
  const canonical = new URL(pathname, location.origin).toString()
  document.title = title
  const values = { 'meta[name="description"]': description, 'meta[property="og:title"]': title, 'meta[property="og:description"]': description, 'meta[property="og:url"]': canonical, 'meta[name="twitter:title"]': title, 'meta[name="twitter:description"]': description }
  Object.entries(values).forEach(([selector, content]) => document.head.querySelector(selector)?.setAttribute('content', content))
  document.head.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical)
}

function render(pathname = location.pathname) {
  const page = routes[pathname] || notFoundPage
  replaceMarkup(app, layout(page()))
  setMeta(pathname)
  createIcons({ icons: iconSet })
  bindPage(pathname)
  const hashTarget = location.hash && document.querySelector(location.hash)
  requestAnimationFrame(() => hashTarget ? hashTarget.scrollIntoView() : scrollTo({ top: 0 }))
}

function bindPage(pathname) {
  const menu = document.querySelector('.menu-toggle')
  const nav = document.querySelector('.main-nav')
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') === 'true'
    menu.setAttribute('aria-expanded', String(!open))
    menu.setAttribute('aria-label', open ? 'Ouvrir le menu' : 'Fermer le menu')
    nav.classList.toggle('open', !open)
  })
  navItems.forEach(([, href]) => document.querySelector(`.main-nav a[href="${href}"]`)?.classList.toggle('active', href === pathname))

  document.querySelectorAll('[data-pillar]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-pillar]').forEach(tab => tab.setAttribute('aria-selected', String(tab === button)))
    replaceMarkup(document.querySelector('.capability-panel'), capabilityPanel(Number(button.dataset.pillar)))
    createIcons({ icons: iconSet })
  }))
  document.querySelectorAll('[data-faq]').forEach(button => button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true'
    button.setAttribute('aria-expanded', String(!expanded))
    button.nextElementSibling.hidden = expanded
  }))
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item === button))
    document.querySelectorAll('[data-category]').forEach(article => { article.hidden = button.dataset.filter !== 'tous' && article.dataset.category !== button.dataset.filter })
  }))
  document.querySelectorAll('[data-profile]').forEach(button => button.addEventListener('click', () => openProfile(Number(button.dataset.profile))))
  const startedAt = Date.now()
  document.querySelector('.contact-form')?.addEventListener('submit', event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const status = event.currentTarget.querySelector('.form-status')
    status.textContent = data.get('website') || Date.now() - startedAt < 2500 ? 'La demande ne peut pas être préparée. Réessayez dans quelques instants.' : 'Le formulaire est valide. La transmission sécurisée sera activée avec le backend de production.'
  })
  document.querySelectorAll('[data-consent]').forEach(button => button.addEventListener('click', () => saveConsent(button.dataset.consent)))
}

function profileMarkup(index) {
  const profile = teamRoles[index]
  return `<div class="profile-dialog-inner"><button class="profile-close" type="button" aria-label="Fermer la fiche">${icon('x')}</button><button class="profile-nav previous" type="button" aria-label="Rôle précédent">${icon('chevron-left')}</button><div class="profile-copy"><p class="eyebrow">Pôle 0${index+1}</p><h2>${profile.role}</h2><p>${profile.description}</p><ul>${profile.responsibilities.map(item=>`<li>${icon('check')}${item}</li>`).join('')}</ul></div><div class="profile-mark" aria-hidden="true"><span>CT</span><b>0${index+1}</b></div><button class="profile-nav next" type="button" aria-label="Rôle suivant">${icon('chevron-right')}</button></div>`
}

function openProfile(initialIndex) {
  let index = initialIndex
  const dialog = document.createElement('dialog')
  dialog.className = 'profile-dialog'
  const update = () => {
    replaceMarkup(dialog, profileMarkup(index))
    createIcons({ icons: iconSet })
    dialog.querySelector('.profile-close').addEventListener('click', () => dialog.close())
    dialog.querySelector('.previous').addEventListener('click', () => { index = index === 0 ? teamRoles.length - 1 : index - 1; update() })
    dialog.querySelector('.next').addEventListener('click', () => { index = index === teamRoles.length - 1 ? 0 : index + 1; update() })
  }
  update()
  document.body.append(dialog)
  dialog.addEventListener('close', () => dialog.remove())
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close() })
  dialog.showModal()
}

function saveConsent(value) {
  try { localStorage.setItem(consentKey, value) } catch { /* Le stockage peut être désactivé. */ }
  document.querySelector('.cookie-banner')?.remove()
  if (value === 'accepted') enableAnalytics()
}

function enableAnalytics() {
  const measurementId = import.meta.env.VITE_GA_ID
  if (!/^G-[A-Z0-9]+$/.test(measurementId || '') || document.querySelector('[data-cardinaltech-analytics]')) return
  const script = document.createElement('script')
  script.async = true
  script.dataset.cardinaltechAnalytics = 'true'
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  document.head.append(script)
  window.dataLayer = window.dataLayer || []
  window.gtag = (...args) => window.dataLayer.push(args)
  window.gtag('js', new Date())
  window.gtag('config', measurementId, { anonymize_ip: true })
}

document.addEventListener('click', event => {
  const anchor = event.target.closest('a[href^="/"]')
  if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || anchor.target) return
  const url = new URL(anchor.href)
  if (url.origin !== location.origin) return
  event.preventDefault()
  history.pushState({}, '', `${url.pathname}${url.hash}`)
  render(url.pathname)
})
window.addEventListener('popstate', () => render())

try { if (localStorage.getItem(consentKey) === 'accepted') enableAnalytics() } catch { /* Navigation privée stricte. */ }
render()
