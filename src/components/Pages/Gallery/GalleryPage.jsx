import Card from "@/components/ui/Card/Card";
import Carousel from "@/components/ui/Carousel/Carousel";

export default async function GalleryPage({ data }) {
  const photos = data.photos;
  const strapiUrl = process.env.STRAPI_API;

  return (
    <Card>
      <h1>{data.titreprincipal}</h1>
      <section className="section">
        <Carousel strapiUrl={strapiUrl} images={photos} />
      </section>
    </Card>
  );
}
