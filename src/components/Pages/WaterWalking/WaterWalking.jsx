import AnimatedTitle from "@/components/ui/AnimatedTitle/AnimatedTitle";
import Card from "@/components/ui/Card/Card";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default async function WaterWalkingPage({ data }) {
  console.log(data);
  const sections = data.sections;

  return (
    <Card>
      <h2>{data.titreprincipal}</h2>
      <div className="space-y-10">
        {sections.map(
          (
            section,
            index, // ← Ajouter index
          ) => (
            <section
              key={section.id}
              className="not-last:border-b-2 border-dotted border-blue3 px-8 pt-0 pb-10"
            >
              <AnimatedTitle odd={index % 2 === 0}>
                {" "}
                {/* ← Passer odd */}
                {section.titre}
              </AnimatedTitle>
              <div className="prose prose-p:mb-2 max-w-none">
                <BlocksRenderer content={section.contenu} />
              </div>
            </section>
          ),
        )}
      </div>
    </Card>
  );
}
