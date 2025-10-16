import { fetchStrapi } from "@/utils/fetchStrapi";
import BlocksRendererWrapper from "../Utils/BlockRendererWrapper/BlocksRendererWrapper";
import Link from "next/link";

export default async function LastNew() {
  const data = await fetchStrapi("infos?page=1&limit=1", 300);
  const article = data.data[0];

  // ✅ Trouver le premier paragraphe NON VIDE
  const firstParagraph = article.contenu?.find((block) => {
    if (block.type !== "paragraph") return false;
    // Vérifier qu'il contient du texte
    const hasText = block.children?.some(
      (child) => child.text && child.text.trim() !== "",
    );
    return hasText;
  });
  return (
    <div className=" w-[200px] md:w-[300px] bg-sand p-2 md:p-3 gap-2 flex flex-col justify-between rounded border border-blue2 overflow-hidden">
      <div>
        <h3 className="text-blue3 text-center font-semibold underline text-sm md:text-base line-clamp-1">
          {article.titre}
        </h3>
      </div>

      {/* ✅ Afficher seulement le premier paragraphe sur 2 lignes */}
      <div className="text-gray-700 flex-1 text-xs md:text-sm line-clamp-3 md:line-clamp-4  overflow-hidden">
        {firstParagraph ? (
          <BlocksRendererWrapper noLinks content={[firstParagraph]} />
        ) : (
          <p>Aucun contenu disponible</p>
        )}
      </div>

      <Link href={`/infos/${article.slug}`} className="self-end text-xs link">
        Voir l'article
      </Link>
    </div>
  );
}
