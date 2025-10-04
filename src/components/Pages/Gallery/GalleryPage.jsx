import Card from "@/components/ui/Card/Card";
import Carousel from "@/components/ui/Carousel/Carousel";

export default async function GalleryPage({ data = {} }) {
  const photos = data?.photos || [];

  return (
    <Card>
      <h1>{data.titreprincipal}</h1>
      <section className="section">
        <Carousel images={photos} />
      </section>
    </Card>
  );
}
