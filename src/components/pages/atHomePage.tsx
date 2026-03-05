import { useEffect, useState } from "react";
import { usePageHeader } from "../../context/PageHeaderContect";
import {
  useFilterActions,
  useMovieGenres,
  useProviders,
} from "../../store/filterStore";
import { filterMovies } from "../../lib/filterMedia";
import { useFilteredMedia } from "../../hooks/filteredMedia";
import { useStreamingMedia } from "@/hooks/streamingMedia";
import { MediaGrid } from "../media/mediaGrid";
import { MediaPagination } from "../media/mediaPagination";

const AtHomePage = () => {
  const { setTitle, query, setFilterType } = usePageHeader();

  const [page, setPage] = useState(1);

  const { items, loading, error, totalPages } = useStreamingMedia(page);

  const movieGenres = useMovieGenres();
  const providers = useProviders();
  const { clearAll } = useFilterActions();

  useEffect(() => {
    setTitle("Find something to watch at home");
    setFilterType("movie");
    clearAll();
  }, [setTitle, setFilterType, clearAll]);

  const itemsToShow = useFilteredMedia({
    items,
    query,
    filterFn: () => {
      if (movieGenres.length === 0 && providers.length === 0) {
        return items;
      }

      return filterMovies(items, {
        query: "",
        genres: movieGenres,
        providers,
      });
    },
  });

  if (loading) {
    return <p className="mt-12 text-center">Loading…</p>;
  }

  if (error) {
    return <p className="mt-12 text-center text-red-500">{error}</p>;
  }

  return (
    <div>
      {itemsToShow.length > 0 ? (
        <>
          <MediaGrid
            items={itemsToShow}
            onMore={(item) => {
              // TODO: open modal here
              console.log("More clicked:", item);
            }}
          />

          <MediaPagination
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
          />
        </>
      ) : (
        <p className="mt-12 text-center text-muted-foreground">Nothing found</p>
      )}
    </div>
  );
};

export default AtHomePage;
