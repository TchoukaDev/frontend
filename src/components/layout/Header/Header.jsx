import Image from "next/image";

export default function Header() {
  return (
    <header className="header">
      {/* Logos */}
      <div className="w-[60px] md:w-[80px]">
        <Image
          width={80}
          height={80}
          src="/images/longe_cote.jpg"
          alt="logo longe cote"
          className="rounded-full object-cover"
        />
      </div>
      {/* Titre */}
      <div className="text-center font-title text-4xl md:text-5xl">
        ~~ Marche Aquatique ~~ <br />
        Les randonneurs des Sables du Born
      </div>{" "}
      <div className="w-[60px] md:w-[80px]">
        <Image
          width={80}
          height={80}
          src="/images/image_randonneur.png"
          alt="logo du club"
          className="rounded-full object-cover"
        />
      </div>
    </header>
  );
}
