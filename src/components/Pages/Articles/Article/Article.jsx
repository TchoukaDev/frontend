import Card from "@/components/ui/Card/Card";
import BlocksRendererWrapper from "@/components/Utils/BlockRendererWrapper/BlocksRendererWrapper";
import { fetchStrapi } from "@/utils/fetchStrapi";
import { ChevronLeft, FileInput } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { notFound } from "next/navigation";

export default async function Article({ params, endpoint }) {
  const { slug } = await params;

  const response = await fetchStrapi(`${endpoint}/${slug}`, 300);
  const data = response?.data;

  if (!data) {
    notFound();
  }

  const documents = data.documents || [];
  const images = data.images || [];

  // Dans votre composant

  return (
    <Card>
      <section className="section">
        {" "}
        <div className="flex justify-between">
          <Link
            className=" flex text-sm items-center w-fit text-blue3 hover:underline hover:text-blue-800"
            href={`/${endpoint}`}
          >
            <ChevronLeft size={20} />
            Retour
          </Link>{" "}
          <div className="text-sm prose max-w-none text-gray-500">
            {`Mise à jour le ${formatDate(data.updatedAt)}` ||
              `Publié le ${formatDate(data.createdAt)}`}
          </div>
        </div>
        <h1 className="text-2xl text-blue3 border-0 font-main italic justify-start max-w-full shadow-none my-5 underline">
          {data?.titre}
        </h1>{" "}
        <div className="prose max-w-none my-5">
          <BlocksRendererWrapper content={data?.contenu || []} />
        </div>
        {documents?.map((doc) => (
          <div
            key={doc?.id}
            className=" flex justify-center gap-5 w-full prose my-7 max-w-none"
          >
            <a
              className="flex flex-col items-center w-fit justify-center"
              href={`${process.env.STRAPI_API_URL}${doc?.url}`}
              target="_blank"
            >
              <FileInput />
              {doc?.name}
            </a>
          </div>
        ))}
        {images?.map((image) => (
          <div
            key={image?.id}
            className="flex my-7 flex-col md:flex-row justify-center items-center gap-5"
          >
            <Image
              src={`${process.env.STRAPI_API_URL}${image?.url}`}
              alt={image?.alternativeText}
              width={300}
              height={200}
              className="rounded shadow-md"
            />
          </div>
        ))}
      </section>
    </Card>
  );
}

export const revalidate = 300;

export async function generateStaticParams(endpoint) {
  try {
    const data = await fetchStrapi(
      `${endpoint}?pagination[limit]=50&sort=updatedAt:desc`,
      300,
    );

    // ✅ Vérifiez la structure - probablement data.data, pas data.infos
    const articles = data?.data || [];

    // ✅ RETOURNEZ le résultat du map avec la bonne syntaxe
    return articles.map((article) => ({
      slug: article.slug,
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
export async function generateMetadata({ params, endpoint }) {
  // 1️⃣ RÉCUPÉRATION DU SLUG
  // params = { slug: "mon-article" } pour l'URL /infos/mon-article
  const { slug } = await params;

  // 2️⃣ RÉCUPÉRATION DES DONNÉES DE L'ARTICLE
  const response = await fetchStrapi(`${endpoint}/${slug}`, 300);

  // Extraction des données avec fallback pour éviter les erreurs
  const data = response?.data || {};

  // 3️⃣ RETOUR DES MÉTADONNÉES
  return {
    // 📌 TITRE DE LA PAGE
    // Apparaît dans l'onglet du navigateur et dans les résultats Google
    title: data.titre || "Article",

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
      images: data.images?.[0]
        ? [`${process.env.STRAPI_API_URL}${data.images[0].url}`]
        : [],

      // ⬇️ Décortiquons :

      // data.images?.[0]              → Première image si elle existe
      // Si elle existe :
      //   [`${process.env.STRAPI_API_URL}${data.images[0].url}`]
      //   → Tableau contenant l'URL complète
      //   Exemple : ["https://strapi.com/uploads/photo_123.jpg"]
      // Sinon :
      //   []  → Tableau vide (pas d'image)
    },
  };
}
