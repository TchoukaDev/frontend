const SLUG_TO_API = {
  boutique: "boutiques",
  "actualites-club": "infos",
  competitions: "competitions",
  "section-animateurs": "section-animateurs",
};

export function slugToApiCollection(slug) {
  return SLUG_TO_API[slug] || slug;
}
