import { fetchStrapi } from "@/utils/fetchStrapi";
import { notFound } from "next/navigation";
import { slugToApiCollection } from "@/libs/slugToApi";

export default async function Article({ params, slug, title }) {
  const { articleSlug } = await params;
  const apiCollection = slugToApiCollection(slug);

  const response = await fetchStrapi(`${apiCollection}/${articleSlug}`, 300);
  const data = response?.data || {};

  if (!data?.id) {
    notFound();
  }

  // ✅ TEST : Composant ultra-minimal
  return (
    <div>
      <h1>{title}</h1>
      <h2>{data?.titre}</h2>
      <p>Test minimal</p>
    </div>
  );
}
