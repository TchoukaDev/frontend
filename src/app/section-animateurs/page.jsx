import ArticlesPage from "@/components/Pages/Articles/ArticlesPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AnimSectionPage({ searchParams, params }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  if (session?.user?.role !== "animateur") {
    redirect("/acces-refuse?section=animateur");
  }
  return (
    <ArticlesPage
      slug={params.slug}
      title="Section animateurs"
      searchParams={searchParams}
    />
  );
}
