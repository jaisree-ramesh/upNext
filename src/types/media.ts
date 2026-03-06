

export const MediaType = {
  Cinema: "cinema",
  Podcast: "podcast",
  Streaming: "streaming",
  Home: "home",
  Watchlist: "watchlist",
} as const;

export type MediaType = (typeof MediaType)[keyof typeof MediaType];

export interface IStreamingProvider {
  id: number;
  name: string;
  logo: string;
}

interface IBaseVisualMedia {
  id: number;
  title: string;
  image: string;
  description?: string;
  year: number;
  genres: number[];
  genreNames: string[];
  providers: IStreamingProvider[];
  rating?: number;
  orginalLanguage?: string;
  ageRating: string | null;
}
export interface ICinemaMovie extends IBaseVisualMedia {
  section: typeof MediaType.Cinema;
}

export type StreamingKind = "movie" | "tv";

export interface IStreamingMedia extends IBaseVisualMedia {
  section: typeof MediaType.Streaming;
  kind: StreamingKind;
}

export interface IPodcastProps {
  id: number;
  title: string;
  image: string;
  description?: string;
  section: typeof MediaType.Podcast;
  publisher: string;
  category: string;
  year?: number;
}

export interface ITmdbMovie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  genre_ids: number[];
}

export interface ITmdbTv {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
  genre_ids: number[];
  overview: string;
}

export interface TmdbListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
