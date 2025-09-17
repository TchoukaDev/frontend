import { NextResponse } from "next/server";

export async function GET(req) {
  // transformer l'URL en objet pour récupérer les query params
  const { searchParams } = new URL(req.url);

  // récupérer la ville passée en paramètre, par défaut "Biscarrosse"
  const ville = searchParams.get("ville") || "Biscarrosse";

  // encoder la ville pour éviter les caractères spéciaux qui cassent l'URL
  const encodedVille = encodeURIComponent(ville);

  // URL OpenWeather
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedVille}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=fr`;

  try {
    // fetch vers OpenWeather
    const response = await fetch(url);

    // transformer la réponse en JSON
    const data = await response.json();

    // On renvoie toujours status 200 avec un objet error
    if (!response.ok) {
      return NextResponse.json({ error: data.message });
    }

    // Tout est OK, on renvoie les données météo
    return NextResponse.json(data);
  } catch (error) {
    // Si fetch échoue (réseau, clé invalide, timeout)
    return NextResponse.json({ error: "Erreur serveur" });
  }
}
