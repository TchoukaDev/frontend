import Article from "@/components/Pages/Articles/Article/Article";
import { fetchStrapi } from "@/utils/fetchStrapi";

export default async function Actuality({ params }) {
  const resolvedParams = await params;
  return (
    <Article
      params={resolvedParams}
      slug="infos-diverses"
      title="Informations diverses"
    />
  );
}

export const revalidate = 300;
export const dynamicParams = true;
export async function generateStaticParams() {
  const data = await fetchStrapi("infos-diverses?pagination[limit]=50");
  const articles = data?.data || [];

  return articles.map((article) => ({
    articleSlug: article.slug,
    metadata: {
      titre: article.titre,
      description:
        article.contenu?.[0]?.children?.[0]?.text?.substring(0, 160) || "",
      images: article.images || [],
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
    },
  }));
}

export async function generateMetadata({ params }) {
  const { metadata } = params;
  if (!metadata) return { title: "Information", description: "..." };

  return {
    title: metadata.titre,
    description: metadata.description,
    openGraph: {
      title: metadata.titre,
      description: metadata.description,
      images: metadata.images,
    },
    article: {
      publishedTime: metadata.publishedAt,
      modifiedTime: metadata.updatedAt,
    },
  };
}
