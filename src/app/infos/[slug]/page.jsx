import Article from "@/components/Pages/Articles/Article/Article";

export default function Info({ params }) {
  return <Article params={params} endpoint="infos" />;
}
