"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import useMeteo from "@/hooks/useMeteo";

export default function MeteoWidgetClient({ initialData }) {
  const {
    data: meteo = [],
    error,
    isLoading,
  } = useMeteo("Biscarrosse", initialData);

  // Si pas de données initiales, afficher loading
  if (error) {
    return (
      <div className="custom-gradient p-3 from-blue3 to-blue1 rounded-xl border-2 border-blue1">
        Une erreur est survenue lors du chargement de la meteo. {error.message}
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="animate-pulse custom-gradient p-3 from-blue3 to-blue1 rounded-xl border-2 border-blue1">
        Chargement meteo en cours...
      </div>
    );
  }
  return (
    <div className="custom-gradient p-3 from-blue3 to-blue1 grid grid-rows-[auto_1fr] grid-cols-[1fr_auto] text-center rounded-xl border-2 text-lg font-semibold border-blue1 relative">
      <div className="col-span-2 p-1">{meteo.name}</div>

      <div className="flex flex-col">
        <div className="p-1">{meteo.weather[0].description}</div>
        <div className="p-1">{Math.round(meteo.main.temp)}°C</div>
      </div>

      <div className="flex justify-center items-center   col-start-2">
        <Image
          unoptimized
          width={40}
          height={40}
          src={`https://openweathermap.org/img/wn/${meteo.weather[0].icon}@2x.png`}
          alt="meteo icon"
        />
      </div>
    </div>
  );
}
