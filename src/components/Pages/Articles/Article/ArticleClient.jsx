"use client";

import { useGetArticle } from "@/hooks/useGetArticle";
import { ChevronLeft, FileInput } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import BlocksRendererWrapper from "@/components/Utils/BlockRendererWrapper/BlocksRendererWrapper";

export default function ArticleClient({ slug, articleSlug, data }) {
  // const { data = [] } = useGetArticle(slug, articleSlug, initialData);
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
      {images.length > 0 &&
        images?.map((image) => (
          <div
            key={image?.id}
            className="flex my-7 flex-col md:flex-row justify-center items-center gap-5"
          >
            <Image
              src={image?.url}
              alt={image?.alternativeText}
              width={300}
              height={200}
              className="rounded shadow-md"
            />
          </div>
        ))}
    </section>
  );
}
