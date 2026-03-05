import { tmdbFetch } from "@/lib/tmdb";
import type { ITmdbTv, TmdbListResponse } from "@/types/media";
import { mapTmdbTvToMedia } from "@/mappers/tvMappers";

export async function getTvShows() {
  const data = await tmdbFetch<TmdbListResponse<ITmdbTv>>("/tv/popular");

  return {
    results: data.results.map(mapTmdbTvToMedia),
    totalPages: data.total_pages,
  };
}
