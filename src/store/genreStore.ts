import { create } from "zustand";
import { fetchMovieGenres, type TMDBGenre } from "@/api/tmdbGenres";

interface GenreState {
  movieGenres: TMDBGenre[];
  loading: boolean;
  error?: string;
  loadMovieGenres: () => Promise<void>;
}

export const useGenreStore = create<GenreState>((set) => ({
  movieGenres: [],
  loading: false,

  loadMovieGenres: async () => {
    try {
      set({ loading: true });
      const genres = await fetchMovieGenres();
      set({ movieGenres: genres, loading: false });
    } catch (e) {
      set({ loading: false, error: "Failed to load genres" });
    }
  },
}));

// selector (important)
export const useMovieGenreList = () => useGenreStore((s) => s.movieGenres);
