import Card from "@/components/ui/Card/Card";
import Carousel from "@/components/ui/Carousel/Carousel";
import { fetchStrapi } from "@/utils/fetchStrapi";

export default async function Gallery() {
  const data = (await fetchStrapi("galerie?populate=photos", 300)) || [];
  const photos = data.data.photos;

  const strapiUrl = process.env.STRAPI_API;

  return (
    <Card>
      <h2>{data.data.titreprincipal}</h2>
      <Carousel strapiUrl={strapiUrl} images={photos} />
    </Card>
  );
}
