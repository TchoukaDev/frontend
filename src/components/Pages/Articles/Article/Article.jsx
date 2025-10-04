// app/.../page.js
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
  const data = response?.data || {};

  if (!data || !data.titre) {
    notFound();
  }

  const documents = data.documents || [];
  const images = data.images || [];

  // ✅ Vérifier que STRAPI_API_URL existe
  const strapiUrl = process.env.STRAPI_API_URL;

  if (!strapiUrl) {
    console.error("❌ STRAPI_API_URL n'est pas défini !");
  }

  return (
    <Card>
      <section className="section">
        <div className="flex justify-between">
          <Link
            className="flex text-sm items-center w-fit text-blue3 hover:underline hover:text-blue-800"
            href={`/${endpoint}`}
          >
            <ChevronLeft size={20} />
            Retour
          </Link>
          <div className="text-sm prose max-w-none text-gray-500">
            {data.updatedAt
              ? `Mise à jour le ${formatDate(data.updatedAt)}`
              : data.createdAt
              ? `Publié le ${formatDate(data.createdAt)}`
              : ""}
          </div>
        </div>

        <h1 className="text-2xl text-blue3 border-0 font-main italic justify-start max-w-full shadow-none my-5 underline">
          {data.titre}
        </h1>

        <div className="prose max-w-none my-5">
          <BlocksRendererWrapper content={data.contenu || []} />
        </div>

        {/* ✅ Documents sécurisés */}
        {documents.length > 0 &&
          strapiUrl &&
          documents.map((doc) => {
            if (!doc?.url) return null; // ✅ Skip si pas d'URL

            return (
              <div
                key={doc.id}
                className="flex justify-center gap-5 w-full prose my-7 max-w-none"
              >
                <a
                  className="flex flex-col items-center w-fit justify-center"
                  href={`${strapiUrl}${doc.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileInput />
                  {doc.name || "Document"}
                </a>
              </div>
            );
          })}

        {/* ✅ Images sécurisées */}
        {images.length > 0 &&
          strapiUrl &&
          images.map((image) => {
            if (!image?.url) return null; // ✅ Skip si pas d'URL

            return (
              <div
                key={image.id}
                className="flex my-7 flex-col md:flex-row justify-center items-center gap-5"
              >
                <Image
                  src={`${strapiUrl}${image.url}`}
                  alt={image.alternativeText || image.name || "Image"}
                  width={300}
                  height={200}
                  className="rounded shadow-md"
                />
              </div>
            );
          })}
      </section>
    </Card>
  );
}

export const revalidate = 300;

// ✅ generateStaticParams sécurisé
export async function generateStaticParams({ endpoint }) {
  try {
    const data = await fetchStrapi(
      `${endpoint}?pagination[limit]=50&sort=updatedAt:desc`,
      300,
    );
    const articles = data?.data || [];

    return articles
      .filter((article) => article?.slug) // ✅ Filtrer ceux sans slug
      .map((article) => ({
        slug: article.slug,
      }));
  } catch (error) {
    console.error("Erreur generateStaticParams:", error.message);
    return [];
  }
}

// ✅ generateMetadata CORRIGÉ
export async function generateMetadata({ params, endpoint }) {
  const { slug } = await params;
  const response = await fetchStrapi(`${endpoint}/${slug}`, 300);
  const data = response?.data || {};

  // ✅ Extraction sécurisée de l'image
  const firstImage = data.images?.[0];
  const strapiUrl = process.env.STRAPI_API_URL;
  const imageUrl =
    firstImage?.url && strapiUrl ? `${strapiUrl}${firstImage.url}` : null;

  // ✅ Extraction sécurisée de la description
  const description =
    data.contenu?.[0]?.children?.[0]?.text?.substring(0, 160) ||
    data.titre ||
    "";

  return {
    title: data.titre || "Article",
    description,
    openGraph: {
      title: data.titre || "Article",
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}
