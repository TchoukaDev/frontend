import { NextResponse } from "next/server";

export async function GET(request, { params, searchParams }) {
  try {
    const { slug } = params;
    const resolvedParams = await searchParams;
    const limit = Number(resolvedParams?.limit);
    const page = Number(resolvedParams.page);

    if (!limit || !page) {
      NextResponse.json({
        error: "Limite de page ou page non définie",
        status: 400,
      });
    }

    if (!slug) {
      return NextResponse.json({ error: "Slug manquant", status: 400 });
    }

    const data = await fetchStrapi(`${slug}?page=${page}&limit=${limit}`, 300);

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
      `[API /api/strapi/${params?.slug}?pagination]`,
      error.message,
    );
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 },
    );
  }
}
