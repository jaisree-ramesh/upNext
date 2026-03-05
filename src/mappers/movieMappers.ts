import { tmdb_genre_map } from "@/consts/tmdbGenres";
import type { IMovieMediaProps } from "@/types/media";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export function mapTmdbMovieToMovie(movie: any): IMovieMediaProps {
  return {
    id: movie.id,
    type: "movie",
    title: movie.title,
    description: movie.overview,
    image: movie.poster_path
      ? `${IMAGE_BASE}${movie.poster_path}`
      : "/placeholder.png",
    year: movie.release_date?.split("-")[0] ?? "—",
    genres: movie.genre_ids
      .map((id: any) => tmdb_genre_map[id])
      .filter(Boolean),
    providers: [], // we’ll fill this later
  };
}
