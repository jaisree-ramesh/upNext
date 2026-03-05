import { tmdbFetch } from "@/lib/tmdb";

//  MOVIES
interface MovieReleaseDatesResponse {
  results: {
    iso_3166_1: string;
    release_dates: {
      certification: string;
    }[];
  }[];
}

export async function getMovieAgeRating(
  movieId: number,
): Promise<string | null> {
  const data = await tmdbFetch<MovieReleaseDatesResponse>(
    `/movie/${movieId}/release_dates`,
  );

  const de = data.results.find((r) => r.iso_3166_1 === "DE");
  const us = data.results.find((r) => r.iso_3166_1 === "US");
  const target = de || us;

  if (!target) return null;

  const cert = target.release_dates.find((r) => r.certification)?.certification;
  return cert || null;
}

// 📺 TV
interface TvContentRatingsResponse {
  results: {
    iso_3166_1: string;
    rating: string;
  }[];
}

export async function getTvAgeRating(tvId: number): Promise<string | null> {
  const data = await tmdbFetch<TvContentRatingsResponse>(
    `/tv/${tvId}/content_ratings`,
  );

  const de = data.results.find((r) => r.iso_3166_1 === "DE");
  const us = data.results.find((r) => r.iso_3166_1 === "US");
  const target = de || us;

  return target?.rating || null;
}
