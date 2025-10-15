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

    const data = await fetchStrapi(`${slug}/${articleSlug}`, 300);

    if (data.error) {
      return NextResponse.json(
        {
          error: data.error,
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
