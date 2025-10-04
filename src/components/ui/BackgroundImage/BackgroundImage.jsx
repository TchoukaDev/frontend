import { fetchStrapi } from "@/utils/fetchStrapi";
import { getImageUrl } from "@/utils/getImageUrl";
import Image from "next/image";

export default async function BackgroundImage() {
  const { image = {} } = await fetchStrapi("accueil/optimized");

  return (
    <div className="inset-0 fixed -z-50 ">
      <Image
        src={`${getImageUrl(image)}` || "/images/fond.jpg"}
        className="object-cover"
        alt={`${image.alternativeText}` || "Background Image"}
        fill
        priority
        quality={80}
        sizes="100vw"
      />
    </div>
  );
}
