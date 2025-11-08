const SLUG_TO_API = {
  boutique: "boutique",
  "actualites-club": "actualites-club",
  competitions: "competitions",
  "section-animateurs": "section-animateurs",
};

export function slugToApiCollection(slug) {
  return SLUG_TO_API[slug] || slug;
}
