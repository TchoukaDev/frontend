import Article from "@/components/Pages/Articles/Article/Article";
import { fetchStrapi } from "@/utils/fetchStrapi";

export default function Info({ params }) {
  return <Article params={params} slug="infos" title="Informations diverses" />;
}

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const data = await fetchStrapi(
      `infos?pagination[limit]=50&sort=updatedAt:desc`,
      300,
    );

    // ✅ Vérifiez la structure - probablement data.data, pas data.infos
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

// ✅ Metadata SEO dynamique
/**
 * generateMetadata - Fonction spéciale Next.js pour générer les balises <meta> du <head>
 *
 * ⚙️ QUAND S'EXÉCUTE-T-ELLE ?
 * - Au BUILD pour les pages pré-générées (avec generateStaticParams)
 * - À la PREMIÈRE visite pour les nouvelles pages (dynamicParams)
 * - Lors de la REVALIDATION (toutes les 300s)
 *
 * 🎯 POURQUOI ?
 * Pour que chaque article ait ses propres métadonnées SEO :
 * - Titre dans l'onglet du navigateur
 * - Description dans Google
 * - Image d'aperçu sur Facebook/Twitter/LinkedIn
 *
 * @param {Object} context - Contexte Next.js
 * @param {Object} context.params - Paramètres de route dynamique
 */
export async function generateMetadata({ params }) {
  // 1️⃣ RÉCUPÉRATION DU SLUG
  // params = { articleSlug: "mon-article" } pour l'URL /infos/mon-article
  const { articleSlug } = await params;

  // 2️⃣ RÉCUPÉRATION DES DONNÉES DE L'ARTICLE
  const response = await fetchStrapi(`infos/${articleSlug}`, 300);

  // Extraction des données avec fallback pour éviter les erreurs
  const data = response?.data || {};

  // 3️⃣ RETOUR DES MÉTADONNÉES
  return {
    // 📌 TITRE DE LA PAGE
    // Apparaît dans l'onglet du navigateur et dans les résultats Google
    title: data.titre || "Information",

    // 📝 DESCRIPTION
    // Apparaît sous le titre dans les résultats de recherche Google
    description:
      data.contenu?.[0]?.children?.[0]?.text?.substring(0, 160) || "",
    // ⬇️ Décortiquons cette ligne complexe :

    // data.contenu est un tableau de blocs (structure Strapi)
    // Exemple : [
    //   {
    //     type: 'paragraph',
    //     children: [
    //       { type: 'text', text: 'Ceci est le contenu de mon article...' }
    //     ]
    //   }
    // ]

    // data.contenu?.[0]           → Premier bloc (paragraphe)
    // .children?.[0]              → Premier enfant du paragraphe (texte)
    // .text                       → Le texte brut
    // .substring(0, 160)          → Les 160 premiers caractères (max Google)
    // || ""                       → Si tout ça échoue, chaîne vide

    // 🖼️ OPEN GRAPH (Prévisualisations sur réseaux sociaux)
    openGraph: {
      // Titre pour Facebook, Twitter, LinkedIn, etc.
      title: data.titre,

      // 🖼️ IMAGES DE PRÉVISUALISATION
      images: data.images?.[0] ? [`${data?.images[0]?.url}`] : [],

      // ⬇️ Décortiquons :

      // data.images?.[0]              → Première image si elle existe
      // Si elle existe :
      //   [`${data.images[0].url}`]
      //   → Tableau contenant l'URL complète
      //   Exemple : ["https://strapi.com/uploads/photo_123.jpg"]
      // Sinon :
      //   []  → Tableau vide (pas d'image)
    },
  };
}
