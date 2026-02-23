import Image from "next/image";

export default function Header() {
  return (
    <header>
      {/* Titre - pleine largeur sur mobile (1ère ligne), auto sur desktop */}
      <div className="order-1 md:order-2 w-full md:w-auto text-center font-title leading-relaxed text-xl md:text-3xl lg:text-4xl">
        ~~ Marche Aquatique ~~ <br />
        Les randonneurs des Sables du Born
      </div>

      {/* Logo longe côte - après le titre sur mobile, avant sur desktop */}
      <div className="order-2 md:order-1 w-[40px] md:w-[80px] lg:w-[100px] h-[40px] md:h-[80px] lg:h-[100px] relative">
        <Image
          fill
          src="/images/longe_cote.jpg"
          alt="logo longe cote"
          className="rounded-full object-cover"
          sizes="(max-width: 767px) 40px,(max-width: 1023px) 80px, 100px"
          priority
        />
      </div>

      {/* Logo du club */}
      <div className="order-3 w-[40px] md:w-[80px] lg:w-[100px] h-[40px] md:h-[80px] lg:h-[100px] relative">
        <Image
          fill
          src="/images/image_randonneur.png"
          alt="logo du club"
          className="rounded-full object-cover"
          sizes="(max-width: 767px) 40px,(max-width: 1023px) 80px, 100px"
          priority
        />
      </div>
    </header>
  );
}
