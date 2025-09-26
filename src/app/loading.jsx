import Card from "@/components/ui/Card/Card";

// Skeleton
export default function Loading() {
  return (
    <Card>
      <div className="flex items-center justify-center py-12 min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3">Chargement de la page...</span>
      </div>
    </Card>
  );
}
