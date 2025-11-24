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

export async function generateStaticParams() {
  try {
    const data = await fetchStrapi(
      `infos-diverses?pagination[limit]=50&sort=updatedAt:desc`,
      300,
    );

    const articles = data?.data || [];

    // ✅ Si vide, retourner au moins une page fictive
    if (articles.length === 0) {
      return [{ articleSlug: "placeholder" }];
    }

    return articles.map((article) => ({
      articleSlug: article.slug,
    }));
  } catch (e) {
    console.error("Erreur generateStaticParams infos-diverses:", e.message);
    // ✅ Retourner une page fictive au lieu de []
    return [{ articleSlug: "placeholder" }];
  }
}

// ✅ SOLUTION : try/catch dans generateMetadata
export async function generateMetadata({ params }) {
  try {
    // 1️⃣ Récupérer le slug
    const { articleSlug } = await params;

    // 2️⃣ Fetch de l'article
    const response = await fetchStrapi(`infos-diverses/${articleSlug}`, 300);
    const data = response?.data || {};

    // 3️⃣ Si pas de données, retourner métadonnées par défaut
    if (!data?.id) {
      return {
        title: "Information | Randonneurs des Sables",
        description:
          "Découvrez les dernières informations des Randonneurs des Sables du Born",
      };
    }

    // 4️⃣ Extraction des données
    const description =
      data.contenu?.[0]?.children?.[0]?.text?.substring(0, 160) ||
      "Découvrez les dernières informations des Randonneurs des Sables du Born";

    const ogImage = data.images?.[0]?.url ? data.images[0].url : undefined;

    // 5️⃣ Retour des métadonnées complètes
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
    // ✅ EN CAS D'ERREUR : Retourner métadonnées par défaut
    console.error("Erreur generateMetadata infos-diverses:", error.message);
    return {
      title: "Information | Randonneurs des Sables",
      description:
        "Découvrez les dernières informations des Randonneurs des Sables du Born",
    };
  }
}
