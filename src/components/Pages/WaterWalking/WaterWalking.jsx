import AnimatedTitle from "@/components/ui/AnimatedTitle/AnimatedTitle";
import Card from "@/components/ui/Card/Card";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default async function WaterWalkingPage({ data }) {
  const sections = data.sections;

  return (
    <Card>
      <h1>{data.titreprincipal}</h1>
      <div className="space-y-10">
        {sections.map(
          (
            section,
            index, // ← Ajouter index
          ) => (
            <section key={section.id} className="section">
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
