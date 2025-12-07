"use client";
import HeadingSkeleton from "./HeadingSkeleton";

export default function SkeletonArticlesPage() {
  console.log("💀 Skeleton render");
  return (
    <div className="custom-gradient-light w-[95%] md:w-[80%] lg:w-[70%] py-5 md:py-15 px-1 md:px-16 min-h-[80vh] mx-auto my-10 rounded-2xl border-2 border-blue3 shadow-lg shadow-blue3/30">
      <div className="flex flex-col justify-items-center items-center">
        <HeadingSkeleton />

        <div className="animate-pulse bg-gray-200 shadow rounded self-end w-[200px] h-8 mb-6"></div>

        <div className="animate-pulse bg-gray-100 w-full min-h-[80vh] shadow-lg rounded-xl p-10 space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-sand/50 border border-blue1 w-full h-36 shadow rounded-xl"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
