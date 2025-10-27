"use client";
import Card from "@/components/ui/Card/Card";
import { useGetPage } from "@/hooks/useGetPage";
import Image from "next/image";

export default function SponsorsPage({ initialData, slug }) {
  const { data = [] } = useGetPage(slug, initialData);
  const { partenaire } = data;
  return (
    <Card>
      <h1>{data?.titreprincipal}</h1>
      <section className="section">
        <div className="grid  grid-cols-1 xl:grid-cols-2 gap-x-5 gap-y-15">
          {partenaire?.map((p) => (
            <div
              key={p.id}
              className="flex flex-col justify-center items-center gap-5"
            >
              {p?.image && (
                <Image
                  src={p.image?.url}
                  alt={p.image?.alternativeText}
                  width={300}
                  height={0}
                  className="h-auto"
                />
              )}
              <p className="text-center">
                {p.lien ? (
                  <a href={p.lien} className="link" target="_blank">
                    {p.nom}
                  </a>
                ) : (
                  p.nom
                )}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Card>
  );
}
