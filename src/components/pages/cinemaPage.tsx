import { useEffect, useState } from "react";
import { usePageHeader } from "../../context/PageHeaderContect";
import {
  useMovieGenres,
  useProviders,
  useFilterActions,
} from "../../store/filterStore";
import { useCinemaMedia } from "@/hooks/cinemaMedia";
import MediaGrid from "../media/mediaGrid";
import { MediaType, type ICinemaMovie } from "@/types/media";
import GridSkeleton from "../media/gridSkeleton";
import EmptyState from "../media/emptyState";
import MediaDetailsDialog from "../media/mediaDetailsDialog";

const CinemaPage = () => {
  const { setTitle, query, setFilterType } = usePageHeader();

  const movieGenres = useMovieGenres();
  const providers = useProviders();
  const { clearAll } = useFilterActions();

  const [selected, setSelected] = useState<ICinemaMovie | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [page, setPage] = useState(1);

  const { movies, loading, error } = useCinemaMedia({
    page,
    section: MediaType.Cinema,
    language: "de",
    query,
    genres: movieGenres,
    providers,
  });

  useEffect(() => {
    setTitle("Find something to watch in the cinema");
    setFilterType(MediaType.Cinema);
    clearAll();
  }, [setTitle, setFilterType, clearAll]);

  // Reset to page 1 when filters/search change
  useEffect(() => {
    setPage(1);
  }, [query, movieGenres.join(","), providers.join(",")]);

  if (loading) {
    return (
      <div className="mt-12 text-center">
        <GridSkeleton />
      </div>
    );
  }

  if (error) {
    return <p className="mt-12 text-center text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {movies.length > 0 ? (
        <>
          <MediaGrid
            items={movies}
            onMore={(media) => {
              setSelected(media);
              setDialogOpen(true);
            }}
          />

          <MediaDetailsDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            media={selected}
          />
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default CinemaPage;
