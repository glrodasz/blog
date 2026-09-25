export const SITE_URL = "https://blog.guillermorodas.com";

/**
 * Podcast metadata for the iTunes tags in the RSS feeds.
 * Empty `cover` / `ownerEmail` are left out of the feed until they are set.
 */
export const PODCAST = {
  // Square JPG/PNG, 1400–3000 px, placed in public/ (e.g. "/podcast-cover.jpg").
  cover: "",
  // Public in the feed; Apple Podcasts and Spotify use it to verify ownership.
  ownerEmail: "",
  category: "Technology",
  explicit: false,
};
