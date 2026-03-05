import type { MediaType } from "./media";

export interface IMediaQuery {
  page: number;
  query?: string;
  genres?: number[];
  providers?: number[];
  section: MediaType;
  language: "de" | "en";
  kind?: "movie" | "tv";
}
