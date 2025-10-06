// app/api/strapi/[slug]/route.js

import { fetchStrapi } from "@/utils/fetchStrapi";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    // 1. Récupérer le paramètre dynamique
    const { slug } = params;

    // 2. Validation
    if (!slug) {
      return NextResponse.json({ error: "Slug manquant" }, { status: 400 });
    }

    // 4. Fetch Strapi avec cache de 300 secondes (5 min)
    const response = await fetchStrapi(`${slug} /optimized`, 300);

    // 5. Parser la réponse
    const data = await response.json();

    // 6. Gérer les erreurs HTTP de Strapi
    if (!response.ok || data.error) {
      return NextResponse.json(
        {
          error:
            data.error ||
            `Erreur Strapi: ${response.status} - ${response.statusText}`,
        },
        {
          status: response.status,
        },
      );
    }

    // 7. Retourner les données avec succès
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // 8. Gérer les erreurs inattendues
    console.error(`[API /api/strapi/${params?.slug}]`, error.message);

    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 },
    );
  }
}
