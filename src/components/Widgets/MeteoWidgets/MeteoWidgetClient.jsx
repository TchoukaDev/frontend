"use client";
import Image from "next/image";
import useMeteo from "@/hooks/useMeteo";

export default function MeteoWidgetClient({ initialData = {} }) {
  const {
    data: meteo = {},
    error,
    isLoading,
  } = useMeteo("Biscarrosse", initialData);

  // Si pas de données initiales, afficher loading
  if (error) {
    return (
      <div className="custom-gradient text-sand p-3 from-blue3 to-blue1 rounded-xl border-2 border-blue1">
        Une erreur est survenue lors du chargement de la meteo. {error.message}
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="animate-pulse custom-gradient text-sm md:text-xl text-sand p-2 md:p-3 from-blue3 to-blue1 rounded-xl border-2 border-blue1">
        Chargement meteo en cours...
      </div>
    );
  }
  return (
    <div className="custom-gradient font-title text-sand p-2 md:p-3 from-blue3 to-blue1 flex flex-col justify-center items-center  rounded-xl border-2 text-sm md:text-xl  border-blue1 relative">
      <div className="underline text-center">{meteo.name}</div>
      <div className="flex gap-2 justify-center items-center">
        <div className="p-1">{meteo.weather[0].description}</div>
        <div>
          <Image
            width={30}
            height={30}
            src={`https://openweathermap.org/img/wn/${meteo.weather[0].icon}@2x.png`}
            alt="meteo icon"
          />{" "}
        </div>{" "}
        <div className="p-1">{Math.round(meteo.main.temp)}°C</div>
      </div>
    </div>
  );
}
