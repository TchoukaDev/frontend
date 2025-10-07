import Image from "next/image";
import LoginButton from "./LoginButton";

export default function Header() {
  return (
    <header className="header">
      {/* Logo caché en mobile, affiché en desktop*/}
      <div className="hidden md:block w-[60px] md:w-[100px] h-[60px] md:h-[100px] relative">
        <Image
          fill
          src="/images/longe_cote.jpg"
          alt="logo longe cote"
          className="rounded-full object-cover"
        />
      </div>
      {/* Titre */}
      <div className="text-center font-title leading-relaxed text-xl md:text-3xl lg:text-4xl">
        ~~ Marche Aquatique ~~ <br />
        Les randonneurs des Sables du Born
      </div>{" "}
      {/* Logos */}{" "}
      <div className="flex gap-5">
        {/* Logo caché en desktop, affiché en mobile */}
        <div className=" md:hidden w-[40px] h-[40px] relative">
          <Image
            fill
            src="/images/longe_cote.jpg"
            alt="logo longe cote"
            className="rounded-full object-cover"
          />
        </div>
        {/* Logo2 */}
        <div className="w-[40px] md:w-[100px] h-[40px] md:h-[100px] relative">
          <Image
            fill
            src="/images/image_randonneur.png"
            alt="logo du club"
            className="rounded-full object-cover"
          />
        </div>
      </div>
      {/* Menu connexion/déconnexion */}
      <div className="absolute right-2 md:right-6 bottom-2 lg:top-2">
        <LoginButton />
      </div>
    </header>
  );
}
