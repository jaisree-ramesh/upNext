import { tmdbFetch } from "@/lib/tmdb";
import { mapTmdbMovieToStreaming } from "@/mappers/streamingMappers";
import { mapTmdbTvToMedia } from "@/mappers/tvMappers";
import type { ITmdbMovie, ITmdbTv, TmdbListResponse } from "@/types/media";
import type { IMediaQuery } from "@/types/mediaQuery";

export async function getStreamingMedia(params: IMediaQuery) {
  const { page, query, genres = [], providers = [], language, kind } = params;

  if (!kind) {
    throw new Error(
      "Media kind (movie or tv) must be specified for streaming media",
    );
  }

  const region = "DE";
  const searchParams = new URLSearchParams();

  searchParams.set("page", String(page));
  searchParams.set("watch_region", region);
  searchParams.set("region", region);
  searchParams.set("language", language === "de" ? "de-DE" : "en-US");

  let endpoint = "";

  // 1) Search
  if (query && query.trim()) {
    endpoint = kind === "tv" ? "/search/tv" : "/search/movie";
    searchParams.set("query", query.trim());
  }
  // 2) Discover with filters
  else {
    endpoint = kind === "tv" ? "/discover/tv" : "/discover/movie";

    if (genres.length > 0) {
      searchParams.set("with_genres", genres.join(","));
    }

    if (providers.length > 0) {
      searchParams.set("with_watch_providers", providers.join(","));
    }

    searchParams.set("with_watch_monetization_types", "flatrate");
  }

  const data = await tmdbFetch<TmdbListResponse<ITmdbMovie | ITmdbTv>>(
    `${endpoint}?${searchParams.toString()}`,
  );

  const results =
    kind === "tv"
      ? (data.results as ITmdbTv[]).map(mapTmdbTvToMedia)
      : (data.results as ITmdbMovie[]).map(mapTmdbMovieToStreaming);

  return {
    results,
    totalPages: data.total_pages,
  };
}
