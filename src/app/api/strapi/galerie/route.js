// app/api/galerie/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const limit = searchParams.get("limit") || "20";
    const offset = searchParams.get("offset") || "0";

    console.log("🔍 API Route - Limit:", limit, "Offset:", offset);

    const url = `${process.env.STRAPI_API_URL}/api/galerie?limit=${limit}&offset=${offset}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Erreur:", error);
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}
