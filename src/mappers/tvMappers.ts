import { tmdb_genre_map } from "@/consts/tmdbGenres";
import type { ITmdbTv } from "@/types/media";
import { MediaType } from "@/types/media";
import type { ITvMediaProps } from "@/types/media"; // reuse movie card shape for now

export function mapTmdbTvToMedia(tv: ITmdbTv): ITvMediaProps {
  return {
    id: tv.id,
    title: tv.name,
    image: tv.poster_path
      ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
      : "",
    description: tv.overview,
    type: MediaType.Tv,
    year: tv.first_air_date
      ? Number(tv.first_air_date.split("-")[0])
      : new Date().getFullYear(),
    genres: tv.genre_ids.map((id) => tmdb_genre_map[id]).filter(Boolean),
    providers: [],
  };
}
