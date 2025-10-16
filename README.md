# Site Les Randonneurs des Sables du Born

## Introduction

Ce site a été réalisé à la demande du responsable du club de marche aquatique de la ville de Biscarrosse. La partie front a été réalisée avec NextJS et Tailwind CSS et le contenu est géré est modifiable via Strapi. Ce site est majoritairement accessible au grand public, et contient une partie réservée aux membres connectés.

## Stack :

### Frontend :

·      NextJS

·      Tailwind CSS

### Backend :

·      NextJS (API route)

·      STRAPI (gestion de contenu)

·      Supabase POSTGRESQL (base de données)

·      Cloudinary (hébergement des images)

#### Dépendances utilisées :

·      Zod resolver (validation formulaires)

·      React-email + Resend (envoi d’email de contact)

·      Pdfjs-dist (affichage PDF thumbnail)

·      Block-React-Renderer (affichage du rich text Strapi)

·      Tailwindcss

·      Tanstack query (cache client)

·      Framer-motion (animations)

·      Js-cookies (gestion des cookies)

·      Lucide-react (icônes)

·      Tailwind-css (design)

·      React-spinners (loaders)

·      React-hook-form (formulaires)

·      Next-auth(authentification, session, jwt)

## Gestion de contenu :

L’essentiel du contenu du site est modifiable via l’interface administrateur de Strapi. L’utilisateur peut ainsi mettre à jour les informations des différentes pages, créer, supprimer ou modifier des articles, publications ou images de la galerie. Il peut également ajouter des documents dans les publications. Le système de publication est paginé, avec un sélecteur de nombre d’article par page. Les liens du Footer sont également personnalisables.

## Authentification :

Le site comporte une fonctionnalité d’inscription et d’authentification. Une grande partie du contenu est accessible, mais certaines sections sont réservées pour les membres inscrits, ou certains membres avec un rôle spécifique. L’administrateur peut gérer les rôles des comptes dans Strapi directement. L’authentification est gérée via Next-Auth avec une stratégie de jwt par utilisateur, renouvelé régulièrement. A la connexion, l’utilisateur peut choisir de générer un cookie de 30 jours pour conserver son état de connexion (via la checkbox « se souvenir de moi »). Les chemins publics et protégés sont gérés par un fichier middleware. Il est possible pour l’utilisateur de réinitialiser son mot de passe en cas d’oubli. Un système de blocage de compte est également intégré en cas d’échec répété de connexion.

## Optimisation :

Les performances du site sont optimisées afin d’offrir une bonne expérience utilisateur. La plupart des pages sont générées au build et revalidées à intervalle régulier (via l’Incremental Static Generation). Un cache est également mis en place sur chaque page côté client, via Tanstack Query pour limiter les requêtes.

Les images sont hébergées sur Cloudinary, pour conserver une meilleure performance dans Strapi, et l’affichage est optimisé via le composant natif Image de NextJs.

Niveau SEO, chacune des pages comporte des metadonnées personnalisées afin d’améliorer le référencement sur les moteurs de recherches.
