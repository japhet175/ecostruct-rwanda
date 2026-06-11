# ECOSTRUCT Rwanda – Site Vitrine

## 📖 Description

Site web professionnel pour **ECOSTRUCT Rwanda**, entreprise de construction, rénovation, électricité, plomberie et aménagement paysager.

- 🌍 **Bilingue** : Anglais / Français
- 📱 **Responsive** : Mobile, tablette, desktop
- ⚡ **Performant** : Optimisé Lighthouse (>90)
- 🔒 **Sécurisé** : Headers CSP, XSS protection

---

## 🛠️ Stack Technique

| Technologie | Version | Rôle |
|-------------|---------|------|
| **Next.js** | 16.2.6 | Framework React (App Router) |
| **TypeScript** | 6.0.3 | Typage statique |
| **Tailwind CSS** | 4.x | Stylisme utilitaire |
| **Vercel** | – | Hébergement & CDN |

---

## 📁 Structure du Projet


---

## 🎨 Système de Design

### Palette de couleurs

| Rôle | Code HEX |
|------|----------|
| Primary – Vert | `#1e3c2c` (green-900) |
| Secondary – Or | `#f59e0b` (amber-500) |
| Background – Blanc | `#ffffff` |
| Background – Gris clair | `#f9fafb` (gray-50) |
| Texte principal | `#374151` (gray-700) |

### Typographie

- **Police** : Inter (Google Fonts)
- **Hiérarchie** :
  - Hero : 5xl → 8xl
  - Titres sections : 3xl → 5xl
  - Corps : text-sm → text-base

### Animations

- `hover:-translate-y-2` : Cartes au survol
- `animate-pulse` : Badges
- `animate-bounce` : Indicateur de scroll
- `group-hover:scale-110` : Icônes

### Composants UI réutilisables

| Composant | Utilisation |
|-----------|-------------|
| `StatCard` | Cartes statistiques (About) |
| `TimelineStep` | Frise chronologique |
| `InputField` | Champ de formulaire flottant |
| `PhotoCard` | Carte galerie |

---

## 🔧 Patterns de développement

### 1. Multilinguisme (Context API)

```tsx
// Appel dans un composant
const { t, language, setLanguage } = useLanguage()
return <h1>{t('Hero.title')}</h1>

--

econstruct/
├── app/
│ ├── components/
│ │ ├── Header.tsx
│ │ ├── Hero.tsx
│ │ ├── AboutSection.tsx
│ │ ├── Services.tsx
│ │ ├── Team.tsx
│ │ ├── Gallery.tsx
│ │ ├── ContactSection.tsx
│ │ └── Footer.tsx
│ ├── i18n/
│ │ ├── LanguageContext.tsx
│ │ ├── en.json
│ │ └── fr.json
│ ├── careers/
│ │ └── page.tsx
│ ├── realisations/
│ │ └── page.tsx
│ ├── layout.tsx
│ └── page.tsx
├── public/
│ ├── images/
│ └── videos/
├── next.config.ts
├── tailwind.config.ts
└── package.json