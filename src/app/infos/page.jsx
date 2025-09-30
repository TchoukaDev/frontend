import Link from "next/link";
import Card from "@/components/ui/Card/Card";
import PaginationControls from "@/components/Utils/Pagination/PaginationControls";
import ItemsPerPageSelector from "@/components/Utils/Pagination/ItemsPerPageSelector";
import { fetchStrapi } from "@/utils/fetchStrapi";
import { formatDate } from "@/utils/formatDate";
import BlocksRendererWrapper from "@/components/Utils/BlockRendererWrapper/BlocksRendererWrapper";

/**
 * Fonction utilitaire pour récupérer les informations depuis l'API Strapi
 * Exécutée côté serveur au moment du rendu
 *
 * @param {number} page - Numéro de page (défaut: 1)
 * @param {number} limit - Nombre d'éléments par page (défaut: 5)
 * @returns {Promise<Object>} Données de l'API avec pagination
 */
async function getInfos(page = 1, limit = 5) {
  try {
    // Construction de l'URL de l'API avec paramètres de pagination
    const data = await fetchStrapi(`infos?page=${page}&limit=${limit}`, 300);
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des infos:", error);
    // Retourne une structure vide en cas d'erreur
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: limit,
          pageCount: 0,
          total: 0,
        },
      },
    };
  }
}
/**
 * Fonction utilitaire pour formater les dates en français
 *
 * @param {string} dateString - Date ISO à formater
 * @returns {string} Date formatée (ex: "15 septembre 2023")
 */

/**
 * Composant Server principal pour la page des informations
 *
 * @param {Object} props
 * @param {Object} props.searchParams - Paramètres URL (page, limit)
 */
export default async function InfosPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  // Extraction et validation des paramètres URL
  const page = Number(resolvedSearchParams?.page) || 1;
  const limit = Number(resolvedSearchParams?.limit) || 5;

  // Validation des paramètres pour éviter les erreurs (Sécurité!!)
  const validatedPage = Math.max(1, page);
  const validatedLimit = [1, 5, 10].includes(limit) ? limit : 5;

  // Récupération des données côté serveur (SEO friendly)
  const { data: infos, meta } = await getInfos(validatedPage, validatedLimit);

  // Extraction des métadonnées de pagination
  const { page: currentPage, pageCount: totalPages } = meta.pagination;

  // Calculer la haute de la section en fonction du nombre d'articles par pages et du nombre de page (UX)
  const calculateSectionSize = (limit, total) => {
    const sectionSizes = { 1: "240", 5: "927", 10: "1690" };
    // S'il n'y a qu'une page, la section s'adapte au contenu, sinon elle prend la hauteur du nombre maximum d'articles
    const sectionSize = total <= 1 ? "240" : sectionSizes[limit];
    return sectionSize;
  };

  const sectionSize = calculateSectionSize(validatedLimit, totalPages);

  return (
    <Card>
      {/* Titre */}
      <h1>Informations diverses</h1>

      <div className="flex justify-end items-center mb-6">
        {/* Sélecteur interactif - Client Component */}
        <ItemsPerPageSelector
          currentLimit={validatedLimit}
          currentPage={currentPage}
        />
      </div>

      {/* Contenu principal - rendu côté serveur pour SEO */}
      <section style={{ minHeight: `${sectionSize}px` }} className={`section`}>
        {infos.length > 0 ? (
          // Liste des articles
          <div className="space-y-4">
            {infos?.map((info) => (
              <Link
                key={info.id}
                href={`/infos/${info.slug}`}
                className="block"
              >
                <article className="group border-2  border-blue1 rounded-xl px-3 py-3 md:px-6 md:py-6 hover:border-blue3 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 overflow-hidden">
                      {/* En-tête avec titre et date */}
                      <div className="flex flex-col md:flex-row-reverse justify-between items-start mb-3">
                        {" "}
                        <time
                          dateTime={info.updatedAt}
                          className="text-sm text-gray-500 bg-blue-50 px-3 py-1 md:ml-4 rounded-full whitespace-nowrap self-end md:self-start"
                        >
                          {formatDate(info.updatedAt)}
                        </time>
                        <h2 className="text-blue3 font-normal group-hover:text-blue2 transition-all line-clamp-2 whitespace-normal leading-tight">
                          {info.titre}
                        </h2>
                      </div>

                      {/* Extrait de l'article */}
                      {info.contenu && (
                        <div className="text-gray-700 leading-relaxed mb-4 line-clamp-1 prose max-w-none">
                          <BlocksRendererWrapper
                            noLinks
                            content={info.contenu}
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
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-500 text-lg">
              Aucune information disponible pour le moment.
            </p>
          </div>
        )}
      </section>

      {/* Navigation de pagination - Client Component pour interactivité */}
      {totalPages > 1 && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={validatedLimit}
        />
      )}
    </Card>
  );
}

/**
 * Génération des métadonnées pour optimisation SEO
 * Exécutée côté serveur pour chaque page
 */
export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  const limit = Number(resolvedSearchParams.limit) || 5;

  return {
    title: `Informations du club${page > 1 ? ` - Page ${page}` : ""}`,
    description: `Retrouvez toutes les actualités et informations du club. ${limit} articles par page.`,
    robots: "index, follow",
    openGraph: {
      title: `Informations du club - Page ${page}`,
      description: "Actualités et informations du club",
      type: "website",
    },
    // URL canonique pour éviter le duplicate content
    alternates: {
      canonical: `/infos${page > 1 ? `?page=${page}` : ""}${
        limit !== 5 ? `${page > 1 ? "&" : "?"}limit=${limit}` : ""
      }`,
    },
  };
}
