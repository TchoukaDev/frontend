import ArticlesPage from "@/components/Pages/Articles/ArticlesPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { notFound, redirect } from "next/navigation";

export default async function AnimSectionPage({ searchParams }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  if (session?.user?.role !== "animateur") {
    redirect("/acces-refuse?section=animateur");
  }
  return (
    <ArticlesPage
      endpoint="animateurs"
      title="Section animateurs"
      searchParams={searchParams}
    />
  );
}
