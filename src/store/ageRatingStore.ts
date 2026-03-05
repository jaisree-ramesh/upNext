import { create } from "zustand";

interface AgeRatingState {
  ratings: Record<number, string | null>;
  setRating: (id: number, rating: string | null) => void;
}

export const useAgeRatingStore = create<AgeRatingState>((set) => ({
  ratings: {},
  setRating: (id, rating) => {
    set((state) => ({
      ratings: {
        ...state.ratings,

        [id]: rating,
      },
    }));
  },
}));

export const useAgeRatings = () => useAgeRatingStore((state) => state.ratings);
export const useSetAgeRating = () =>
  useAgeRatingStore((state) => state.setRating);
