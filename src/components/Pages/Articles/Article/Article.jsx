import { fetchStrapi } from "@/utils/fetchStrapi";
import { notFound } from "next/navigation";
import ArticleClient from "./ArticleClient";
import Card from "@/components/ui/Card/Card";

export default async function Article({ params, slug, title }) {
  const { articleSlug } = await params;
  // Récupération de l'article
  const response = await fetchStrapi(`${slug}/${articleSlug}`, 300);
  const data = response?.data || {};

  if (!data) {
    notFound();
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
