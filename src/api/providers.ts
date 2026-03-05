import { tmdbFetch } from "@/lib/tmdb";
import { mapTmdbTvToMedia } from "@/mappers/tvMappers";
import type { ITmdbTv, TmdbListResponse } from "@/types/media";

export interface TmdbWatchProviders {
  results: {
    DE?: {
      flatrate?: {
        provider_id: number;
        provider_name: string;
        logo_path: string;
      }[];
      rent?: {
        provider_id: number;
        provider_name: string;
        logo_path: string;
      }[];
      buy?: {
        provider_id: number;
        provider_name: string;
        logo_path: string;
      }[];
    };
  };
}

function extractDeProviders(data: TmdbWatchProviders) {
  const de = data.results?.DE;

  if (!de) return [];

  return [...(de.flatrate ?? []), ...(de.rent ?? []), ...(de.buy ?? [])];
}

export async function getMovieProviders(movieId: number) {
  const data = await tmdbFetch<TmdbWatchProviders>(
    `/movie/${movieId}/watch/providers`,
  );
  return extractDeProviders(data);
}

export async function getTvProviders(tvId: number) {
  const data = await tmdbFetch<TmdbWatchProviders>(
    `/tv/${tvId}/watch/providers`,
  );

  return extractDeProviders(data);
}


export async function getPopularTvShows(page: number) {
  const data = await tmdbFetch<TmdbListResponse<ITmdbTv>>(
    `/tv/popular?page=${page}`,
  );

  return {
    results: data.results.map(mapTmdbTvToMedia),
    totalPages: data.total_pages,
  };
}
