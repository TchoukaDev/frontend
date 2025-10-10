import ArticlesPage from "@/components/Pages/Articles/ArticlesPage";

export default function InfosPage({ searchParams }) {
  return (
    <ArticlesPage searchParams={searchParams} slug="infos" title="Actualités" />
  );
}

/**
 * Génération des métadonnées pour optimisation SEO
 * Exécutée côté serveur pour chaque page
 */
export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  const limit = Number(resolvedSearchParams.limit) || 5;

  return {
    title: `Informations du club${page > 1 ? ` - Page ${page}` : ""}`,
    description: `Retrouvez toutes les actualités et informations du club. ${limit} articles par page.`,
    robots: "index, follow",
    openGraph: {
      title: `Informations du club - Page ${page}`,
      description: "Actualités et informations du club",
      type: "website",
    },
    // URL canonique pour éviter le duplicate content
    alternates: {
      canonical: `/infos${page > 1 ? `?page=${page}` : ""}${
        limit !== 5 ? `${page > 1 ? "&" : "?"}limit=${limit}` : ""
      }`,
    },
  };
}
