export const MediaType = {
  Movie: "movie",
  Podcast: "podcast",
  Both: "both",
} as const;

export type MediaType = (typeof MediaType)[keyof typeof MediaType];

export interface IMovieMediaProps {
  id: string;
  title: string;
  image: string;
  description?: string;
  type: typeof MediaType.Movie;
  year: number;
  genres: string[];
  providers?: string[];
}

export interface IPodcastProps {
  id: string;
  title: string;
  image: string;
  description?: string;
  type: typeof MediaType.Podcast;
  publisher: string;
  category: string;
}
