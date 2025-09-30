import Card from "@/components/ui/Card/Card";
import BlocksRendererWrapper from "@/components/Utils/BlockRendererWrapper/BlocksRendererWrapper";
import { fetchStrapi } from "@/utils/fetchStrapi";
import { ChevronLeft, FileInput } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";

export default async function Info({ params }) {
  const { slug } = await params;
  const response = await fetchStrapi(`infos/${slug}`, 300);
  const data = response?.data || {};
  const documents = data.documents || [];
  const images = data.images || [];

  // Dans votre composant

  return (
    <Card>
      <section className="section">
        {" "}
        <div className="flex justify-between">
          <Link
            className=" flex text-sm items-center w-fit text-blue3 hover:underline hover:text-blue-800"
            href="/infos"
          >
            <ChevronLeft size={20} />
            Retour
          </Link>{" "}
          <div className="text-sm prose max-w-none text-gray-500">
            {`Mise à jour le ${formatDate(data.updatedAt)}` ||
              `Publié le ${formatDate(data.createdAt)}`}
          </div>
        </div>
        <h1 className="text-2xl text-blue3 border-0 font-main italic justify-start max-w-full shadow-none my-5 underline">
          {data.titre}
        </h1>{" "}
        <div className="prose max-w-none my-5">
          <BlocksRendererWrapper content={data?.contenu || []} />
        </div>
        {documents.map((doc) => (
          <div
            key={doc.id}
            className=" flex justify-center gap-5 w-full prose my-7 max-w-none"
          >
            <a
              className="flex flex-col items-center w-fit justify-center"
              href={`${process.env.STRAPI_API}${doc.url}`}
              target="_blank"
            >
              <FileInput />
              {doc.name}
            </a>
          </div>
        ))}
        {images.map((image) => (
          <div
            key={image.id}
            className="flex my-7 flex-col md:flex-row justify-center items-center gap-5"
          >
            <Image
              src={`${process.env.STRAPI_API}${image.url}`}
              alt={image.alternativeText}
              width={300}
              height={200}
              unoptimized
            />
          </div>
        ))}
      </section>
    </Card>
  );
}

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const data = await fetchStrapi("infos?pagination[limit]=100", 300);

    // ✅ Vérifiez la structure - probablement data.data, pas data.infos
    const infos = data?.data || [];

    // ✅ RETOURNEZ le résultat du map avec la bonne syntaxe
    return infos.map((info) => ({
      slug: info.slug,
    }));
  } catch (e) {
    console.error(e.message);
    return []; // ✅ Bon fallback
  }
}
