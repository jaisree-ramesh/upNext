import type { IMovieMediaProps, IPodcastProps, ITvMediaProps } from "../types/media";
import { persist } from "zustand/middleware";
import { create } from "zustand";

interface WatchListActions {
  add: (item: IMovieMediaProps | IPodcastProps | ITvMediaProps) => void;
  remove: (id: string) => void;
  toggle: (item: IMovieMediaProps | IPodcastProps | ITvMediaProps) => void;
  isInWatchlist: (id: string) => boolean;
  clear: () => void;
}

interface WatchlistState {
  items: (IMovieMediaProps | IPodcastProps | ITvMediaProps)[];
  actions: WatchListActions;
}


export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      items: [],

      actions: {
        add: (item) => {
          const { items } = get();
          if (items.some((i) => i.id === item.id)) return;
          set({ items: [...items, item] });
        },

        remove: (id) => {
          set({ items: get().items.filter((i) => i.id !== id) });
        },

        toggle: (item) => {
          const { items } = get();
          const exists = items.some((i) => i.id === item.id);

          set({
            items: exists
              ? items.filter((i) => i.id !== item.id)
              : [...items, item],
          });
        },

        isInWatchlist: (id) => {
          return get().items.some((i) => i.id === id);
        },

        clear: () => {
          set({ items: [] });
        },
      },
    }),
    {
      name: "up-next-watchlist",

      //  THIS IS THE FIX
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);

export const useWatchlist = () => useWatchlistStore((state) => state.items);
export const useWatchlistActions = () =>
  useWatchlistStore((state) => state.actions);


