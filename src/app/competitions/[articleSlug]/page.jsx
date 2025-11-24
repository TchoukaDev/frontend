import Article from "@/components/Pages/Articles/Article/Article";
import { fetchStrapi } from "@/utils/fetchStrapi";
import { notFound } from "next/navigation";

// ✅ AJOUT : async
export default async function Competition({ params }) {
  const { articleSlug } = await params;

  // ✅ Si c'est le placeholder, retourner 404
  if (articleSlug === "placeholder") {
    notFound();
  }

  return (
    <Article
      params={params}
      slug="competitions"
      title="Informations Compétitions"
    />
  );
}

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const data = await fetchStrapi(
      `competitions?pagination[limit]=50&sort=updatedAt:desc`,
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
    console.error("Erreur generateStaticParams competitions:", e.message);
    // ✅ CORRECTION : retourner le placeholder au lieu de []
    return [{ articleSlug: "placeholder" }];
  }
}

export async function generateMetadata({ params }) {
  const { articleSlug } = await params;

  // ✅ AJOUT : Gérer le placeholder
  if (articleSlug === "placeholder") {
    return {
      title: "Compétitions | Randonneurs des Sables",
      description:
        "Informations sur les compétitions des Randonneurs des Sables du Born",
      robots: {
        index: false,
        follow: false,
        noarchive: true,
      },
    };
  }

  const response = await fetchStrapi(`competitions/${articleSlug}`, 300);
  const data = response?.data || {};

  // ✅ AJOUT : Si pas de données, retourner métadonnées par défaut
  if (!data?.id) {
    return {
      title: "Compétition | Randonneurs des Sables",
      description:
        "Informations sur les compétitions des Randonneurs des Sables du Born",
      robots: {
        index: false,
        follow: false,
        noarchive: true,
      },
    };
  }

  // Extraction description
  const description =
    data.contenu?.[0]?.children?.[0]?.text?.substring(0, 160) ||
    "Informations sur les compétitions des Randonneurs des Sables du Born";

  // Gestion image
  const ogImage = data.images?.[0]?.url ? data.images[0].url : undefined;

  return {
    // ✅ CORRECTION : titre cohérent avec la page
    title: data.titre || "Compétition",
    description: description,

    // ✅ CORRECTION : mots-clés cohérents
    keywords: [
      data.titre,
      "compétition",
      "course",
      "marche aquatique",
      "longe-côte",
      "Randonneurs des Sables",
    ].filter(Boolean),

    openGraph: {
      title: data.titre || "Compétition",
      description: description,
      // ✅ CORRECTION : URL cohérente
      url: `/competitions/${articleSlug}`,
      type: "article",

      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: data.titre || "Compétition",
          },
        ],
      }),

      article: {
        publishedTime: data.publishedAt,
        modifiedTime: data.updatedAt,
        // ✅ CORRECTION : section cohérente
        section: "Compétitions",
        tags: ["compétition", "marche aquatique", "longe-côte"],
      },
    },

    ...(ogImage && {
      twitter: {
        card: "summary_large_image",
        title: data.titre,
        description: description,
        images: [ogImage],
      },
    }),

    alternates: {
      // ✅ CORRECTION : URL canonique cohérente
      canonical: `/competitions/${articleSlug}`,
    },

    // ⚠️ ROBOTS PRIVÉ
    robots: {
      index: false, // ❌ NE PAS indexer
      follow: false, // ❌ NE PAS suivre
      noarchive: true, // ❌ NE PAS archiver
    },
  };
}
