"use client";

import { useGetArticlesPage } from "@/hooks/useGetArticlePages";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import BlocksRendererWrapper from "@/components/Utils/BlockRendererWrapper/BlocksRendererWrapper";

export default function ArticlesPageClient({
  initialData = null,
  validatedLimit,
  validatedPage,
  totalPages,
  slug,
}) {
  // Cache useQuery
  const { data: articles = [] } = useGetArticlesPage(
    slug,
    validatedLimit,
    validatedPage,
    initialData,
  );

  // Calculer la haute de la section en fonction du nombre d'articles par pages et du nombre de page (UX)
  const calculateSectionSize = (limit, total) => {
    const sectionSizes = { 1: "240", 5: "927", 10: "1690" };
    // S'il n'y a qu'une page, la section s'adapte au contenu, sinon elle prend la hauteur du nombre maximum d'articles
    const sectionSize = total <= 1 ? "240" : sectionSizes[limit];
    return sectionSize;
  };

  const sectionSize = calculateSectionSize(validatedLimit, totalPages);
  return (
    <section style={{ minHeight: `${sectionSize}px` }} className={`section`}>
      {articles.length > 0 ? (
        // Liste des articles
        <div className="space-y-4">
          {articles?.map((article) => (
            <Link
              key={article.id}
              href={`/${slug}/${article.slug}`}
              className="block"
            >
              <article className="group border-2  border-blue1 rounded-xl px-3 py-3 md:px-6 md:py-6 hover:border-blue3 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-1 overflow-hidden">
                    {/* En-tête avec titre et date */}
                    <div className="flex flex-row-reverse justify-between items-start mb-3">
                      {" "}
                      <time
                        dateTime={article.updatedAt}
                        className="text-sm text-gray-500 bg-blue-50 px-3 py-1 md:ml-4 rounded-full whitespace-nowrap self-start"
                      >
                        {formatDate(article.updatedAt)}
                      </time>
                      <h2 className="text-blue3 font-normal group-hover:text-blue2 transition-all line-clamp-2 whitespace-normal leading-tight">
                        {article.titre}
                      </h2>
                    </div>

                    {/* Extrait de l'article */}
                    {article.contenu && (
                      <div className="text-gray-700 leading-relaxed mb-4 line-clamp-1 prose max-w-none">
                        <BlocksRendererWrapper
                          noLinks
                          content={article.contenu}
                        />
                      </div>
                    )}

                    {/* Call to action et métadonnées */}
                    <div className="flex justify-between items-center">
                      <div className="text-blue3 font-medium text-sm group-hover:text-blue2 transition-colors flex items-center gap-2">
                        Lire
                        <span className="group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        // État vide - également rendu côté serveur
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">
            Aucune information n'est disponible pour le moment.
          </p>
        </div>
      )}
    </section>
  );
}
