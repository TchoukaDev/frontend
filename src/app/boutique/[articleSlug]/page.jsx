import Article from "@/components/Pages/Articles/Article/Article";
import { fetchStrapi } from "@/utils/fetchStrapi";
import { notFound } from "next/navigation";

// ✅ AJOUT : async
export default async function Listing({ params }) {
  const { articleSlug } = await params;

  // ✅ Si c'est le placeholder, retourner 404
  if (articleSlug === "placeholder") {
    notFound();
  }

  return <Article params={params} slug="boutique" title="Boutique du club" />;
}

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const data = await fetchStrapi(
      `boutiques?pagination[limit]=50&sort=updatedAt:desc`,
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
    console.error("Erreur generateStaticParams boutique:", e.message);
    // ✅ CORRECTION : retourner le placeholder au lieu de []
    return [{ articleSlug: "placeholder" }];
  }
}

export async function generateMetadata({ params }) {
  const { articleSlug } = await params;

  // ✅ AJOUT : Gérer le placeholder
  if (articleSlug === "placeholder") {
    return {
      title: "Boutique du club | Randonneurs des Sables",
      description:
        "Boutique des Randonneurs des Sables du Born - Vêtements et accessoires",
      robots: {
        index: false,
        follow: false,
        noarchive: true,
      },
    };
  }

  const response = await fetchStrapi(`boutiques/${articleSlug}`, 300);
  const data = response?.data || {};

  // ✅ AJOUT : Si pas de données, retourner métadonnées par défaut
  if (!data?.id) {
    return {
      title: "Boutique | Randonneurs des Sables",
      description:
        "Boutique des Randonneurs des Sables du Born - Vêtements et accessoires",
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
    // ✅ CORRECTION : description cohérente avec la boutique
    "Boutique des Randonneurs des Sables du Born - Vêtements et accessoires";

  // Gestion image
  const ogImage = data.images?.[0]?.url ? data.images[0].url : undefined;

  return {
    title: data.titre || "Boutique",
    description: description,

    keywords: [
      data.titre,
      "boutique",
      "marche aquatique",
      "longe-côte",
      "vêtements",
      "accessoires",
      "Randonneurs des Sables",
    ].filter(Boolean),

    openGraph: {
      title: data.titre || "Boutique",
      description: description,
      url: `/boutique/${articleSlug}`,
      type: "article",

      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: data.titre || "Boutique",
          },
        ],
      }),

      article: {
        publishedTime: data.publishedAt,
        modifiedTime: data.updatedAt,
        section: "Boutique",
        tags: ["boutique", "marche aquatique", "longe-côte"],
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
      canonical: `/boutique/${articleSlug}`,
    },

    // ⚠️ ROBOTS PRIVÉ
    robots: {
      index: false, // ❌ NE PAS indexer
      follow: false, // ❌ NE PAS suivre
      noarchive: true, // ❌ NE PAS archiver
    },
  };
}
