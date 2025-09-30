import AnimatedTitle from "@/components/ui/AnimatedTitle/AnimatedTitle";
import Card from "@/components/ui/Card/Card";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

export default async function ClubPage({ data = {} }) {
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
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
            {animateurs?.map((anim) => (
              <div
                key={anim.id}
                className="flex flex-col justify-between items-center gap-2"
              >
                <Image
                  width={80}
                  height={80}
                  src={`${process.env.STRAPI_API}${anim.file.url}`}
                  unoptimized
                  className="object-cover"
                  alt={anim.file.alternativeText}
                />
                <div className="text-center prose grow">
                  {anim.file.caption}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Card>
  );
}
