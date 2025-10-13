import Article from "@/components/Pages/Articles/Article/Article";
import { fetchStrapi } from "@/utils/fetchStrapi";

export default function AnimSection({ params }) {
  return (
    <Article
      params={params}
      slug="section-animateurs"
      title="Informations aux animateurs"
    />
  );
}

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const data = await fetchStrapi(
      `section-animateurs?pagination[limit]=50&sort=updatedAt:desc`,
      300,
    );

    const articles = data?.data || [];

    return articles.map((article) => ({
      articleSlug: article.slug,
    }));
  } catch (e) {
    console.error("Erreur generateStaticParams section-animateurs:", e.message);
    return [];
  }
}

/**
 * Génération des métadonnées pour les articles de la section animateurs
 * @param {Object} context - Contexte Next.js
 * @param {Object} context.params - Paramètres de route dynamique
 */
export async function generateMetadata({ params }) {
  const { articleSlug } = await params;

  // Récupération des données de l'article
  const response = await fetchStrapi(`section-animateurs/${articleSlug}`, 300);
  const data = response?.data || {};

  // ✅ Extraction description optimisée
  const description =
    data.contenu?.[0]?.children?.[0]?.text?.substring(0, 160) ||
    "Information réservée aux animateurs des Randonneurs des Sables du Born";

  // ✅ Gestion image : spécifique ou héritage
  const ogImage = data.images?.[0]?.url ? data.images[0].url : undefined; // undefined = héritage du layout.js

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
