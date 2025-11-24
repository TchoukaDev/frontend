import { fetchStrapi } from "@/utils/fetchStrapi";
import { notFound } from "next/navigation";
import ArticleClient from "./ArticleClient";
import Card from "@/components/ui/Card/Card";
import { slugToApiCollection } from "@/libs/slugToApi";

export default async function Article({ params, slug, title }) {
  const { articleSlug } = await params;
  const apiCollection = slugToApiCollection(slug);
  // Récupération de l'article
  const response = await fetchStrapi(`${apiCollection}/${articleSlug}`, 300);
  const data = response?.data || {};
  if (!data?.id) {
    return (
      <div>
        <h1>Article non trouvé</h1>
        <p>L'article "{articleSlug}" n'existe pas.</p>
      </div>
    );
  }

  const documents = data.documents || [];
  const images = data.images || [];

  // Dans votre composant

  return (
    <Card>
      <h1>{title}</h1>
      <ArticleClient slug={slug} articleSlug={articleSlug} initialData={data} />
    </Card>
  );
}
