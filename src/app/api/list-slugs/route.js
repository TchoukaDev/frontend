// app/api/list-slugs/route.js
import { fetchStrapi } from "@/utils/fetchStrapi";

export async function GET() {
  const sections = await fetchStrapi(
    "section-animateurs?fields=id,slug,titre",
    0,
  );
  const comps = await fetchStrapi("competitions?fields=id,slug,titre", 0);

  return Response.json({
    sectionAnimateurs: sections?.data || [],
    competitions: comps?.data || [],
  });
}
