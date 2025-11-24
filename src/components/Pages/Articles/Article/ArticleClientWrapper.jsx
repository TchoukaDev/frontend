// components/Pages/Articles/Article/ArticleClientWrapper.jsx
"use client";

import { useEffect, useState } from "react";
import ArticleClient from "./ArticleClient";

export default function ArticleClientWrapper({
  slug,
  articleSlug,
  initialData,
}) {
  const [isMounted, setIsMounted] = useState(false);

  // ✅ S'assurer qu'on est côté client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ✅ Ne rien rendre côté serveur
  if (!isMounted) {
    return (
      <div className="p-8 text-center text-gray-500">
        Chargement de l'article...
      </div>
    );
  }

  // ✅ Rendre ArticleClient uniquement côté client
  return (
    <ArticleClient
      slug={slug}
      articleSlug={articleSlug}
      initialData={initialData}
    />
  );
}
