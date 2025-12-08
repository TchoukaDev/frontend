import SkeletonSection from "./SkeletonSection";
import SkeletonHeading from "./SkeletonHeading";

export default function SkeletonStaticPage() {
  return (
    <div className="skeletonCard">
      <SkeletonHeading />

      {Array.from({ length: 2 }).map((_, i) => (
        <SkeletonSection key={i} height="min-h-[60vh] my-15">
          <div className="animate-pulse h-10 bg-blue3/80 mx-auto rounded-full w-full md:w-[400px] border-2 border-blue2 shadow-xl shadow-blue2 mb-15 mt-5"></div>
          <div className="flex flex-col w-full justify-center items-center gap-10">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col w-full items-center justify-center gap-3"
              >
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className=" animate-pulse h-4 w-8/10 bg-gray-300 shadow rounded "
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </SkeletonSection>
      ))}
    </div>
  );
}
