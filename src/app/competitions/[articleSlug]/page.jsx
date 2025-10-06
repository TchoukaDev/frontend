import Article from "@/components/Pages/Articles/Article/Article";
import { fetchStrapi } from "@/utils/fetchStrapi";

export default function Competition({ params }) {
  return (
    <Article
      params={params}
      slug="competitions"
      title="Informations Compétitions"
    />
  );
}

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const data = await fetchStrapi(
      `competitions?pagination[limit]=50&sort=updatedAt:desc`,
      300,
    );
    return (data?.data || []).map((article) => ({
      articleSlug: article.slug,
    }));
  } catch (e) {
    console.error("Erreur generateStaticParams competitions:", e.message);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { articleSlug } = await params;
  const response = await fetchStrapi(`competitions/${articleSlug}`, 300);
  const data = response?.data || {};

  return {
    title: data.titre || "Compétition",
    description:
      data.contenu?.[0]?.children?.[0]?.text?.substring(0, 160) || "",
    openGraph: {
      title: data.titre || "Compétition",
      images: data.images?.[0] ? [data.images[0].url] : [],
    },
    alternates: {
      canonical: `/competitions/${articleSlug}`,
    },
  };
}
