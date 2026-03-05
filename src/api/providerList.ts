import { tmdbFetch } from "@/lib/tmdb";

export interface TMDBProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

interface ProviderListResponse {
  results: TMDBProvider[];
}

export async function fetchMovieProviderList(region: string = "DE") {
  const data = await tmdbFetch<ProviderListResponse>(
    `/watch/providers/movie?watch_region=${region}`,
  );
  return data.results;
}

export async function fetchTvProviderList(region: string = "DE") {
  const data = await tmdbFetch<ProviderListResponse>(
    `/watch/providers/tv?watch_region=${region}`,
  );
  return data.results;
}
