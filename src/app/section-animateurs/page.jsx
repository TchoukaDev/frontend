import ArticlesPage from "@/components/Pages/Articles/ArticlesPage";

export default async function AnimSectionPage({ searchParams }) {
  return (
    <ArticlesPage
      slug="section-animateurs"
      title="Section animateurs"
      searchParams={searchParams}
    />
  );
}

export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  const limit = Number(resolvedSearchParams.limit) || 5;

  return {
    title: `Section réservée aux animateurs${page > 1 ? ` - Page ${page}` : ""}`,
    description: `Retrouvez toutes les informations exclusivement réservées aux animateurs du club ${limit} articles par page.`,
    robots: "index, follow",
    openGraph: {
      title: `Section animateurs - Page ${page}`,
      description: "Actualités et informations réservées au animateurs du club",
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
