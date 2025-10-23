// app/api/list-slugs/route.js
import { fetchStrapi } from "@/utils/fetchStrapi";

export async function GET() {
  try {
    console.log("🔍 Fetching section-animateurs...");
    const sections = await fetchStrapi(
      "section-animateurs?fields=id,slug,titre",
      0,
    );

    console.log("🔍 Fetching competitions...");
    const comps = await fetchStrapi("competitions?fields=id,slug,titre", 0);

    return Response.json({
      success: true,
      sectionAnimateurs: sections?.data || [],
      competitions: comps?.data || [],
    });
  } catch (error) {
    console.error("❌ Error:", error);

    return Response.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
      },
      { status: 500 },
    );
  }
}
