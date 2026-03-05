import { useWatchlist, useWatchlistActions } from "@/store/watchlistStore";
import {
  type IStreamingMedia,
  type ICinemaMovie,
  type IPodcastProps,
  MediaType,
} from "@/types/media";
import { Bookmark, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface MediaDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  media: IStreamingMedia | IPodcastProps | ICinemaMovie | null;
}

const MediaDetailsDialog = (props: MediaDetailsDialogProps) => {
  const saved = useWatchlist();
  const { toggle } = useWatchlistActions();

  if (!props.media) return null;

  const isSaved = saved.some((s) => s.id === props.media?.id);

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent className="max-w-none w-[60vw] h-[65vh] p-0 overflow-hidden">
        <div className="grid md:grid-cols-[400px_1fr] gap-0">
          {/* Poster */}
          <div className="bg-black">
            <img
              src={props.media.image}
              alt={props.media.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col gap-4">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                <span>{props.media.title}</span>
                <button
                  onClick={() => toggle(props.media!)}
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
                
              </DialogTitle>
            </DialogHeader>

            {/* Meta */}

            <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
              {"rating" in props.media && props.media.rating && (
                <span className="flex items-center gap-1 text-yellow-500 font-medium">
                  <Star className="h-4 w-4 fill-yellow-400" />{" "}
                  {props.media.rating.toFixed(1)}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
              <span className="p-1 border rounded">
                {(props.media.section === MediaType.Cinema ||
                  props.media.section === MediaType.Streaming) &&
                  props.media.ageRating &&
                  props.media.ageRating}
              </span>
              <span>
                {(props.media.section === MediaType.Cinema ||
                  props.media.section === MediaType.Streaming) &&
                  props.media.orginalLanguage?.toUpperCase()}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
              <span>{props.media.year}, </span>
              {(props.media.section === MediaType.Cinema ||
                props.media.section === MediaType.Streaming) &&
                props.media.genres.length > 0 && (
                  <div>{props.media.genres.slice(0, 2).join(", ")}</div>
                )}
            </div>

            {/* Description */}
            {props.media.description && (
              <p className="text-md leading-relaxed text-muted-foreground">
                {props.media.description}
              </p>
            )}

            {/* Providers */}
            {props.media.section === MediaType.Streaming &&
              props.media.providers && (
                <div>
                  {/* <p className="text-sm font-medium mb-2">Available on</p> */}
                  <div className="flex gap-2 flex-wrap">
                    {props.media.providers.map((p) => (
                      <img
                        key={p.id}
                        src={p.logo}
                        alt={p.name}
                        title={p.name}
                        className="h-10 w-10 rounded bg-white p-1 shadow"
                      />
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaDetailsDialog;
