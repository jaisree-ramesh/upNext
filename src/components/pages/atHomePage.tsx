import { useEffect, useState } from "react";
import { usePageHeader } from "../../context/PageHeaderContect";
import {
  useFilterActions,
  useMovieGenres,
  useProviders,
  useTvGenres,
} from "../../store/filterStore";
import { useStreamingMedia } from "@/hooks/streamingMedia";
import MediaGrid from "../media/mediaGrid";
import MediaPagination from "../media/mediaPagination";
import MediaDetailsDialog from "../media/mediaDetailsDialog";
import { MediaType, type IStreamingMedia } from "@/types/media";
import GridSkeleton from "../media/gridSkeleton";
import { ShimmerButton } from "../ui/shimmer-button";
import EmptyState from "../media/emptyState";

const AtHomePage = () => {
  const { setTitle, query, setFilterType, streamingKind, setStreamingKind } =
    usePageHeader();

  const movieGenres = useMovieGenres();
  const tvGenres = useTvGenres();

  const providers = useProviders();
  const { clearAll } = useFilterActions();

  const [page, setPage] = useState(1);

  const activeGenres = streamingKind === "movie" ? movieGenres : tvGenres;

  const [selected, setSelected] = useState<IStreamingMedia | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { items, loading, error, totalPages } = useStreamingMedia({
    page,
    section: MediaType.Streaming,
    kind: streamingKind,
    language: "de",
    query,
    genres: activeGenres,
    providers,
  });

  useEffect(() => {
    setTitle("Find something to watch at home");
    setFilterType(MediaType.Streaming);
    clearAll();
  }, [setTitle, setFilterType, clearAll]);

  useEffect(() => {
    setPage(1);
  }, [query, activeGenres.join(","), providers.join(","), streamingKind]);

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
      <div className="flex  ml-9 mr-2 mt-5">
        <ShimmerButton
          background={` ${streamingKind === "movie" ? "black" : "white"}`}
          className={` ${streamingKind === "movie" ? "text-white" : "!text-black"}`}
          onClick={() => setStreamingKind("movie")}
          borderRadius="7px"
        >
          Movies
        </ShimmerButton>
        <ShimmerButton
          background={` ${streamingKind === "tv" ? "black" : "white"}`}
          className={` ${streamingKind === "tv" ? "text-white" : "!text-black"}`}
          onClick={() => setStreamingKind("tv")}
          borderRadius="7px"
        >
          TV Shows
        </ShimmerButton>
      </div>

      {items.length > 0 ? (
        <>
          <MediaGrid
            items={items}
            onMore={(media) => {
              setSelected(media);
              setDialogOpen(true);
            }}
          />

          <MediaPagination
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
          />

          <MediaDetailsDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            media={selected}
          />
        </>
      ) : (
        // <p className="mt-12 text-center text-muted-foreground">Nothing found</p>
        <EmptyState />
      )}
    </div>
  );
};

export default AtHomePage;
