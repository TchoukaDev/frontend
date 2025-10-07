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
