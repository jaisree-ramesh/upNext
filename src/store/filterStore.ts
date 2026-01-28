import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  MovieGenre,
  StreamingProvider,
  PodcastGenre,
} from "../types/filterTypes";

interface FilterState {
  // movie / tv
  movieGenres: MovieGenre[];
  providers: StreamingProvider[];

  // podcasts
  podcastCategories: PodcastGenre[];

  actions: {
    toggleMovieGenre: (genre: MovieGenre) => void;
    toggleProvider: (provider: StreamingProvider) => void;
    togglePodcastCategory: (category: PodcastGenre) => void;
    clearMovies: () => void;
    clearPodcasts: () => void;
    clearAll: () => void;
  };
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      movieGenres: [],
      providers: [],
      podcastCategories: [],

      actions: {
        toggleMovieGenre: (genre) => {
          const current = get().movieGenres;
          set({
            movieGenres: current.includes(genre)
              ? current.filter((g) => g !== genre)
              : [...current, genre],
          });
        },

        toggleProvider: (provider) => {
          const current = get().providers;
          set({
            providers: current.includes(provider)
              ? current.filter((p) => p !== provider)
              : [...current, provider],
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

        clearPodcasts: () => set({ podcastCategories: [] }),

        clearAll: () =>
          set({
            movieGenres: [],
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

export const useProviders = () => useFilterStore((s) => s.providers);

export const usePodcastCategories = () =>
  useFilterStore((s) => s.podcastCategories);

// export const useClearFilters = () => useFilterStore((s) => s.actions.clearAll);

export const useFilterActions = () => useFilterStore((s) => s.actions);

