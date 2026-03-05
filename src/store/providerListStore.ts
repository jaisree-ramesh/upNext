import { create } from "zustand";
import {
  fetchMovieProviderList,
  fetchTvProviderList,
  type TMDBProvider,
} from "@/api/providerList";

interface ProviderListState {
  movieProviders: TMDBProvider[];
  tvProviders: TMDBProvider[];
  loading: boolean;
  error?: string;

  loadMovieProviders: (region?: string) => Promise<void>;
  loadTvProviders: (region?: string) => Promise<void>;
}

export const useProviderListStore = create<ProviderListState>((set) => ({
  movieProviders: [],
  tvProviders: [],
  loading: false,
  error: undefined,

  loadMovieProviders: async (region = "DE") => {
    try {
      set({ loading: true, error: undefined });
      const providers = await fetchMovieProviderList(region);
      set({ movieProviders: providers, loading: false });
    } catch {
      set({ loading: false, error: "Failed to load movie providers" });
    }
  },

  loadTvProviders: async (region = "DE") => {
    try {
      set({ loading: true, error: undefined });
      const providers = await fetchTvProviderList(region);
      set({ tvProviders: providers, loading: false });
    } catch {
      set({ loading: false, error: "Failed to load TV providers" });
    }
  },
}));

// selectors
export const useMovieProviderList = () =>
  useProviderListStore((s) => s.movieProviders);

export const useTvProviderList = () =>
  useProviderListStore((s) => s.tvProviders);
