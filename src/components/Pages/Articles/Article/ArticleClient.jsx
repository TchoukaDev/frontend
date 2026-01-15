"use client";

import { useGetArticle } from "@/hooks/useGetArticle";
import { ChevronLeft, FileInput } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import BlocksRendererWrapper from "@/components/Utils/BlockRendererWrapper/BlocksRendererWrapper";

export default function ArticleClient({
  slug,
  articleSlug,
  initialData = null,
}) {
  const { data = [] } = useGetArticle(slug, articleSlug, initialData);
  const documents = data?.documents || [];
  const images = data?.images || [];

  return (
    <section className="section">
      {" "}
      <div className="flex justify-between">
        <Link
          className=" flex text-sm items-center w-fit text-blue3 hover:underline hover:text-blue-800"
          href={`/${slug}`}
        >
          <ChevronLeft size={20} />
          Retour
        </Link>{" "}
        <div className="text-sm prose max-w-none text-gray-500">
          {`Mise à jour le ${formatDate(data?.updatedAt)}` ||
            `Publié le ${formatDate(data?.createdAt)}`}
        </div>
      </div>
      <h2 className="text-lg md:text-2xl text-blue3 border-0 font-main italic text-center max-w-full shadow-none my-10 underline whitespace-normal">
        {data?.titre}
      </h2>{" "}
      <BlocksRendererWrapper content={data?.contenu || []} />
      {documents.length > 0 &&
        documents?.map((doc) => (
          <div
            key={doc?.id}
            className=" flex justify-center gap-5 w-full prose my-7 max-w-none"
          >
            <a
              className="flex flex-col items-center w-fit justify-center"
              href={`${doc?.url}`}
              target="_blank"
            >
              <FileInput />
              {doc?.name}
            </a>
          </div>
        ))}
      <div className="flex my-7 flex-col md:flex-row justify-center flex-wrap items-center gap-5 md:gap-10 mt-10">
        {images.length > 0 &&
          images?.map(
            (image) =>
              image?.url && (
                <a
                  href={image.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block size-40 md:size-60 overflow-hidden"
                >
                  <Image
                    key={image.id}
                    fill
                    src={image.url}
                    alt={image.alternativeText || "Image"}
                    className="rounded shadow-md cursor-pointer object-cover object-center hover:scale-105 transition-all duration-300"
                  />
                </a>
              ),
          )}
      </div>
    </section>
  );
}
