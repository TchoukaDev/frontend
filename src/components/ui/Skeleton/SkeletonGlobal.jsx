import SkeletonHeading from "./SkeletonHeading";
import SkeletonSection from "./SkeletonSection";

export default function SkeletonGlobal() {
  return (
    <div className="skeletonCard">
      <SkeletonHeading />
      <SkeletonSection height="min-h-[80vh]">
        <div className="space-y-20">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className=" flex flex-col justify-center items-center gap-5"
            >
              <div className="animate-pulse bg-gray-300 shadow h-4 w-[250px] mb-10"></div>
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse bg-gray-300 shadow w-full h-4"
                ></div>
              ))}
            </div>
          ))}
        </div>
      </SkeletonSection>
    </div>
  );
}
