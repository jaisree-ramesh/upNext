import {
  MediaType,
  type IMovieMediaProps,
  type IPodcastProps,
} from "../../types/media";
import { Card, CardContent } from "../../components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { Bookmark, Info } from "lucide-react";
import { BorderBeam } from "../ui/border-beam";
import { useWatchlist, useWatchlistActions } from "../../store/watchlistStore";

interface IMediaCardProps {
  media: IMovieMediaProps | IPodcastProps;
  onDetails?: (media: IMovieMediaProps | IPodcastProps) => void;
}

const MediaCard = (props: IMediaCardProps) => {
  const { toggle } = useWatchlistActions();
  const items = useWatchlist();
  const isSaved = items.some((i) => i.id === props.media.id);

  return (
    <Card className="relative w-full max-w-5xl border-none p-0 shadow-xl mx-auto overflow-hidden">
      <CardContent className="flex flex-col gap-4 p-4">
        {/* Poster */}
        <div className="relative">
          <img
            src={props.media.image}
            alt={props.media.title}
            className="h-80 md:h-96 w-full rounded-md object-cover"
          />
        </div>

        {/* Title + actions */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-tight">
            {props.media.title}
          </h3>

          <div className="flex shrink-0 gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => toggle(props.media)}
                  aria-label={
                    isSaved ? "Remove from watchlist" : "Add to watchlist"
                  }
                  className="rounded-full p-1 hover:bg-muted transition"
                >
                  <Bookmark
                    className={`h-5 w-5 transition ${
                      isSaved
                        ? "fill-current text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>Add to watchlist</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => props.onDetails?.(props.media)}
                  aria-label="View details"
                  className="rounded-full p-1 hover:bg-muted"
                >
                  <Info className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>View details</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Meta */}
        {props.media.type === MediaType.Movie && (
          <p className="text-sm text-muted-foreground">
            {props.media.year} • {props.media.genres.slice(0, 2).join(", ")}
          </p>
        )}

        {props.media.type === MediaType.Podcast && (
          <p className="text-sm text-muted-foreground">
            {props.media.category} • {props.media.publisher}
          </p>
        )}
      </CardContent>
      {/* Border Beams */}
      <BorderBeam
        duration={6}
        size={400}
        className="from-transparent via-red-500 to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={400}
        borderWidth={2}
        className="from-transparent via-blue-500 to-transparent"
      />
    </Card>
  );
};
export default MediaCard;
