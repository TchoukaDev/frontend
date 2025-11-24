import Article from "@/components/Pages/Articles/Article/Article";
import { fetchStrapi } from "@/utils/fetchStrapi";
import { notFound } from "next/navigation";

// ✅ AJOUT : async
export default async function Actuality({ params }) {
  const { articleSlug } = await params;

  // ✅ Si c'est le placeholder, retourner 404
  if (articleSlug === "placeholder") {
    notFound();
  }

  return (
    <Article
      params={params}
      slug="actualites-club"
      title="Actualités du club"
    />
  );
}

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const data = await fetchStrapi(
      `infos?pagination[limit]=50&sort=updatedAt:desc`,
      300,
    );

    const articles = data?.data || [];

    // ✅ Si vide, retourner le placeholder
    if (articles.length === 0) {
      return [{ articleSlug: "placeholder" }];
    }

    return articles.map((article) => ({
      articleSlug: article.slug,
    }));
  } catch (e) {
    console.error("Erreur generateStaticParams actualites du club:", e.message);
    // ✅ CORRECTION : retourner le placeholder au lieu de []
    return [{ articleSlug: "placeholder" }];
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

  // ✅ AJOUT : Gérer le placeholder
  if (articleSlug === "placeholder") {
    return {
      title: "Actualités du club | Randonneurs des Sables",
      description:
        "Découvrez les dernières actualités des Randonneurs des Sables du Born",
      robots: { index: false, follow: false }, // ✅ Ne pas indexer le placeholder
    };
  }

  // 2️⃣ RÉCUPÉRATION DES DONNÉES DE L'ARTICLE
  const response = await fetchStrapi(`infos/${articleSlug}`, 300);
  const data = response?.data || {};

  // ✅ AJOUT : Si pas de données, retourner métadonnées par défaut
  if (!data?.id) {
    return {
      title: "Actualité | Randonneurs des Sables",
      description:
        "Découvrez les dernières actualités des Randonneurs des Sables du Born",
    };
  }

  // 3️⃣ EXTRACTION DE LA DESCRIPTION
  const description =
    data.contenu?.[0]?.children?.[0]?.text?.substring(0, 160) ||
    "Découvrez les dernières actualités des Randonneurs des Sables du Born";

  // 4️⃣ GESTION DE L'IMAGE : spécifique ou héritage
  const ogImage = data.images?.[0]?.url ? data.images[0].url : undefined;

  // 5️⃣ RETOUR DES MÉTADONNÉES COMPLÈTES
  return {
    // 📌 TITRE DE LA PAGE
    title: data.titre || "Actualité",

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
      title: data.titre || "Actualité",
      description: description,
      url: `/actualites-club/${articleSlug}`,
      type: "article",

      // ✅ Image conditionnelle
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: data.titre || "Actualité",
          },
        ],
      }),

      // ✅ Métadonnées article
      article: {
        publishedTime: data.publishedAt,
        modifiedTime: data.updatedAt,
        section: "Actualités du club",
        tags: ["marche aquatique", "longe-côte", "actualité"],
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
      canonical: `/actualites-club/${articleSlug}`,
    },

    // 🤖 ROBOTS
    robots: {
      index: true,
      follow: true,
    },
  };
}
