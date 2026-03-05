import { useEffect, useState } from "react";
import { usePageHeader } from "../../context/PageHeaderContect";
import { filterMovies } from "../../lib/filterMedia";
import { useMovieGenres, useProviders, useFilterActions } from "../../store/filterStore";
import { useFilteredMedia } from "../../hooks/filteredMedia";
import { useNowPlayingMovies } from "@/hooks/nowPlayingMovies";
import { MediaGrid } from "../media/mediaGrid";
import { MediaPagination } from "../media/mediaPagination";

const CinemaPage = () => {
  const { setTitle, query, setFilterType } = usePageHeader();

  const movieGenres = useMovieGenres();
  const providers = useProviders();
  const { clearAll } = useFilterActions();
  const [page, setPage] = useState(1);
  const { movies, loading, error, totalPages } = useNowPlayingMovies(page);

  useEffect(() => {
    setTitle("Find something to watch in the cinema");
    setFilterType("movie");
    clearAll(); // reset filters when entering cinema
  }, [setTitle, setFilterType, clearAll]);

  const itemsToShow = useFilteredMedia({
    items: movies,
    query,
    filterFn: () => {
      if (movieGenres.length === 0 && providers.length === 0) {
        return movies;
      }

      return filterMovies(movies, {
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
    <div className="flex flex-col gap-6">
      {itemsToShow.length > 0 ? (
        <>
          <MediaGrid
            items={itemsToShow}
            onMore={(media) => {
              // TODO: open dialog/modal here
              console.log("More info:", media);
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

export default CinemaPage;
