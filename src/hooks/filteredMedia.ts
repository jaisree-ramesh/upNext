import { useMemo } from "react";
import { searchByTitle } from "@/lib/search";

interface UseFilteredMediaProps<T> {
  items: T[];
  query: string;
  filterFn?: () => T[];
}

export function useFilteredMedia<T extends { title: string }>({
  items,
  query,
  filterFn,
}: UseFilteredMediaProps<T>) {
  return useMemo(() => {
    // 1️ Search always wins
    if (query.trim()) {
      return searchByTitle(items, query);
    }

    // 2️ Apply filters if provided
    if (filterFn) {
      return filterFn();
    }

    // 3️ Default
    return items;
  }, [items, query, filterFn]);
}
