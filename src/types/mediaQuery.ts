import type { MediaType } from "./media";

export interface IMediaQuery {
  page: number;
  query?: string;
  genres?: number[];
  providers?: number[];
  section: MediaType;
  kind?: "movie" | "tv";
}
