export const pillars = [
  { slug: 'audit', title: 'Audit', eyebrow: 'Identifier avant de corriger', icon: 'stethoscope', summary: 'Cartographier vos risques, tester vos défenses et prioriser les actions utiles.', services: ['Sites web et applications', 'Serveurs Linux, routeurs, switches et pare-feux', 'Réseaux Wi-Fi', 'Bases PostgreSQL, MySQL, MariaDB et Oracle'] },
  { slug: 'protection', title: 'Protection', eyebrow: 'Réduire votre surface d’attaque', icon: 'shield-check', summary: 'Déployer des couches de défense cohérentes, maintenables et adaptées au terrain.', services: ['IDS / IPS', 'Antivirus open source', 'WAF et protection applicative', 'Durcissement Linux / Windows', 'Messagerie sécurisée'] },
  { slug: 'surveillance', title: 'Surveillance', eyebrow: 'Voir ce qui compte', icon: 'radar', summary: 'Centraliser les signaux, détecter les écarts et garder une lecture claire de vos systèmes.', services: ['Déploiement SIEM', 'Supervision avec Zabbix', 'Tableaux de bord et alertes exploitables'] },
  { slug: 'reaction', title: 'Réaction', eyebrow: 'Agir avec méthode', icon: 'siren', summary: 'Limiter l’impact, restaurer les services et renforcer l’existant après un incident.', services: ['Récupération de données — niveau 1', 'Sauvegardes MySQL et PostgreSQL', 'Externalisation', 'Assistance sécurité et dépannage'] },
]

export const sectors = [
  { title: 'PME', text: 'Un socle pragmatique, compatible avec des équipes et budgets maîtrisés.', icon: 'building-2' },
  { title: 'Administrations', text: 'Continuité de service, traçabilité et protection des services essentiels.', icon: 'landmark' },
  { title: 'Finance', text: 'Défense renforcée des données, accès et flux sensibles.', icon: 'lock-keyhole' },
  { title: 'Infrastructures', text: 'Supervision et sécurisation des systèmes critiques et distribués.', icon: 'server-cog' },
]

export const cases = [
  { tag: 'Audit', title: 'Rendre une exposition web lisible', text: 'Cartographie des actifs, qualification des vulnérabilités et feuille de route priorisée.', icon: 'eye' },
  { tag: 'Surveillance', title: 'Centraliser les alertes utiles', text: 'Déploiement progressif d’une supervision adaptée aux équipes et aux services critiques.', icon: 'activity' },
  { tag: 'Continuité', title: 'Sécuriser les sauvegardes', text: 'Automatisation, contrôles de restauration et externalisation des données essentielles.', icon: 'database-backup' },
]

export const articles = [
  { category: 'Guide', title: 'Pourquoi un audit avant d’ajouter un nouvel outil ?', excerpt: 'Partir des risques réels évite d’empiler des solutions coûteuses et difficiles à piloter.' },
  { category: 'Conseil', title: 'Trois signaux à surveiller sur une infrastructure PME', excerpt: 'Disponibilité, changements inattendus et authentifications racontent déjà beaucoup.' },
  { category: 'Continuité', title: 'Une sauvegarde non testée est-elle vraiment une sauvegarde ?', excerpt: 'La restauration doit être documentée, mesurée et répétée avant l’incident.' },
]

export const processSteps = [
  ['01', 'Cadrer', 'Vos actifs, vos usages, vos contraintes.'], ['02', 'Diagnostiquer', 'Des constats concrets et hiérarchisés.'],
  ['03', 'Renforcer', 'Des actions utiles, documentées et mesurables.'], ['04', 'Suivre', 'Une visibilité durable sur votre sécurité.'],
]

export const navItems = [
  ['À propos', '/a-propos'], ['Services', '/services'], ['Secteurs', '/secteurs'],
  ['Références', '/references'], ['Veille', '/veille'], ['Équipe', '/equipe'],
]

export const teamRoles = [
  { role: 'Direction', summary: 'Vision, gouvernance et relation de confiance.', description: 'La direction transforme les enjeux métiers en priorités de sécurité compréhensibles. Elle garantit le cadrage des missions, la confidentialité des échanges et la cohérence des décisions.', responsibilities: ['Cadrage et gouvernance', 'Relation de confiance', 'Pilotage des engagements'] },
  { role: 'Sécurité', summary: 'Audit, tests, détection et réponse.', description: 'Le pôle sécurité identifie les expositions, qualifie les risques et construit des recommandations vérifiables. Il intervient également pour la détection et la réponse de premier niveau.', responsibilities: ['Audits techniques', 'Analyse des risques', 'Détection et réaction'] },
  { role: 'Systèmes & réseaux', summary: 'Durcissement, disponibilité et supervision.', description: 'Ce pôle relie la sécurité aux réalités de l’infrastructure : serveurs, réseaux, sauvegardes et services critiques. Chaque évolution tient compte de la continuité d’activité.', responsibilities: ['Durcissement', 'Supervision', 'Continuité des services'] },
  { role: 'Développement', summary: 'Automatisation et outils internes.', description: 'Le développement automatise les contrôles répétitifs et crée les outils nécessaires au suivi. L’objectif reste une sécurité maintenable, traçable et adaptée aux équipes.', responsibilities: ['Automatisation', 'Intégration sécurisée', 'Outils de suivi'] },
]

export const faqItems = [
  ['Pourquoi commencer par un audit ?', 'L’audit donne une vision factuelle des actifs, des faiblesses et des priorités. Il évite d’investir à l’aveugle.'],
  ['CardinalTech intervient-il après un incident ?', 'Oui. Le pilier Réaction couvre l’assistance, la récupération de premier niveau et la remise en sécurité progressive.'],
  ['Pouvez-vous superviser une infrastructure existante ?', 'Oui. Nous pouvons déployer une supervision Zabbix et une approche SIEM sans remplacer tout l’environnement.'],
  ['Travaillez-vous avec les PME ?', 'Oui. L’offre est progressive, documentée et proportionnée aux moyens de chaque organisation.'],
]
