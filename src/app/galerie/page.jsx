// app/galerie/page.tsx
import GalleryPage from "@/components/Pages/Gallery/GalleryPage";
import SkeletonArticlesPage from "@/components/ui/Skeleton/SkeletonArticlesPage";
import SkeletonSingleArticlePage from "@/components/ui/Skeleton/SkeletonSingleArticlePage";
import { fetchStrapi } from "@/utils/fetchStrapi";

export const metadata = {
  title: "Galerie Photos",
  description: "Photos de nos sorties et événements",
};

const initialLimit = 10;

export default async function Gallery() {
  const initialData = await fetchStrapi(
    `galerie?limit=${initialLimit}&dossier=all`,
    300,
  );
  return <SkeletonSingleArticlePage />;
  // return <GalleryPage initialData={initialData} initialLimit={initialLimit} />;
}
