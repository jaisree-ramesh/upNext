import i18n from "@/i18n";
import { tmdbFetch } from "@/lib/tmdb";

export interface TMDBGenre {
  id: number;
  name: string;
}

export async function fetchGenres(
  type: "movie" | "tv",
  // language: "de" | "en",
): Promise<TMDBGenre[]> {
  const lang = i18n.language.startsWith("de") ? "de-DE" : "en-US";

  const data = await tmdbFetch<{ genres: TMDBGenre[] }>(
    `/genre/${type}/list?language=${lang}`,
  );

  return data.genres;
}