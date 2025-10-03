import Image from "next/image";

export default function BackgroundImage() {
  return (
    <div className="inset-0 fixed -z-50 ">
      <Image
        src="/images/fond.jpg"
        className="object-cover"
        alt="Background Image"
        fill
        priority
        quality={80}
        sizes="100vw"
      />
    </div>
  );
}
