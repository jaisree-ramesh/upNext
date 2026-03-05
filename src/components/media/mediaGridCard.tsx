import { Bookmark, Info } from "lucide-react";
import { type IStreamingMedia, type ICinemaMovie } from "@/types/media";
import { BorderBeam } from "../ui/border-beam";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { Card, CardContent } from "../ui/card";

interface IGridCardProps {
  media: IStreamingMedia | ICinemaMovie;
  onMore: (media: IStreamingMedia | ICinemaMovie) => void;
  onToggleBookmark: (media: IStreamingMedia | ICinemaMovie) => void;
  isSaved: boolean;
}

const MediaGridCard = (props: IGridCardProps) => {
  return (
    // <Card className="relative   border-none p-0 shadow overflow-hidden">
    <Card className="group relative border-none p-0 shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="flex flex-col gap-5 p-4 ">
        {/* Poster */}
        <img
          src={props.media.image}
          alt={props.media.title}
          className="w-full aspect-[2/3] object-cover"
        />

        {/* Title + actions */}

        <div className="p-3 flex flex-col gap-2">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-lg font-semibold line-clamp-2">
              {props.media.title}
            </h3>
            <div className="flex shrink-0 gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => props.onToggleBookmark(props.media)}
                    aria-label={
                      props.isSaved
                        ? "Remove from watchlist"
                        : "Add to watchlist"
                    }
                    className="rounded-full p-1 hover:bg-muted transition"
                  >
                    <Bookmark
                      className={`h-5 w-5 transition ${
                        props.isSaved
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
          <p className="text-sm text-muted-foreground line-clamp-1">
            {props.media.genreNames?.slice(0, 2).join(", ")}
          </p>

          {props.media.providers && props.media.providers.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {props.media.providers.slice(0, 3).map((p) => (
                <img
                  key={p.id}
                  src={p.logo}
                  alt={p.name}
                  title={p.name}
                  className="h-8 w-8 rounded bg-white p-0.5"
                />
              ))}
            </div>
          )}

          <button
            onClick={() => props.onMore(props.media)}
            className="mt-2 text-xs text-primary flex items-center gap-1"
          >
            <Info className="h-4 w-4" /> More
          </button>
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
export default MediaGridCard;
