import { useWatchlist, useWatchlistActions } from "@/store/watchlistStore";
import MediaGridCard from "./mediaGridCard";

interface IMediaGridProps {
  items: any[];
  onMore: (m: any) => void;
}

const MediaGrid = (props: IMediaGridProps) => {
  const saved = useWatchlist();
  const { toggle } = useWatchlistActions();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-9 mr-2 mt-5">
      {props.items.map((item) => (
        <MediaGridCard
          key={item.id}
          media={item}
          onMore={props.onMore}
          onToggleBookmark={toggle}
          isSaved={saved.some((s) => s.id === item.id)}
        />
      ))}
    </div>
  );
};

export default MediaGrid;
