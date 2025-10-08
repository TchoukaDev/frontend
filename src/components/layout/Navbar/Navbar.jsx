import { Suspense } from "react";
import NavbarServer from "./NavbarServer";

function Skeleton() {
  return (
    <div className="bg-sand w-full shadow-lg shadow-black/40 z-1000 h-10 md:h-[60px]"></div>
  );
}

export default function NavBar() {
  return (
    <Suspense fallback={<Skeleton />}>
      <NavbarServer />
    </Suspense>
  );
}
