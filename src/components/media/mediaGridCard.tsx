import { Bookmark, Info } from "lucide-react";
import {
  type IMovieMediaProps,
  type ITvMediaProps,
} from "@/types/media";

type Props = {
  media: IMovieMediaProps | ITvMediaProps;
  onMore: (media: IMovieMediaProps | ITvMediaProps) => void;
  onToggleBookmark: (media: IMovieMediaProps | ITvMediaProps) => void;
  isSaved: boolean;
};

export function MediaGridCard({
  media,
  onMore,
  onToggleBookmark,
  isSaved,
}: Props) {
  return (
    <div className="rounded-lg overflow-hidden shadow bg-card">
      <img
        src={media.image}
        alt={media.title}
        className="w-full aspect-[2/3] object-cover"
      />

      <div className="p-3 flex flex-col gap-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-sm font-semibold line-clamp-2">{media.title}</h3>

          <button onClick={() => onToggleBookmark(media)}>
            <Bookmark
              className={`h-5 w-5 ${
                isSaved ? "fill-primary text-primary" : "text-muted-foreground"
              }`}
            />
          </button>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-1">
          {media.genres.slice(0, 2).join(", ")}
        </p>

        {media.providers && media.providers.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {media.providers.slice(0, 3).map((p) => (
              <img
                key={p.id}
                src={p.logo}
                alt={p.name}
                title={p.name}
                className="h-6 w-6 rounded bg-white p-0.5"
              />
            ))}
          </div>
        )}

        <button
          onClick={() => onMore(media)}
          className="mt-2 text-xs text-primary flex items-center gap-1"
        >
          <Info className="h-4 w-4" /> More
        </button>
      </div>
    </div>
  );
}
