import {
  MediaType,
  type IMovieMediaProps,
  type IPodcastProps,
  type ITvMediaProps,
} from "../../types/media";
import { Card, CardContent } from "../../components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { Bookmark } from "lucide-react";
import { BorderBeam } from "../ui/border-beam";
import { useWatchlist, useWatchlistActions } from "../../store/watchlistStore";

interface IMediaCardProps {
  media: IMovieMediaProps | IPodcastProps | ITvMediaProps;
  onDetails?: (media: IMovieMediaProps | IPodcastProps ) => void;
}

const MediaCard = (props: IMediaCardProps) => {
  const { toggle } = useWatchlistActions();
  const items = useWatchlist();
  const isSaved = items.some((i) => i.id === props.media.id);

  return (
    <Card className="relative w-full max-w-5xl border-none p-0 shadow-xl mx-auto overflow-hidden">
      <CardContent className="flex flex-row gap-5 p-4 ">
        {/* Poster */}
        <div className="relative flex-shrink-0 w-[160px] md:w-[220px] lg:w-[260px]">
          <img
            src={props.media.image}
            alt={props.media.title}
            className="h-80 md:h-96 w-full rounded-md object-contain"
          />
        </div>

        {/* Title + actions */}

        <div className="flex flex-col h-full gap-4 p-4 ">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-3xl font-semibold leading-tight">
              {props.media.title}
            </h2>
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
            </div>
          </div>

          <div>
            {props.media.type === MediaType.Movie && (
              <p className="text-lg text-muted-foreground">
                {props.media.year} • {props.media.genres.slice(0, 2).join(", ")}
              </p>
            )}

            {props.media.type === MediaType.Podcast && (
              <p className="text-lg text-muted-foreground">
                {props.media.category} • {props.media.publisher}
              </p>
            )}
          </div>

          <div>
            {props.media.description && (
              <p className="text-lg p-3">{props.media.description}</p>
            )}
          </div>
          <div>
            {/* Providers */}
            {props.media.providers && props.media.providers.length > 0  && (
                <div className="flex flex-wrap items-center gap-2 pt-3">
                  {props.media.providers.map((provider) => (
                    <img
                      key={provider.id}
                      src={provider.logo}
                      alt={provider.name}
                      title={provider.name}
                      className="h-10 w-10 rounded-md bg-white p-1 shadow"
                    />
                  ))}
                </div>
              )}
          </div>
        </div>
        {/* Meta */}
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
