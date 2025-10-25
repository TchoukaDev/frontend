import ArticlesPage from "@/components/Pages/Articles/ArticlesPage";

export default async function ShopPage({ searchParams }) {
  return (
    <ArticlesPage
      slug="boutique"
      title="Boutique du club"
      searchParams={searchParams}
    />
  );
}

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const data = await fetchStrapi(
      `boutiques?pagination[limit]=50&sort=updatedAt:desc`,
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

export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  const limit = Number(resolvedSearchParams.limit) || 5;

  return {
    title: `Boutique${page > 1 ? ` - Page ${page}` : ""}`,
    description: `Boutique du club. Regardez les différentes annonces pour voir les articles disponibles à l'achat ${limit} annonces par page.`,

    // ⚠️ CRITIQUE : Robots pour contenu PRIVÉ
    robots: {
      index: false, // ❌ NE PAS indexer (contenu réservé membres)
      follow: false, // ❌ NE PAS suivre les liens
      noarchive: true, // ❌ NE PAS archiver
    },

    // OpenGraph minimal
    openGraph: {
      title: `Boutique${page > 1 ? ` - Page ${page}` : ""}`,
      description: "Boutique du club. ",
      url: `/boutique${page > 1 ? `?page=${page}` : ""}`,
      type: "website",
      // L'image sera héritée du layout.js
    },

    // URL canonique
    alternates: {
      canonical: `/boutique${page > 1 ? `?page=${page}` : ""}${
        limit !== 5 ? `${page > 1 ? "&" : "?"}limit=${limit}` : ""
      }`,
    },
  };
}
