import AnimatedTitle from "@/components/ui/AnimatedTitle/AnimatedTitle";
import Card from "@/components/ui/Card/Card";
import { fetchStrapi } from "@/utils/fetchStrapi";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

export default async function ClubPage({ data }) {
  const animateurs = data.animateurs;

  return (
    <Card>
      <h2>{data.titreprincipal}</h2>
      <div className="space-y-10">
        <section className="not-last:border-b-2 border-dotted border-blue3 px-8 pt-0 pb-10">
          <AnimatedTitle as="h3" odd>
            {data?.titre1}
          </AnimatedTitle>
          <div className="prose max-w-none prose-p:mb-2">
            <BlocksRenderer content={data?.contenu} />
          </div>
        </section>
        <section className="not-last:border-b-2 border-dotted border-blue3 px-8 pt-0 pb-10">
          <AnimatedTitle as="h3">{data?.titre2}</AnimatedTitle>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
            {animateurs.map((anim) => (
              <div
                key={anim.id}
                className="flex flex-col justify-around items-center gap-2"
              >
                <Image
                  width={80}
                  height={80}
                  src={`${process.env.STRAPI_API}${anim.file.url}`}
                  unoptimized
                  className="object-cover"
                  alt={anim.file.alternativeText}
                />
                <div className="text-center">{anim.file.caption}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Card>
  );
}
