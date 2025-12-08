"use client";
import SkeletonHeading from "./SkeletonHeading";
import SkeletonSection from "./SkeletonSection";

export default function SkeletonArticlesPage() {
  return (
    <div className="skeletonCard">
      <div className="flex flex-col justify-items-center items-center">
        <SkeletonHeading />

        <div className="animate-pulse bg-gray-200 shadow rounded self-end w-[200px] h-8 mb-6"></div>

        <SkeletonSection height="min-h-[80vh]">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-sand/50 border border-blue1 w-full h-36 shadow rounded-xl"
            ></div>
          ))}
        </SkeletonSection>
      </div>
    </div>
  );
}
