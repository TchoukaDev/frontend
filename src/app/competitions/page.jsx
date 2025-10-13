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
    description: `Informations sur les compétitions de marche aquatique et longe-côte réservées aux membres du club. ${limit} articles par page.`,

    // ⚠️ CRITIQUE : Robots pour contenu PRIVÉ
    robots: {
      index: false, // ❌ NE PAS indexer (contenu réservé membres)
      follow: false, // ❌ NE PAS suivre les liens
      noarchive: true, // ❌ NE PAS archiver
    },

    // OpenGraph minimal
    openGraph: {
      title: `Informations compétitions${page > 1 ? ` - Page ${page}` : ""} - Espace Membre`,
      description:
        "Informations sur les compétitions - Accès réservé aux membres",
      url: `/competitions${page > 1 ? `?page=${page}` : ""}`,
      type: "website",
      // L'image sera héritée du layout.js
    },

    // URL canonique
    alternates: {
      canonical: `/competitions${page > 1 ? `?page=${page}` : ""}${
        limit !== 5 ? `${page > 1 ? "&" : "?"}limit=${limit}` : ""
      }`,
    },
  };
}
