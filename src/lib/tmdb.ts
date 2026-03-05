// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_TOKEN = import.meta.env.VITE_TMDB_API_TOKEN;

const BASE_URL = "https://api.themoviedb.org/3";

export async function tmdbFetch<T>(endpoint: string): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("region", "DE");
  url.searchParams.set("language", "de-DE");

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("TMDB request failed");
  }

  return res.json();
}
