# Sécurité du projet

## Signaler une vulnérabilité

N’ouvrez pas de ticket public avec une preuve d’exploitation ou des données sensibles. Utilisez le canal privé de sécurité du dépôt GitHub ou contactez l’équipe CardinalTech lorsque son adresse dédiée sera publiée.

## Périmètre actuel

Le projet est un site vitrine statique. Il ne contient actuellement ni compte utilisateur, ni paiement, ni modèle d’intelligence artificielle, ni API métier. Les protections propres à ces fonctions devront être conçues côté serveur avant leur ajout.

| Contrôle | État actuel |
| --- | --- |
| Timeout des appels API ou IA | Non applicable : aucun appel métier |
| Prévention des fuites vers une IA | Non applicable : aucune IA |
| Validation des réponses IA | Non applicable : aucune IA |
| Moindre privilège de l’IA | Non applicable : aucune IA |
| Secret ou donnée sensible dans le navigateur | Interdit ; seules les variables publiques `VITE_*` non sensibles sont admises |
| Redirections ouvertes | Aucune redirection construite depuis une entrée utilisateur |
| Connexions protégées | HTTPS/HSTS et CSP préparés dans les configurations d’hébergement |
| Authentification multifacteur | À imposer sur GitHub, le registrar et l’hébergeur |
| Énumération de comptes | Non applicable : aucun compte |
| Contournement ou rejeu de paiement | Non applicable : aucun paiement |
| Double soumission | Le formulaire n’envoie encore aucune donnée ; le futur backend devra utiliser idempotence et limitation de débit |
| Droits de déploiement | À limiter dans les paramètres GitHub et de l’hébergeur |
| Code externe | Dépendances figées, audit automatique et mises à jour Dependabot |
| Panne d’un service critique | Aucun service critique actuellement ; le futur backend devra échouer en mode sûr |

## Contrôles automatisés

`pnpm test` vérifie les routes, les constructions JavaScript dangereuses, les versions exactes, les en-têtes de sécurité et le build de production. La CI exécute également `pnpm audit --audit-level=moderate`.
