import MeteoWidgetClient from "./MeteoWidgetClient";

// Récupérer données côté client pour sécuriser API et avoir un pré-rendu des données
export default async function MeteoWidgetServer() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Biscarrosse&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=fr`,
      {
        next: { revalidate: 600 },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Erreur HTTP: ${response.status} - ${response.statusText}`,
      );
    }

    const meteoInitiale = await response.json();

    return <MeteoWidgetClient initialData={meteoInitiale} />;
  } catch (error) {
    console.error("Erreur serveur météo:", error);

    // Retourner le composant sans données initiales
    return <MeteoWidgetClient initialData={null} />;
  }
}
