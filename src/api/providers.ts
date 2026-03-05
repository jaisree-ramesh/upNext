import { tmdbFetch } from "@/lib/tmdb";

export interface TmdbWatchProviders {
  results: {
    DE?: {
      flatrate?: ProviderRaw[];
      rent?: ProviderRaw[];
      buy?: ProviderRaw[];
    };
  };
}

interface ProviderRaw {
  provider_id: number;
  provider_name: string;
  logo_path: string;
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
