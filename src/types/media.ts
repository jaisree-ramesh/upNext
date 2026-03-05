export const MediaType = {
  Movie: "movie",
  Podcast: "podcast",
  Both: "both",
  Tv: "tv",
} as const;

export type MediaType = (typeof MediaType)[keyof typeof MediaType];

export interface IMovieMediaProps {
  id: number;
  title: string;
  image: string;
  description?: string;
  type: typeof MediaType.Movie;
  year: number;
  genres: string[];
  providers?: {
    id: number;
    name: string;
    logo: string;
  }[];
}

export interface IPodcastProps {
  id: string;
  title: string;
  image: string;
  description?: string;
  type: typeof MediaType.Podcast;
  publisher: string;
  category: string;
  providers?: {
    id: number;
    name: string;
    logo: string;
  }[];
}

export interface ITvMediaProps {
  id: number;
  title: string;
  image: string;
  description?: string;
  type: typeof MediaType.Tv;
  year: number;
  genres: string[];
  providers?: {
    id: number;
    name: string;
    logo: string;
  }[];
}

export interface ITmdbMovie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  genre_ids: number[];
}

export interface TmdbListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface ITmdbTv {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
  genre_ids: number[];
  overview: string;
}

export interface ITvShowProps {
  id: number;
  title: string;
  image: string;
  description?: string;
  type: typeof MediaType.Tv;
  year: number;
  genres: string[];
}
