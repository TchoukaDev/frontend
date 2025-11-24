import Article from "@/components/Pages/Articles/Article/Article";
import { fetchStrapi } from "@/utils/fetchStrapi";
import { notFound } from "next/navigation";

export default async function Actuality({ params }) {
  const { articleSlug } = await params;

  // ✅ Si c'est le placeholder, retourner 404
  if (articleSlug === "placeholder") {
    notFound();
  }

  return (
    <Article
      params={params}
      slug="infos-diverses"
      title="Informations diverses"
    />
  );
}

// ✅ ISR pur maintenant !
export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const data = await fetchStrapi(
      `infos-diverses?pagination[limit]=50&sort=updatedAt:desc`,
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
    console.error("Erreur generateStaticParams infos-diverses:", e.message);
    return [{ articleSlug: "placeholder" }];
  }
}

export async function generateMetadata({ params }) {
  try {
    const { articleSlug } = await params;

    // ✅ Métadonnées par défaut pour le placeholder
    if (articleSlug === "placeholder") {
      return {
        title: "Information | Randonneurs des Sables",
        description: "Découvrez les dernières informations",
        robots: { index: false, follow: false }, // ✅ Ne pas indexer le placeholder
      };
    }

    const response = await fetchStrapi(`infos-diverses/${articleSlug}`, 300);
    const data = response?.data || {};

    if (!data?.id) {
      return {
        title: "Information | Randonneurs des Sables",
        description: "Découvrez les dernières informations",
      };
    }

    const description =
      data.contenu?.[0]?.children?.[0]?.text?.substring(0, 160) ||
      "Découvrez les dernières informations";

    const ogImage = data.images?.[0]?.url;

    return {
      title: data.titre || "Information",
      description: description,
      keywords: [
        data.titre,
        "information",
        "actualité",
        "marche aquatique",
        "longe-côte",
        "Randonneurs des Sables",
      ].filter(Boolean),
      openGraph: {
        title: data.titre || "Information",
        description: description,
        url: `/infos-diverses/${articleSlug}`,
        type: "article",
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
        article: {
          publishedTime: data.publishedAt,
          modifiedTime: data.updatedAt,
          section: "Informations diverses",
          tags: ["marche aquatique", "longe-côte", "information"],
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
        canonical: `/infos-diverses/${articleSlug}`,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error("Erreur generateMetadata:", error.message);
    return {
      title: "Information",
      description: "Découvrez les dernières informations",
    };
  }
}
