// app/articles/page.js
import Card from "@/components/ui/Card/Card";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import React from "react";

async function fetchArticles() {
  const res = await fetch(`${process.env.STRAPI_API}/api/articles/`, {
    next: { revalidate: 10 }, // équivalent de revalidate pour ISR
  });
  const data = await res.json();

  return data.data;
}

export default async function ArticlesPage() {
  const articles = await fetchArticles();

  return (
    <Card>
      <div>
        <h2>Articles</h2>
        {articles.map((article) => (
          <div key={article.id} className="mb-7">
            <h3>{article.title}</h3>
            <BlocksRenderer content={article.content} />
          </div>
        ))}
      </div>
    </Card>
  );
}
