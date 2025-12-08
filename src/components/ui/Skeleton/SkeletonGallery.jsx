import SkeletonHeading from "./SkeletonHeading";
import SkeletonSection from "./SkeletonSection";

export default function SkeletonGallery() {
  return (
    <div className="skeletonCard">
      <SkeletonHeading />
      <SkeletonSection height="min-h-[80vh] space-y-20">
        <div className="animate-pulse bg-sand/50 shadow-blue1 border border-blue3 shadow-xl w-[95%] rounded-2xl h-96"></div>
        <div className="animate-pulse h-7 w-[250px] bg-gray-300 rounded shadow mx-auto"></div>
        <div className="flex gap-5 md:gap-20 flex-wrap items-center justify-center">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse size-25 bg-gray-300 shadow rounded"
            ></div>
          ))}
        </div>
      </SkeletonSection>
    </div>
  );
}
