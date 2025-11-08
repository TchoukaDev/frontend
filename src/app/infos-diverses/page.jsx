import ArticlesPage from "@/components/Pages/Articles/ArticlesPage";

export default function InfosPage({ searchParams }) {
  return (
    <ArticlesPage
      searchParams={searchParams}
      slug="infos-diverses"
      title="Informations diverses"
    />
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
    title: `Informations diverses${page > 1 ? ` - Page ${page}` : ""}`,
    description: `Retrouvez ici des informations diverses portant sur différents sujets (santé, loisirs, évènements...), et importantes à savoir ${limit} articles par page.`,

    // ✅ Mots-clés
    keywords: [
      "loisirs",
      "informations",
      "marche aquatique",
      "longe-côte",
      "Biscarrosse",
      "événements",
      "Randonneurs des Sables",
    ],

    // ✅ OpenGraph optimisé
    openGraph: {
      title: `informations diverses${page > 1 ? ` - Page ${page}` : ""} - Randonneurs des Sables du Born`,
      description:
        "Retrouvez ici des informations diverses portant sur différents sujets (santé, loisirs, évènements...)",
      url: `/infos-diverses${page > 1 ? `?page=${page}` : ""}`,
      type: "website",
      // L'image sera héritée du layout.js
    },

    // ✅ Twitter Card
    twitter: {
      card: "summary_large_image",
      title: `Informations diverses - Randonneurs des Sables`,
      description: "Toute les informations que vous avez besoin de savoir",
    },

    // ✅ Robots optimisés pour pagination
    robots: {
      index: page === 1, // ✅ Indexer SEULEMENT page 1
      follow: true, // ✅ Suivre tous les liens
      noarchive: page > 1, // ❌ Ne pas archiver pages 2+
    },

    // ✅ URL canonique
    alternates: {
      canonical: `/infos-diverses${page > 1 ? `?page=${page}` : ""}${
        limit !== 5 ? `${page > 1 ? "&" : "?"}limit=${limit}` : ""
      }`,
    },
  };
}
