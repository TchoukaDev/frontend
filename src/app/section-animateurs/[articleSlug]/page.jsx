import Article from "@/components/Pages/Articles/Article/Article";
import { fetchStrapi } from "@/utils/fetchStrapi";
import { notFound } from "next/navigation";

// ✅ AJOUT : async
export default async function AnimSection({ params }) {
  const { articleSlug } = await params;

  // ✅ Si c'est le placeholder, retourner 404
  if (articleSlug === "placeholder") {
    notFound();
  }

  return (
    <Article
      params={params}
      slug="section-animateurs"
      title="Informations aux animateurs"
    />
  );
}

export const revalidate = 300;
// ✅ AJOUT : dynamicParams
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const data = await fetchStrapi(
      `section-animateurs?pagination[limit]=50&sort=updatedAt:desc`,
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
    console.error("Erreur generateStaticParams section-animateurs:", e.message);
    // ✅ CORRECTION : retourner le placeholder au lieu de []
    return [{ articleSlug: "placeholder" }];
  }
}

/**
 * Génération des métadonnées pour les articles de la section animateurs
 * @param {Object} context - Contexte Next.js
 * @param {Object} context.params - Paramètres de route dynamique
 */
export async function generateMetadata({ params }) {
  const { articleSlug } = await params;

  // ✅ AJOUT : Gérer le placeholder
  if (articleSlug === "placeholder") {
    return {
      title: "Section Animateurs | Randonneurs des Sables",
      description:
        "Information réservée aux animateurs des Randonneurs des Sables du Born",
      robots: {
        index: false,
        follow: false,
        noarchive: true,
      },
    };
  }

  // Récupération des données de l'article
  const response = await fetchStrapi(`section-animateurs/${articleSlug}`, 300);
  const data = response?.data || {};

  // ✅ AJOUT : Si pas de données, retourner métadonnées par défaut
  if (!data?.id) {
    return {
      title: "Article animateurs | Randonneurs des Sables",
      description:
        "Information réservée aux animateurs des Randonneurs des Sables du Born",
      robots: {
        index: false,
        follow: false,
        noarchive: true,
      },
    };
  }

  // ✅ Extraction description optimisée
  const description =
    data.contenu?.[0]?.children?.[0]?.text?.substring(0, 160) ||
    "Information réservée aux animateurs des Randonneurs des Sables du Born";

  // ✅ Gestion image : spécifique ou héritage
  const ogImage = data.images?.[0]?.url ? data.images[0].url : undefined;

  return {
    // 📌 TITRE
    title: data.titre || "Article animateurs",

    // 📝 DESCRIPTION
    description: description,

    // 🔑 MOTS-CLÉS
    keywords: [
      data.titre,
      "animateurs",
      "section animateurs",
      "marche aquatique",
      "Randonneurs des Sables",
    ].filter(Boolean),

    // 🖼️ OPEN GRAPH
    openGraph: {
      title: data.titre || "Article animateurs",
      description: description,
      url: `/section-animateurs/${articleSlug}`,
      type: "article",

      // Image conditionnelle
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: data.titre || "Article animateurs",
          },
        ],
      }),

      // Métadonnées article
      article: {
        publishedTime: data.publishedAt,
        modifiedTime: data.updatedAt,
        section: "Section Animateurs",
        tags: ["animateurs", "marche aquatique"],
      },
    },

    // 🐦 TWITTER CARD (si image)
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
      canonical: `/section-animateurs/${articleSlug}`,
    },

    // 🤖 ROBOTS - ⚠️ IMPORTANT : Page privée !
    robots: {
      index: false, // ❌ NE PAS indexer (contenu réservé)
      follow: false, // ❌ NE PAS suivre les liens
      noarchive: true, // ❌ NE PAS archiver
    },
  };
}
