import { create } from "zustand";

interface Provider {
  id: number;
  name: string;
  logo: string;
}

interface ProviderState {
  providersByMovieId: Record<number, Provider[]>;
  setProviders: (movieId: number, providers: Provider[]) => void;
}

export const useProviderStore = create<ProviderState>((set) => ({
  providersByMovieId: {},

  setProviders: (movieId, providers) =>
    set((state) => ({
      providersByMovieId: {
        ...state.providersByMovieId,
        [movieId]: providers,
      },
    })),
}));
