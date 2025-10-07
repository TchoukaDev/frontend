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
