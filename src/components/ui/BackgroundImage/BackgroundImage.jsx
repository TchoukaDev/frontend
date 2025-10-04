import { fetchStrapi } from "@/utils/fetchStrapi";
import Image from "next/image";

export default async function BackgroundImage() {
  const { image = {} } = await fetchStrapi("accueil/optimized");

  return (
    <div className="inset-0 fixed -z-50 ">
      <Image
        src={`${process.env.STRAPI_API_URL}${image?.url}` || "/images/fond.jpg"}
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
