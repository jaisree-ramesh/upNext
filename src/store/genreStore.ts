import { create } from "zustand";
import { fetchGenres, type TMDBGenre } from "@/api/tmdbGenres";

interface GenreState {
  movieGenres: TMDBGenre[];
  tvGenres: TMDBGenre[];
  loading: boolean;
  error?: string;
  loadGenres: (type: "movie" | "tv") => Promise<void>;
}

export const useGenreStore = create<GenreState>((set) => ({
  movieGenres: [],
  tvGenres: [],
  loading: false,
  error: undefined,

  loadGenres: async (type) => {
    try {
      set({ loading: true, error: undefined });
      const genres = await fetchGenres(type);

      if (type === "movie") {
        set({ movieGenres: genres, loading: false });
      } else {
        set({ tvGenres: genres, loading: false });
      }
    } catch {
      set({ loading: false, error: "Failed to load genres" });
    }
  },
}));

export const useMovieGenreList = () => useGenreStore((s) => s.movieGenres);
export const useTvGenreList = () => useGenreStore((s) => s.tvGenres);
