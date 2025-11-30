"use client";

import AnimatedTitle from "@/components/ui/AnimatedTitle/AnimatedTitle";
import Card from "@/components/ui/Card/Card";
import { useGetPage } from "@/hooks/useGetPage";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

export default function ClubPage({ initialData = {}, slug }) {
  const { data = [] } = useGetPage(slug, initialData);

  const animateurs = data.animateurs || [];
  return (
    <Card>
      {/* Titre de la page */}
      <h1>{data.titreprincipal}</h1>

      <div className="space-y-10">
        <section className="section">
          {/* Titre défilant */}
          <AnimatedTitle as="h2" odd>
            {data.titre1}
          </AnimatedTitle>

          {/* Contenu */}
          <div className="prose max-w-none">
            <BlocksRenderer content={data.contenu || []} />
          </div>
        </section>

        <section className="section">
          {/* Titre défilant */}
          <AnimatedTitle as="h2">{data.titre2}</AnimatedTitle>

          {/* Photos */}
          {animateurs.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 auto-rows-fr">
              {animateurs?.length === 0 ? (
                <p className="text-center text-gray-600">
                  Cette section est actuellement vide
                </p>
              ) : (
                animateurs?.map((anim) => (
                  <div
                    key={anim.id}
                    className="flex flex-col items-center gap-3 p-2"
                  >
                    {/* Conteneur image avec ratio fixe */}
                    <div className="relative w-20 h-20 shrink-0">
                      <Image
                        fill
                        src={anim?.file?.formats?.thumbnail?.url}
                        className="object-cover rounded"
                        alt={anim.file?.alternativeText}
                        sizes="80px"
                      />
                    </div>

                    {/* Texte avec hauteur flexible mais limitée */}
                    <p className="text-center text-sm leading-tight ">
                      {anim.file?.caption}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </div>
    </Card>
  );
}
