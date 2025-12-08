import SkeletonHeading from "./SkeletonHeading";
import SkeletonSection from "./SkeletonSection";

export default function SkeletonSingleArticlePage() {
  return (
    <div className="skeletonCard">
      <SkeletonHeading />
      <SkeletonSection height="min-h-[80vh]">
        <div className="w-full flex flex-col justify-center items-center gap-15">
          <div className="flex justify-between w-full">
            <div className="animate-pulse w-[100px] h-4 rounded bg-gray-300 shadow"></div>
            <div className="animate-pulse w-[150px] h-4 rounded bg-gray-300 shadow"></div>
          </div>
          <div className="h-8 w-[200px] mx-auto bg-blue2/50 shadow mb-15 rounded"></div>
          <div className="flex flex-col w-full justify-center items-center gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate pulse h-4 bg-gray-300 shadow w-80/100"
              ></div>
            ))}{" "}
          </div>{" "}
          <div className=" animate-pulse bg-gray-300 shadow size-72"></div>
        </div>
      </SkeletonSection>
    </div>
  );
}
