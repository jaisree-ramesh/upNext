import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PodcastGenre } from "../types/filterTypes";

interface FilterState {
  movieGenres: number[];
  tvGenres: number[];
  providers: number[];
  podcastCategories: PodcastGenre[];

  actions: {
    toggleMovieGenre: (genreId: number) => void;
    toggleTvGenre: (genreId: number) => void;
    toggleProvider: (provider: number) => void;
    togglePodcastCategory: (category: PodcastGenre) => void;
    clearStreaming: () => void;
    clearMovies: () => void;
    clearTv: () => void;
    clearPodcasts: () => void;
    clearAll: () => void;
  };
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      movieGenres: [],
      tvGenres: [],
      providers: [],
      podcastCategories: [],

      actions: {
        toggleMovieGenre: (genreId) => {
          const current = get().movieGenres;
          set({
            movieGenres: current.includes(genreId)
              ? current.filter((g) => g !== genreId)
              : [...current, genreId],
          });
        },

        toggleTvGenre: (genreId) => {
          const current = get().tvGenres;
          set({
            tvGenres: current.includes(genreId)
              ? current.filter((g) => g !== genreId)
              : [...current, genreId],
          });
        },

        toggleProvider: (providerId) => {
          const current = get().providers;
          set({
            providers: current.includes(providerId)
              ? current.filter((p) => p !== providerId)
              : [...current, providerId],
          });
        },

        togglePodcastCategory: (category) => {
          const current = get().podcastCategories;
          set({
            podcastCategories: current.includes(category)
              ? current.filter((c) => c !== category)
              : [...current, category],
          });
        },

        clearMovies: () => set({ movieGenres: [], providers: [] }),
        clearTv: () => set({ tvGenres: [] }),
        clearPodcasts: () => set({ podcastCategories: [] }),
        clearStreaming: () =>
          set({
            movieGenres: [],
            tvGenres: [],
            providers: [],
          }),

        clearAll: () =>
          set({
            movieGenres: [],
            tvGenres: [],
            providers: [],
            podcastCategories: [],
          }),
      },
    }),
    {
      name: "up-next-filters",

      //  persist ONLY data
      partialize: (state) => ({
        movieGenres: state.movieGenres,
        tvGenres: state.tvGenres,
        providers: state.providers,
        podcastCategories: state.podcastCategories,
      }),

      //  CRITICAL FIX: preserve actions
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as Partial<FilterState>),
      }),
    },
  ),
);

export const useMovieGenres = () => useFilterStore((s) => s.movieGenres);
export const useTvGenres = () => useFilterStore((s) => s.tvGenres);
export const useProviders = () => useFilterStore((s) => s.providers);
export const usePodcastCategories = () =>
  useFilterStore((s) => s.podcastCategories);

// export const useClearFilters = () => useFilterStore((s) => s.actions.clearAll);

export const useFilterActions = () => useFilterStore((s) => s.actions);
