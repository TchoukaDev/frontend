import { fetchStrapi } from "@/utils/fetchStrapi";
import Image from "next/image";

export default async function BackgroundImage() {
  const { image = {} } = await fetchStrapi("accueil/optimized");

  return (
    <div className=" h-lvh fixed w-full -z-50 ">
      <Image
        src={`${image?.url}` || "/images/fond.jpg"}
        className="object-cover"
        alt={`${image.alternativeText}` || "Background Image"}
        fill
        priority
        sizes="100vw"
      />
    </div>
  );
}
