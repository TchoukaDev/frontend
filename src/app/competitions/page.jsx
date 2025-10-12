import ArticlesPage from "@/components/Pages/Articles/ArticlesPage";

export default async function CompetitionsPage({ searchParams }) {
  return (
    <ArticlesPage
      slug="competitions"
      title="Informations compétitions"
      searchParams={searchParams}
    />
  );
}
export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  const limit = Number(resolvedSearchParams.limit) || 5;

  return {
    title: `Informations compétitions${page > 1 ? ` - Page ${page}` : ""}`,
    description: `Retrouvez toutes les actualités et informations concernant les différentes compétitions. ${limit} articles par page.`,
    robots: "index, follow",
    openGraph: {
      title: `Informations compétitions - Page ${page}`,
      description: "Informations concernant les différentes compétitions",
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
