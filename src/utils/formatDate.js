export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "numeric",
    year: "2-digit",
  });
}
