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
    description: `Espace réservé aux animateurs des Randonneurs des Sables du Born. Informations, documents et communications internes. ${limit} articles par page.`,

    // ⚠️ CRITIQUE : Robots pour contenu PRIVÉ
    robots: {
      index: false, // ❌ NE PAS indexer (contenu privé !)
      follow: false, // ❌ NE PAS suivre les liens
      noarchive: true, // ❌ NE PAS archiver
    },

    // OpenGraph minimal
    openGraph: {
      title: `Section Animateurs${page > 1 ? ` - Page ${page}` : ""}`,
      description: "Espace réservé aux animateurs - Accès restreint",
      url: `/section-animateurs${page > 1 ? `?page=${page}` : ""}`,
      type: "website",
      // L'image sera héritée du layout.js
    },

    // URL canonique
    alternates: {
      canonical: `/section-animateurs${page > 1 ? `?page=${page}` : ""}${
        limit !== 5 ? `${page > 1 ? "&" : "?"}limit=${limit}` : ""
      }`,
    },
  };
}
