import ArticlesPage from "@/components/Pages/Articles/ArticlesPage";

export default function InfosPage({ searchParams }) {
  return (
    <ArticlesPage
      searchParams={searchParams}
      slug="actualites-club"
      title="Actualités"
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
    title: `Actualités du club${page > 1 ? ` - Page ${page}` : ""}`,
    description: `Suivez l'actualité des Randonneurs des Sables du Born : événements, sorties, nouvelles du club et informations sur la marche aquatique à Biscarrosse. ${limit} articles par page.`,

    // ✅ Mots-clés
    keywords: [
      "actualités",
      "nouvelles",
      "marche aquatique",
      "longe-côte",
      "Biscarrosse",
      "événements",
      "Randonneurs des Sables",
    ],

    // ✅ OpenGraph optimisé
    openGraph: {
      title: `Actualités du club${page > 1 ? ` - Page ${page}` : ""} - Randonneurs des Sables du Born`,
      description:
        "Suivez toute l'actualité du club : événements, sorties et nouvelles de la marche aquatique",
      url: `/actualites-club${page > 1 ? `?page=${page}` : ""}`,
      type: "website",
      // L'image sera héritée du layout.js
    },

    // ✅ Twitter Card
    twitter: {
      card: "summary_large_image",
      title: `Actualités - Randonneurs des Sables`,
      description: "Toute l'actualité du club de marche aquatique",
    },

    // ✅ Robots optimisés pour pagination
    robots: {
      index: page === 1, // ✅ Indexer SEULEMENT page 1
      follow: true, // ✅ Suivre tous les liens
      noarchive: page > 1, // ❌ Ne pas archiver pages 2+
    },

    // ✅ URL canonique
    alternates: {
      canonical: `/actualites-club${page > 1 ? `?page=${page}` : ""}${
        limit !== 5 ? `${page > 1 ? "&" : "?"}limit=${limit}` : ""
      }`,
    },
  };
}
