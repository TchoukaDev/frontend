import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { FileText } from "lucide-react";
import Image from "next/image";

export default function Publication({ data }) {
  const articles = data?.article;

  return (
    <>
      {articles.map((article) => (
        <div key={article.id}>
          <div>{article.titre}</div>
          <BlocksRenderer content={article.contenu} />

          <div className="flex justify-center items-center">
            {article.image && (
              <Image
                src={`${process.env.STRAPI_API}${article.image.url}`}
                width={300}
                height={300}
                className="object-contain"
                alt={article.image.alternativeText}
              />
            )}
          </div>
          <div>
            {article?.document && (
              <a
                href={`${process.env.STRAPI_API}${article.document.url}`}
                target="_blank"
              >
                <FileText />
              </a>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
