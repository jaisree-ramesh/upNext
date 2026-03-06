import { useEffect, useState } from "react";
import { useWatchlist } from "../../store/watchlistStore";
import { usePageHeader } from "../../context/PageHeaderContect";
import { useFilterActions } from "../../store/filterStore";
import MediaGrid from "../media/mediaGrid";
import type { ICinemaMovie, IStreamingMedia } from "@/types/media";
import EmptyState from "../media/emptyState";
import MediaDetailsDialog from "../media/mediaDetailsDialog";

const WatchListPage = () => {
  const items = useWatchlist();
  const { setTitle, setFilterType } = usePageHeader();
  const { clearAll } = useFilterActions();

  const [selected, setSelected] = useState<
    ICinemaMovie | IStreamingMedia | null
  >(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setTitle("Your Watchlist");
    setFilterType("watchlist"); 
    clearAll();
  }, [setTitle, setFilterType, clearAll]);

  if (items.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="mt-6">
      <MediaGrid
        items={items}
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
    </div>
  );
};

export default WatchListPage;
