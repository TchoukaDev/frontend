import { fetchStrapi } from "@/utils/fetchStrapi";
import Carousel from "../Carousel";
import { Suspense } from "react";
import { ClipLoader } from "react-spinners";

export default async function MiniCarousel() {
  const data = await fetchStrapi("galerie?limit=5", 300);
  const photos = data?.data;

  return (
    <Suspense
      fallback={
        <div className="aspect-video w-[200px] md:w-[300px] h-[100px] md:h-[150px] flex items-center justify-center rounded-xl bg-sand ">
          <ClipLoader size={20}></ClipLoader>
        </div>
      }
    >
      <div className="aspect-video w-[200px] md:w-[300px] ">
        <Carousel images={photos} />
      </div>
    </Suspense>
  );
}
