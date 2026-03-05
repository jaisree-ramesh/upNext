import { tmdb_genre_map } from "@/consts/tmdbGenres";
import { MediaType, type IStreamingMedia } from "@/types/media";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export function mapTmdbMovieToStreaming(movie: any): IStreamingMedia {
  return {
    id: movie.id,
    title: movie.title,
    description: movie.overview,
    image: movie.poster_path
      ? `${IMAGE_BASE}${movie.poster_path}`
      : "/placeholder.png",
    year: movie.release_date
      ? Number(movie.release_date.split("-")[0])
      : new Date().getFullYear(),
    genres: movie.genre_ids,
    // .map((id: number) => tmdb_genre_map[id])
    // .filter(Boolean),
    genreNames: movie.genre_ids
      .map((id: number) => tmdb_genre_map[id])
      .filter(Boolean),

    section: MediaType.Streaming,
    kind: "movie",

    providers: [],
    rating: movie.vote_average,
    orginalLanguage: movie.original_language ?? undefined,
    ageRating: null,
  };
}
