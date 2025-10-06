import ArticlesPage from "@/components/Pages/Articles/ArticlesPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function CompetitionsPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <ArticlesPage
      slug="competitions"
      title="Informations compétitions"
      searchParams={searchParams}
    />
  );
}
