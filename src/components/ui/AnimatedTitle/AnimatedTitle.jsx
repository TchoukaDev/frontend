"use client";
import { TextScroll } from "@/utils/TextScroll";
import { useEffect, useId } from "react";

export default function AnimatedTitle({ children, as: Heading = "h2", odd }) {
  const uniqueId = useId();
  const containerId = `container-${uniqueId}`;
  const textId = `text-${uniqueId}`;

  useEffect(() => {
    const direction = odd ? "left" : "right";
    // Plus simple : passe directement les IDs
    new TextScroll(containerId, textId, direction);
  }, [containerId, textId, odd]);

  return (
    <div className="scroll-container" id={containerId}>
      <div id={textId}>
        <Heading>{children}</Heading>
      </div>
    </div>
  );
}
