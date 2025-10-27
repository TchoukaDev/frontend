"use client";

import AnimatedTitle from "@/components/ui/AnimatedTitle/AnimatedTitle";
import Card from "@/components/ui/Card/Card";
import { useGetPage } from "@/hooks/useGetPage";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

export default function WaterWalkingPage({ initialData = {}, slug }) {
  const { data = [] } = useGetPage(slug, initialData);
  const sections = data?.sections || [];

  return (
    <Card>
      <h1>{data.titreprincipal}</h1>
      <div className="space-y-10">
        {sections.map(
          (
            section,
            index, // ← Ajouter index
          ) => (
            <section key={section?.id} className="section">
              <AnimatedTitle odd={index % 2 === 0}>
                {" "}
                {/* ← Passer odd */}
                {section?.titre}
              </AnimatedTitle>
              <div className="prose prose-p:mb-2 max-w-none">
                <BlocksRenderer content={section?.contenu} />
              </div>
              <div className="flex my-10 gap-10 flex-wrap justify-center">
                {section?.images?.map((image) => (
                  <div
                    key={image?.id}
                    className="flex flex-col items-center justify-center gap-3"
                  >
                    <Image
                      src={image?.url}
                      width={200}
                      height={0}
                      priority
                      alt={image.alternativeText}
                      className="w-[200px] h-auto"
                    />
                    <div>{image.caption}</div>
                  </div>
                ))}
              </div>
            </section>
          ),
        )}
      </div>
    </Card>
  );
}
