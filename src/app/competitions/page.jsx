import ArticlesPage from "@/components/Pages/Articles/ArticlesPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function CompetitionsPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  return (
    <ArticlesPage
      endpoint="competitions"
      title="Informations compétitions"
      searchParams={searchParams}
    />
  );
}
