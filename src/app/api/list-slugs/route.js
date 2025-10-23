// app/api/list-slugs/route.js
import { fetchStrapi } from "@/utils/fetchStrapi";

export async function GET() {
  try {
    const sections = await fetchStrapi(
      "section-animateurs?fields=id,slug,titre",
      false,
    ); // ← false au lieu de 0
    const comps = await fetchStrapi("competitions?fields=id,slug,titre", false); // ← false

    return Response.json({
      success: true,
      sectionAnimateurs: sections?.data || [],
      competitions: comps?.data || [],
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
