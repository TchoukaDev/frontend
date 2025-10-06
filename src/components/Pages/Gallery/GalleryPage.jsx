"use client";

import Card from "@/components/ui/Card/Card";
import Carousel from "@/components/ui/Carousel/Carousel";
import { useGetPage } from "@/hooks/useGetPage";

export default function GalleryPage({ initialData = {}, slug }) {
  const { data = [] } = useGetPage(slug, initialData);
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
