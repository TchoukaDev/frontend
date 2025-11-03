"use client";
import Card from "@/components/ui/Card/Card";
import BlocksRendererWrapper from "@/components/Utils/BlockRendererWrapper/BlocksRendererWrapper";
import { useGetPage } from "@/hooks/useGetPage";
import Image from "next/image";

export default function SponsorsPage({ initialData, slug }) {
  const { data = [] } = useGetPage(slug, initialData);
  const { partenaire } = data;
  return (
    <Card>
      <h1>{data?.titreprincipal}</h1>
      <section className="section">
        <div className="flex flex-col divide-y divide-blue2">
          {partenaire?.map((p) => (
            <div
              key={p.id}
              className="flex flex-col   gap-5 pt-10 pb-5 md:pt-15 md:pb-10"
            >
              <div className="flex flex-col items-center gap-5 overflow-auto ">
                {" "}
                {p?.image && (
                  <Image
                    src={p.image?.url}
                    alt={p.image?.alternativeText}
                    width={400}
                    height={0}
                    className="h-auto max-w-[200px] md:max-w-[300px] lg:max-w-none max-h-[400px]"
                  />
                )}{" "}
                <h2 className="text-blue3 text-lg md:text-2xl whitespace-normal text-center ">
                  {p.nom}
                </h2>
                <div>
                  <BlocksRendererWrapper content={p.description} />
                </div>
              </div>{" "}
            </div>
          ))}
        </div>
      </section>
    </Card>
  );
}
