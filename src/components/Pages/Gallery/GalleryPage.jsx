"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card/Card";
import Carousel from "@/components/ui/Carousel/Carousel";
import { useGetGallery } from "@/hooks/useGetGallery";
import { useGetFolders } from "@/hooks/useGetFolders";

export default function GalleryPage({ initialData = {}, initialLimit = 10 }) {
  const loadStep = initialLimit;
  const [limit, setLimit] = useState(initialLimit);
  const [selectedFolder, setSelectedFolder] = useState("all");

  // Récupération des photos
  const { data, isFetching, prefetchNext } = useGetGallery(
    limit === initialLimit && selectedFolder === "all" ? initialData : null,
    limit,
    selectedFolder,
    loadStep,
  );

  // Récupération des dossiers (séparé)
  const { data: dossiersData } = useGetFolders();

  const photos = data?.data || [];
  const totalInFolder = data?.meta?.pagination?.total || 0;

  // Données dossiers depuis le hook dédié
  const folders = dossiersData?.data || [];
  const rootCount = dossiersData?.meta?.root || 0;
  const totalPhotos = dossiersData?.meta?.total || 0;

  const hasMore = photos.length < totalInFolder;
  const canShowLess = limit > initialLimit;

  useEffect(() => {
    if (hasMore && !isFetching && prefetchNext) {
      prefetchNext();
    }
  }, [hasMore, isFetching, prefetchNext]);

  const handleLoadMore = () => {
    setLimit((prev) => prev + loadStep);
  };

  const handleShowLess = () => {
    setLimit((prev) => Math.max(initialLimit, prev - loadStep));
  };

  const handleChangeFolder = (folderSlug) => {
    setLimit(initialLimit);
    setSelectedFolder(folderSlug);
  };

  return (
    <Card>
      <h1>
        {data?.titreprincipal || initialData?.titreprincipal || "Galerie"}
      </h1>

      <section className="section">
        <Carousel
          key={`${selectedFolder}-${limit}`}
          onChangeFolder={handleChangeFolder}
          folders={folders}
          rootCount={rootCount}
          images={photos}
          selectedFolder={selectedFolder}
          isFetching={isFetching}
          totalCount={totalPhotos}
          gallery
        />

        <div className="mt-8 flex flex-col items-center gap-4">
          {photos.length > 0 && (hasMore || canShowLess) && (
            <div className="flex gap-4">
              {canShowLess && (
                <button
                  onClick={handleShowLess}
                  className="btn bg-blue-700 hover:bg-blue-700/80"
                >
                  Voir moins
                </button>
              )}

              {hasMore && (
                <button
                  onClick={handleLoadMore}
                  disabled={isFetching}
                  className="btn"
                >
                  {isFetching ? "Chargement…" : "Voir plus"}
                </button>
              )}
            </div>
          )}

          {photos.length > 0 && (
            <span className="text-sm text-gray-600">
              {photos.length} / {totalInFolder} photos
            </span>
          )}
        </div>
      </section>
    </Card>
  );
}
