# ECO-STRUCT RWANDA LTD — Site vitrine

Site bilingue (EN/FR) de construction, rénovation et solutions techniques au Rwanda.
En ligne : https://eco-sturct.com

## Stack
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · lucide-react · nodemailer · Vercel

## Structure
```
app/
├── components/
│   ├── layout/      Header, Footer
│   ├── sections/    Sections de la page d'accueil (Hero, Services, Process, Gallery, …)
│   └── ui/          Composants réutilisables (Reveal)
├── data/
│   ├── media.ts     Logos et photos de la galerie
│   └── projects.ts  Réalisations (titre, photo, icône, type de travaux)
├── i18n/            Traductions en.json / fr.json + LanguageContext
├── api/contact/     Envoi des emails du formulaire (SMTP)
├── realisations/  careers/  contact/   Pages
└── sitemap.ts  robots.ts  layout.tsx  page.tsx
public/
├── images/  equipe/  logo/  projects/
└── videos/
```

## Ajouter une réalisation
Ajouter la photo dans `public/images/projects/`, puis une entrée dans `app/data/projects.ts`.

## Développement
```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Formulaire de contact
Variables à définir dans Vercel → Settings → Environment Variables (voir `.env.example`) :
`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`.

## Déploiement
Chaque push sur `main` déclenche un déploiement Vercel (domaine `eco-sturct.com`).
