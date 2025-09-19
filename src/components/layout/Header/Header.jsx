import Image from "next/image";
import LoginForm from "@/components/LoginForm/LoginForm";
import Link from "next/link";

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
      <h1 className="text-center font-title text-3xl md:text-4xl">
        ~~ Marche Aquatique ~~ <br />
        Les randonneurs des Sables du Born
      </h1>{" "}
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
