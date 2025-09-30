"use client";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { useEffect, useRef } from "react";

// Wrapper pour ajouter la propriété target = _blank dans les liens externes du contenu
export default function BlocksRendererWrapper({ content, noLinks }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const links = contentRef.current.querySelectorAll('a[href^="http"]');
      links.forEach((link) => {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      });
    }
  }, [content]);

  if (noLinks) {
    return (
      <BlocksRenderer
        content={content}
        blocks={{
          link: ({ children }) => (
            <span className="text-blue-600 underline">{children}</span>
          ),
        }}
      />
    );
  }

  return (
    <div ref={contentRef} className="prose max-w-none">
      <BlocksRenderer content={content} />
    </div>
  );
}
