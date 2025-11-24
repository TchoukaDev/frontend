import { fetchStrapi } from "@/utils/fetchStrapi";
import { notFound } from "next/navigation";
import ArticleClient from "./ArticleClient";
import Card from "@/components/ui/Card/Card";
import { slugToApiCollection } from "@/libs/slugToApi";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";

export default async function Article({ params, slug, title }) {
  const { articleSlug } = await params;
  const apiCollection = slugToApiCollection(slug);
  // Récupération de l'article
  const response = await fetchStrapi(`${apiCollection}/${articleSlug}`, 300);
  const data = response?.data || {};
  if (!data?.id) {
    notFound();
  }

  const documents = data.documents || [];
  const images = data.images || [];

  // Dans votre composant

  return (
    <Card>
      <h1>{title}</h1>
      {/* ✅ Wrapper avec Suspense */}
      <Suspense
        fallback={
          <div className="p-8 text-center text-gray-500">
            Chargement de l'article...
            <ClipLoader />
          </div>
        }
      >
        <ArticleClient
          slug={slug}
          articleSlug={articleSlug}
          initialData={data}
        />
      </Suspense>
    </Card>
  );
}
