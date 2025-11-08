import Article from "@/components/Pages/Articles/Article/Article";
import { fetchStrapi } from "@/utils/fetchStrapi";

export default function Listing({ params }) {
  return <Article params={params} slug="boutique" title="Boutique du club" />;
}

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const data = await fetchStrapi(
      `boutique?pagination[limit]=50&sort=updatedAt:desc`,
      300,
    );
    return (data?.data || []).map((article) => ({
      articleSlug: article.slug,
    }));
  } catch (e) {
    console.error("Erreur generateStaticParams boutique:", e.message);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { articleSlug } = await params;
  const response = await fetchStrapi(`boutique/${articleSlug}`, 300);
  const data = response?.data || {};

  // Extraction description
  const description =
    data.contenu?.[0]?.children?.[0]?.text?.substring(0, 160) ||
    "Informations sur cette compétition - Accès réservé aux membres";

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
