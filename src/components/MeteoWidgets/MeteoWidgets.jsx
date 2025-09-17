"use client";
import { useState, useEffect } from "react";

export default function MeteoWidget() {
  const [meteo, setMeteo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const chargerMeteo = async () => {
      try {
        const response = await fetch("/api/meteo?ville=Biscarrosse");
        const data = await response.json();
        setMeteo(data);
      } catch (error) {
        console.error("Erreur météo:", error);
      } finally {
        setLoading(false);
      }
    };

    // Charger immédiatement
    chargerMeteo();

    // Puis toutes les 10 minutes (600000ms)
    const interval = setInterval(chargerMeteo, 10 * 60 * 1000);

    // Nettoyer quand le composant se démonte
    return () => clearInterval(interval);
  }, []); // [] = une seule fois au montage

  if (loading) {
    return <div className="animate-pulse">Chargement météo...</div>;
  }

  return (
    <div className="bg-blue-100 p-4 rounded">
      <h3 className="font-bold">Biscarrosse</h3>
      <div className="flex items-center gap-2">
        <img
          src={`https://openweathermap.org/img/wn/${meteo.weather[0].icon}@2x.png`}
          alt="Météo"
          className="w-12 h-12"
        />
        <div>
          <p className="text-2xl font-bold">{Math.round(meteo.main.temp)}°C</p>
          <p className="text-sm">{meteo.weather[0].description}</p>
        </div>
      </div>
      <p className="text-xs text-gray-600 mt-2">
        ↻ Mise à jour automatique toutes les 10min
      </p>
    </div>
  );
}
