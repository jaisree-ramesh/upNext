import { useFilterActions } from "@/store/filterStore";
import type { MediaType } from "@/types/media";
import { createContext, useContext, useEffect, useState } from "react";

interface PageHeaderContextValue {
  title: string;
  setTitle: (title: string) => void;
  query: string;
  setQuery: (q: string) => void;
  filterType: MediaType;
  setFilterType: (type: PageHeaderContextValue["filterType"]) => void;
  clearQuery: () => void;
}

const PageHeaderContext = createContext<PageHeaderContextValue | null>(null);

export const PageHeaderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [title, setTitle] = useState("");
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState<MediaType>("both");
  const clearQuery = () => setQuery("");
  const { clearAll } = useFilterActions();

  useEffect(() => {
    clearAll();
  }, [filterType]);

  return (
    <PageHeaderContext.Provider
      value={{
        title,
        setTitle,
        query,
        setQuery,
        filterType,
        setFilterType,
        clearQuery,
      }}
    >
      {children}
    </PageHeaderContext.Provider>
  );
};

export const usePageHeader = () => {
  const ctx = useContext(PageHeaderContext);
  if (!ctx)
    throw new Error("usePageHeader must be used inside PageHeaderProvider");
  return ctx;
};
