import { fetchStrapi } from "@/utils/fetchStrapi";
import { notFound } from "next/navigation";

import Card from "@/components/ui/Card/Card";
import { slugToApiCollection } from "@/libs/slugToApi";

// ✅ Charger ArticleClient uniquement côté client
const ArticleClient = dynamic(() => import("./ArticleClient"), {
  ssr: false, // ✅ Désactive le SSR pour ce composant
  loading: () => (
    <div className="p-8 text-center text-gray-500">
      Chargement de l'article...
    </div>
  ),
});

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
      <ArticleClient slug={slug} articleSlug={articleSlug} initialData={data} />
    </Card>
  );
}
