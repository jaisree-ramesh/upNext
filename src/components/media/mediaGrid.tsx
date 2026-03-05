import { MediaGridCard } from "./mediaGridCard";
import { useWatchlist, useWatchlistActions } from "@/store/watchlistStore";

export function MediaGrid({
  items,
  onMore,
}: {
  items: any[];
  onMore: (m: any) => void;
}) {
  const saved = useWatchlist();
  const { toggle } = useWatchlistActions();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-9 mr-2 mt-5">
      {items.map((item) => (
        <MediaGridCard
          key={item.id}
          media={item}
          onMore={onMore}
          onToggleBookmark={toggle}
          isSaved={saved.some((s) => s.id === item.id)}
        />
      ))}
    </div>
  );
}
