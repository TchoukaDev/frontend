// app/galerie/page.tsx
import GalleryPage from "@/components/Pages/Gallery/GalleryPage";
import { fetchStrapi } from "@/utils/fetchStrapi";

export const metadata = {
  title: "Galerie Photos",
  description: "Photos de nos sorties et événements",
};

const initialLimit = 3;

export default async function Gallery() {
  const initialData = await fetchStrapi(
    `galerie?limit=${initialLimit}&offset=0`,
    300,
  );
  return <GalleryPage initialData={initialData} initialLimit={initialLimit} />;
}
