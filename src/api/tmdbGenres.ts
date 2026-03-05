import { tmdbFetch } from "@/lib/tmdb";

export interface TMDBGenre {
  id: number;
  name: string;
}

export async function fetchGenres(
  type: "movie" | "tv",
  language: "de" | "en",
): Promise<TMDBGenre[]> {
  const lang = language === "de" ? "de-DE" : "en-US";

  const data = await tmdbFetch<{ genres: TMDBGenre[] }>(
    `/genre/${type}/list?language=${lang}`,
  );

  return data.genres;
}