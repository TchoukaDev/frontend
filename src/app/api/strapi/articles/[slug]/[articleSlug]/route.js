import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { slug, articleSlug } = params;

    if (!slug || !articleSlug) {
      return NextResponse.json(
        { error: "slug ou articleSlug manquant" },
        { status: 400 },
      );
    }

    const response = await fetchStrapi(`${slug}/${articleSlug}`, 300);

    const data = await response.json();

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

    return NextResponse.json(data);
  } catch (e) {
    console.error(
      `[API /api/strapi/${params?.slug}/${params?.articleSlug}]`,
      error.message,
    );
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 },
    );
  }
}
