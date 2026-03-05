import { tmdbFetch } from "@/lib/tmdb";
import { mapTmdbMovieToMovie } from "@/mappers/movieMappers";
import type { ITmdbMovie, TmdbListResponse } from "@/types/media";
import type { IMediaQuery } from "@/types/mediaQuery";

const MAX_PAGES = 4;

export async function getCinemaMovies(params: IMediaQuery) {
  const { query, language, genres } = params;

  const region = "DE";

  const today = new Date();
  const windowStart = new Date();
  windowStart.setDate(today.getDate() - 10);

  let allResults: ITmdbMovie[] = [];

  // 1️ collect cinema movies
  for (let page = 1; page <= MAX_PAGES; page++) {
    const searchParams = new URLSearchParams();

    searchParams.set("page", String(page));
    searchParams.set("region", region);
    searchParams.set("language", language === "de" ? "de-DE" : "en-US");

    const url = `/movie/now_playing?${searchParams.toString()}`;

    const data = await tmdbFetch<TmdbListResponse<ITmdbMovie>>(url);

    allResults.push(...data.results);

    if (page >= data.total_pages) break;
  }

  // 2️ release window filter
  let filtered = allResults.filter((movie) => {
    if (!movie.release_date) return false;

    const release = new Date(movie.release_date);

    return release <= today && release >= windowStart;
  });

  // 3️ search filter
  if (query && query.trim()) {
    const q = query.toLowerCase();

    filtered = filtered.filter((movie) =>
      movie.title.toLowerCase().includes(q),
    );
  }

  // 4️ genre filter
  if (genres && genres.length > 0) {
    filtered = filtered.filter((movie) =>
      movie.genre_ids?.some((g) => genres.includes(g)),
    );
  }

  console.log(
    `Collected ${allResults.length} movies → ${filtered.length} after filters`,
  );

  return {
    results: filtered.map(mapTmdbMovieToMovie),
  };
}
