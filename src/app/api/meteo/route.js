import { NextResponse } from "next/server";

export async function GET(req) {
  // transformer l'url en objet
  const { searchParams } = new URL(req.url);
  // récupérer les paramètre de l'URL (ici ?ville)
  const ville = searchParams.get("ville") || "Biscarrosse";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=fr`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json({ error: "Ville non trouvée" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
