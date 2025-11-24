import Article from "@/components/Pages/Articles/Article/Article";
import { fetchStrapi } from "@/utils/fetchStrapi";

export default async function Actuality({ params }) {
  return (
    <Article
      params={params}
      slug="infos-diverses"
      title="Informations diverses"
    />
  );
}

export const revalidate = 300;
export const dynamicParams = true;
// ✅ Ajoutez ceci pour autoriser les fetches dynamiques dans generateMetadata
export const fetchCache = "force-no-store";

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

export async function generateMetadata({ params }) {
  try {
    const { articleSlug } = await params;

    // ✅ Fetch avec cache 'no-store' pour éviter l'erreur
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/infos-diverses/${articleSlug}?populate=*`,
      {
        cache: "no-store", // ✅ Important !
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) {
      return {
        title: "Information",
        description:
          "Découvrez les dernières informations des Randonneurs des Sables du Born",
      };
    }

    const result = await response.json();
    const data = result?.data || {};

    if (!data?.id) {
      return {
        title: "Information",
        description:
          "Découvrez les dernières informations des Randonneurs des Sables du Born",
      };
    }

    const description =
      data.attributes?.contenu?.[0]?.children?.[0]?.text?.substring(0, 160) ||
      "Découvrez les dernières informations des Randonneurs des Sables du Born";

    const ogImage = data.attributes?.images?.data?.[0]?.attributes?.url
      ? data.attributes.images.data[0].attributes.url
      : undefined;

    return {
      title: data.attributes?.titre || "Information",
      description: description,
      keywords: [
        data.attributes?.titre,
        "information",
        "actualité",
        "marche aquatique",
        "longe-côte",
        "Randonneurs des Sables",
      ].filter(Boolean),
      openGraph: {
        title: data.attributes?.titre || "Information",
        description: description,
        url: `/infos-diverses/${articleSlug}`,
        type: "article",
        ...(ogImage && {
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: data.attributes?.titre || "Information",
            },
          ],
        }),
        article: {
          publishedTime: data.attributes?.publishedAt,
          modifiedTime: data.attributes?.updatedAt,
          section: "Informations diverses",
          tags: ["marche aquatique", "longe-côte", "information"],
        },
      },
      ...(ogImage && {
        twitter: {
          card: "summary_large_image",
          title: data.attributes?.titre,
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
    console.error("Erreur generateMetadata infos-diverses:", error.message);
    return {
      title: "Information",
      description:
        "Découvrez les dernières informations des Randonneurs des Sables du Born",
    };
  }
}
