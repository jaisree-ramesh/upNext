import type { MovieGenre, StreamingProvider } from "@/types/filterTypes";
import type { IMovieMediaProps } from "../types/media";

interface MovieFilterOptions {
  query: string;
  genres: MovieGenre[];
  providers: StreamingProvider[];
}

export function filterMovies(
  movies: IMovieMediaProps[],
  options: MovieFilterOptions,
) {
  const { query, genres, providers } = options;

  return movies.filter((movie) => {
    // 1️ Search
    if (query && !movie.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    // 2️ Genre filter
    if (genres.length > 0) {
      const hasGenre = movie.genres.some((g) =>
        genres.includes(g as MovieGenre),
      );
      if (!hasGenre) return false;
    }

    // 3️ Provider filter (optional now, real later)
    if (providers.length > 0) {
      // for now assume movie.providers?: string[]
      if (
        !movie.providers?.some((p) =>
          providers.includes(p as StreamingProvider),
        )
      ) {
        return false;
      }
    }

    return true;
  });
}
