// app/api/dossiers/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = `${process.env.STRAPI_API_URL}/api/dossier-galeries`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      next: { revalidate: 300 }, // Cache Next.js 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Strapi error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Erreur API Dossiers:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des dossiers" },
      { status: 500 },
    );
  }
}
