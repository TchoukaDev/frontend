# 🏃‍♂️ Les Randonneurs des Sables du Born

> Site web moderne pour le club de marche aquatique de Biscarrosse

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![Strapi](https://img.shields.io/badge/Strapi-CMS-blueviolet?logo=strapi)](https://strapi.io/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📖 À propos

Site développé **bénévolement** pour le club de marche aquatique de Biscarrosse.

**Objectif :** Offrir une plateforme moderne, performante et facilement administrable pour promouvoir les activités du club et faciliter la gestion des membres.

![Aperçu du site](./docs/home.png)

---

## ✨ Fonctionnalités

### 🌍 Partie publique

- 📰 **Actualités & événements** du club (pagination dynamique)
- 📄 **Pages d'information** (horaires, tarifs, contact...)
- 🖼️ **Galerie photos** optimisée
- 📧 **Formulaire de contact** avec envoi d'email
- 📱 **Design responsive** (mobile-first)

### 🔐 Espace membres

- 👤 **Authentification sécurisée** (JWT + cookies persistants)
- 📄 **Publications privées** (documents réservés aux membres)
- 🔑 **Gestion des rôles** (membre standard / administrateur)
- 🔒 **Réinitialisation de mot de passe**
- 🛡️ **Protection anti-brute force** (blocage après échecs répétés)

### 🎨 Administration (Strapi)

- ✏️ **Gestion de contenu** (WYSIWYG)
- 📝 **Création/modification d'articles**
- 🖼️ **Upload d'images** (Cloudinary)
- 📎 **Gestion de documents PDF**
- 👥 **Gestion des utilisateurs et rôles**
- 🔗 **Personnalisation des liens footer**

---

## 🛠️ Stack Technique

### Frontend

| Technologie         | Usage                             |
| ------------------- | --------------------------------- |
| **Next.js 15**      | Framework React (App Router, ISR) |
| **React 18**        | UI Components                     |
| **TailwindCSS**     | Styling & design system           |
| **Framer Motion**   | Animations fluides                |
| **React Hook Form** | Gestion des formulaires           |
| **Zod**             | Validation de schémas             |
| **TanStack Query**  | Cache & data fetching client      |
| **Lucide React**    | Icônes                            |

### Backend & Infra

| Technologie              | Usage                          |
| ------------------------ | ------------------------------ |
| **Strapi**               | Headless CMS                   |
| **Next.js API Routes**   | Endpoints custom               |
| **NextAuth.js**          | Authentification & sessions    |
| **Neon PostgreSQL**      | Base de données                |
| **Cloudinary**           | CDN & optimisation d'images    |
| **Resend + React Email** | Envoi d'emails transactionnels |

### Outils & Libraries

- **PDF.js** : Prévisualisation thumbnails PDF
- **Blocks React Renderer** : Affichage Rich Text Strapi
- **js-cookie** : Gestion cookies côté client
- **React Spinners** : Indicateurs de chargement

---

## 🚀 Performance & Optimisation

### ⚡ Stratégie de cache

- **ISR (Incremental Static Regeneration)** : Pages statiques régénérées toutes les 5 min
- **CDN Global (Vercel)** : Distribution mondiale ultra-rapide
- **TanStack Query** : Cache client intelligent
- **Cloudinary CDN** : Images optimisées (WebP/AVIF) + lazy loading

### 🎯 Performance (PageSpeed Insights)

**Mobile** 📱

- **Performance** : 99/100 🔥
- **Accessibility** : 92/100 ♿
- **Best Practices** : 100/100 ✅
- **SEO** : 100/100 🔍

![PageSpeed Insights](/pagespeed.png)

### 🔍 SEO

- ✅ Métadonnées dynamiques par page
- ✅ Open Graph & Twitter Cards
- ✅ Sitemap.xml généré automatiquement
- ✅ Robots.txt optimisé
- ✅ URLs canoniques
- ✅ Structured data (JSON-LD)

---

## 📦 Installation

### Prérequis

- Node.js 18+
- PostgreSQL (ou compte Supabase)
- Compte Cloudinary
- Compte Resend (emails)

### Steps

```bash
# 1. Clone le repo
git clone https://github.com/ton-username/randonneurs-sables.git
cd randonneurs-sables

# 2. Install dependencies
npm install

# 3. Configure les variables d'environnement
cp .env.example .env.local

# Strapi
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_token

# Database (Supabase)
DATABASE_URL=postgresql://...

# Auth
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud

# Email
RESEND_API_KEY=your_key

```

🏗️ Architecture
text
├── src/
│ ├── app/ # Pages & routes (App Router)
│ │ ├── (public)/ # Routes publiques
│ │ ├── (protected)/ # Routes protégées (auth)
│ │ └── api/ # API routes
│ ├── components/
│ │ ├── Pages/ # Composants de pages
│ │ ├── ui/ # Composants UI réutilisables
│ │ └── Utils/ # Utilitaires (Pagination, etc.)
│ ├── contexts/ # React Contexts
│ ├── hooks/ # Custom hooks
│ ├── libs/ # Configurations (Strapi, Auth...)
│ └── utils/ # Fonctions utilitaires
├── public/ # Assets statiques
└── middleware.js # Protection des routes

🎓 Ce que j'ai appris
Ce projet m'a permis de maîtriser :

✅ Next.js 15 (App Router, RSC, ISR, Middleware)
✅ Architecture Server/Client Components
✅ Authentification complète (JWT, sessions, rôles)
✅ Headless CMS (Strapi, API REST)
✅ Optimisation avancée (ISR, CDN, cache multi-niveaux)
✅ SEO technique (metadata, sitemap, structured data)
✅ Gestion d'état (Context, TanStack Query)
✅ Sécurité (CORS, rate limiting, protection routes)
✅ Déploiement production (Vercel + VPS)

📸 Screenshots
Page d'accueil
Home

Page actualités (pagination)
Actualités

Espace membre
Espace protégé

Version mobile
Mobile

🔗 Liens
🌐 Site en ligne : https://www.marcheaquatique-lesrandonneursdessables.fr/
📊 Lighthouse Report : Voir le rapport
📝 License
MIT © Romain WIRTH

🙏 Remerciements
Développé bénévolement pour le club Les Randonneurs des Sables du Born de Biscarrosse.

Un grand merci au responsable du club pour sa confiance et son accompagnement tout au long du projet.
