import Card from "@/components/ui/Card/Card";
import PaginationControls from "@/components/Utils/Pagination/PaginationControls";
import ItemsPerPageSelector from "@/components/Utils/Pagination/ItemsPerPageSelector";
import { fetchStrapi } from "@/utils/fetchStrapi";
import ArticlesPageClient from "./ArticlesPageClient";

/**
 * Composant Server principal pour la page des informations
 *
 * @param {Object} props
 * @param {Object} props.searchParams - Paramètres URL (page, limit)
 */
export default async function ArticlesPage({ searchParams, slug, title }) {
  const resolvedSearchParams = await searchParams;
  // Extraction et validation des paramètres URL
  const page = Number(resolvedSearchParams?.page) || 1;
  const limit = Number(resolvedSearchParams?.limit) || 5;

  // Validation des paramètres pour éviter les erreurs (Sécurité!!)
  const validatedPage = Math.max(1, page);
  const validatedLimit = [1, 5, 10].includes(limit) ? limit : 5;

  /**
   * Fonction utilitaire pour récupérer les informations depuis l'API Strapi
   * Exécutée côté serveur au moment du rendu
   *
   * @param {number} page - Numéro de page (défaut: 1)
   * @param {number} limit - Nombre d'éléments par page (défaut: 5)
   * @returns {Promise<Object>} Données de l'API avec pagination
   */
  async function getArticles(page = 1, limit = 5) {
    try {
      // Construction de l'URL de l'API avec paramètres de pagination
      const data = await fetchStrapi(
        `${slug}?page=${page}&limit=${limit}`,
        300,
      );
      return data || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error);
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

  // Récupération des données côté serveur (SEO friendly)
  const { data: articles = {}, meta = {} } = await getArticles(
    validatedPage,
    validatedLimit,
  );

  // Extraction des métadonnées de pagination
  const { page: currentPage, pageCount: totalPages } = meta?.pagination;

  return (
    <Card>
      {/* Titre */}
      <h1>{title}</h1>

      <div className="flex justify-end items-center mb-6">
        {/* Sélecteur interactif - Client Component */}
        <ItemsPerPageSelector
          currentLimit={validatedLimit}
          currentPage={currentPage}
        />
      </div>

      <ArticlesPageClient
        initialData={articles}
        validatedLimit={validatedLimit}
        validatedPage={validatedPage}
        totalPages={totalPages}
        slug={slug}
      />

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
