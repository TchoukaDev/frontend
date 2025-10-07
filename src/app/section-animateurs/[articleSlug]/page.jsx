import Article from "@/components/Pages/Articles/Article/Article";
import { fetchStrapi } from "@/utils/fetchStrapi";

export default function AnimSection({ params }) {
  return (
    <Article
      params={params}
      slug="section-animateurs"
      title="Informations aux animateurs"
    />
  );
}

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const data = await fetchStrapi(
      `section-animateurs?pagination[limit]=50&sort=updatedAt:desc`,
      300,
    );

    const articles = data?.data || [];

    // ✅ RETOURNEZ le résultat du map avec la bonne syntaxe
    return articles.map((article) => ({
      articleSlug: article.slug,
    }));
  } catch (e) {
    console.error(e.message);
    return []; // ✅ Bon fallback
  }
}

/*
 * @param {Object} context - Contexte Next.js
 * @param {Object} context.params - Paramètres de route dynamique
 */
export async function generateMetadata({ params }) {
  const { articleSlug } = await params;

  // 2️⃣ RÉCUPÉRATION DES DONNÉES DE L'ARTICLE
  const response = await fetchStrapi(`section-animateurs/${articleSlug}`, 300);

  // Extraction des données avec fallback pour éviter les erreurs
  const data = response?.data || {};

  // 3️⃣ RETOUR DES MÉTADONNÉES
  return {
    title: data.titre || "Article",

    // 📝 DESCRIPTION
    description:
      data.contenu?.[0]?.children?.[0]?.text?.substring(0, 160) || "",

    // 🖼️ OPEN GRAPH (Prévisualisations sur réseaux sociaux)
    openGraph: {
      // Titre pour Facebook, Twitter, LinkedIn, etc.
      title: data.titre,

      // 🖼️ IMAGES DE PRÉVISUALISATION
      images: data.images?.[0] ? [`${data?.images[0]?.url}`] : [],
    },
  };
}
