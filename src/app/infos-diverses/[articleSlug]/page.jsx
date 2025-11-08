import Article from "@/components/Pages/Articles/Article/Article";
import { fetchStrapi } from "@/utils/fetchStrapi";

export default function Actuality({ params }) {
  return (
    <Article
      params={params}
      slug="infos-diverses"
      title="Informations diverses"
    />
  );
}

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const data = await fetchStrapi(
      `infos-diverses?pagination[limit]=50&sort=updatedAt:desc`,
      300,
    );

    const articles = data?.data || [];

    return articles.map((article) => ({
      articleSlug: article.slug,
    }));
  } catch (e) {
    console.error("Erreur generateStaticParams infos-diverses:", e.message);
    return [];
  }
}

/**
 * generateMetadata - Génère les balises <meta> du <head> pour chaque article
 *
 * ⚙️ QUAND S'EXÉCUTE-T-ELLE ?
 * - Au BUILD pour les pages pré-générées (avec generateStaticParams)
 * - À la PREMIÈRE visite pour les nouvelles pages (dynamicParams)
 * - Lors de la REVALIDATION (toutes les 300s)
 *
 * 🎯 POURQUOI ?
 * Pour que chaque article ait ses propres métadonnées SEO optimisées
 */
export async function generateMetadata({ params }) {
  // 1️⃣ RÉCUPÉRATION DU SLUG
  const { articleSlug } = await params;

  // 2️⃣ RÉCUPÉRATION DES DONNÉES DE L'ARTICLE
  const response = await fetchStrapi(`infos-diverses/${articleSlug}`, 300);
  const data = response?.data || {};

  // 3️⃣ EXTRACTION DE LA DESCRIPTION
  const description =
    data.contenu?.[0]?.children?.[0]?.text?.substring(0, 160) ||
    "Découvrez les dernières informations des Randonneurs des Sables du Born";

  // 4️⃣ GESTION DE L'IMAGE : spécifique ou héritage
  const ogImage = data.images?.[0]?.url ? data.images[0].url : undefined; // ✅ undefined = héritage du layout.js

  // 5️⃣ RETOUR DES MÉTADONNÉES COMPLÈTES
  return {
    // 📌 TITRE DE LA PAGE
    title: data.titre || "Information",

    // 📝 DESCRIPTION
    description: description,

    // 🔑 MOTS-CLÉS DYNAMIQUES
    keywords: [
      data.titre,
      "information",
      "actualité",
      "marche aquatique",
      "longe-côte",
      "Randonneurs des Sables",
    ].filter(Boolean),

    // 🖼️ OPEN GRAPH (Réseaux sociaux)
    openGraph: {
      title: data.titre || "Information",
      description: description,
      url: `/infos-diverses/${articleSlug}`,
      type: "article", // ✅ "article" au lieu de "website"

      // ✅ Image conditionnelle
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: data.titre || "Information",
          },
        ],
      }),

      // ✅ Métadonnées article
      article: {
        publishedTime: data.publishedAt,
        modifiedTime: data.updatedAt,
        section: "Informations diverses",
        tags: ["marche aquatique", "longe-côte", "information"],
      },
    },

    // 🐦 TWITTER CARD (si image disponible)
    ...(ogImage && {
      twitter: {
        card: "summary_large_image",
        title: data.titre,
        description: description,
        images: [ogImage],
      },
    }),

    // 🔗 URL CANONIQUE
    alternates: {
      canonical: `/infos-diverses/${articleSlug}`,
    },

    // 🤖 ROBOTS
    robots: {
      index: true,
      follow: true,
    },
  };
}
