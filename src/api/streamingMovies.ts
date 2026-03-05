import { tmdbFetch } from "@/lib/tmdb";
import { mapTmdbMovieToMovie } from "@/mappers/movieMappers";
import type { ITmdbMovie, TmdbListResponse } from "@/types/media";

export async function getStreamingMovies(page: number) {
  const data = await tmdbFetch<TmdbListResponse<ITmdbMovie>>(
    `/movie/popular?page=${page}`,
  );
  return {
    results: data.results.map(mapTmdbMovieToMovie),
    totalPages: data.total_pages,
  };
}
