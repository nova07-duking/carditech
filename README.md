# CardinalTech

Refonte du site institutionnel CardinalTech — Cybersécurité & Infrastructures.

## Démarrage

```powershell
pnpm install
pnpm dev
```

## Architecture

Le site repose sur une base volontairement légère, sans framework côté client :

- `index.html` fournit le document HTML et le point de montage de l’application ;
- `src/main.js` contient le routeur, les gabarits réutilisables et les interactions en JavaScript natif ;
- `src/styles.css` centralise les styles, les variantes responsives et les animations ;
- `src/data/content.js` regroupe les contenus structurés afin d’éviter les répétitions entre les pages.

Les icônes Lucide sont importées individuellement et Vite assure le serveur de développement ainsi que l’optimisation de production.

## Vérification de production

```powershell
pnpm build
pnpm preview
```

La commande complète de contrôle est :

```powershell
pnpm test
```

Elle vérifie les liens et ressources internes avant de compiler la version de production.

La politique et la matrice des contrôles sont documentées dans [`SECURITY.md`](SECURITY.md). La CI audite aussi les vulnérabilités connues des dépendances et les mises à jour sont surveillées par Dependabot.

## Mise en production

- Le site contient les règles de réécriture SPA pour Netlify (`public/_redirects`) et Vercel (`vercel.json`).
- `public/_headers` fournit les principaux en-têtes de sécurité sur les hébergeurs compatibles.
- HTTPS et la redirection HTTP vers HTTPS doivent être activés au niveau du domaine ou de l’hébergeur. HSTS ne doit être envoyé qu’en HTTPS.
- Remplacer les URL GitHub Pages de `public/sitemap.xml` et `public/robots.txt` par le domaine final avant indexation.
- Définir facultativement `VITE_GA_ID` à partir de `.env.example`. Le script Analytics n’est chargé qu’après consentement explicite.
- Le formulaire comporte validation, consentement, champ leurre et délai anti-robot, mais sa transmission doit passer par un backend protégé par limitation de débit, validation serveur et anti-spam. Aucun secret ni appel privilégié ne doit être placé dans le frontend.

## Données et conformité

Les pages de confidentialité, RGPD, conditions générales et mentions légales sont présentes, mais les informations juridiques, durées de conservation, coordonnées et sous-traitants doivent être validés avant publication.

Le formulaire de contact est volontairement non connecté dans cette première maquette. Les coordonnées, profils nominatifs, mentions légales et informations d’hébergement doivent être validés avant publication.
