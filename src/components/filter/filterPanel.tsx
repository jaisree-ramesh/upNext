import {
  movieGenres,
  podcastGenres,
  streamingProviders,
} from "../../types/filterTypes";
import type { MediaType } from "../../types/media";
import { cn } from "@/lib/utils";
import {
  useFilterActions,
  usePodcastCategories,
  useProviders,
  useMovieGenres,
} from "../../store/filterStore";
import { Button } from "../ui/button";
import { usePageHeader } from "../../context/PageHeaderContect";

interface IFilterPanelProps {
  type: MediaType;
}
const FilterPanel = (props: IFilterPanelProps) => {
  const movieCategories = useMovieGenres();
  const providers = useProviders();
  const { clearQuery, query } = usePageHeader();
  const podcastCategories = usePodcastCategories();
  const {
    toggleMovieGenre,
    toggleProvider,
    togglePodcastCategory,
    clearMovies,
    clearPodcasts,
    clearAll,
  } = useFilterActions();

  const hasMovieFilters = movieGenres.length > 0 || providers.length > 0;

  const hasPodcastFilters = podcastCategories.length > 0;

  const hasAnyFilters = hasMovieFilters || hasPodcastFilters;

  const isSearching = query.trim().length > 0;

  const handleClear = () => {
    clearQuery();
    if (props.type === "movie") clearMovies();
    else if (props.type === "podcast") clearPodcasts();
    else clearAll();
  };

  return (
    <div className="relative mt-5">
      <span
        className={cn(
          "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px] rounded-md",
        )}
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box",
        }}
      />

      <div className="p-4 relative z-10 h-full flex-1 border-none bg-transparent  focus-visible:ring-0 placeholder:text-muted-foreground">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="mb-4 text-lg font-semibold uppercase text-muted-foreground">
            Filters
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            disabled={!hasAnyFilters}
            className="text-xs"
          >
            Clear
          </Button>
        </div>

        {isSearching && (
          <p className="mb-4 text-xs text-muted-foreground">
            Clear search to use filters
          </p>
        )}

        {props.type === "movie" && (
          <>
            <div className="mb-6">
              <p className="mb-2 text-md font-medium">Genres</p>
              <div className="flex flex-wrap gap-2">
                {movieGenres.map((genre) => {
                  const isActive = movieCategories.includes(genre);
                  return (
                    <button
                      key={genre}
                      onClick={() => toggleMovieGenre(genre)}
                      // className="rounded-full border px-3 py-1 text-md transition hover:bg-muted"
                      className={`rounded-full border px-3 py-1 text-md transition ${isActive ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"}`}
                    >
                      {genre}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2 text-md font-medium">Streaming Services</p>
              <div className="space-y-2">
                {streamingProviders.map((provider) => {
                  const checked = providers.includes(provider);

                  return (
                    <label
                      key={provider}
                      className="flex cursor-pointer items-center gap-2 text-md"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleProvider(provider)}
                      />
                      {provider}
                    </label>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {props.type === "podcast" && (
          <div>
            <p className="mb-2 text-md font-medium">Categories</p>
            <div className="flex flex-wrap gap-2">
              {podcastGenres.map((category) => {
                const isActive = podcastCategories.includes(category);

                return (
                  <button
                    key={category}
                    onClick={() => togglePodcastCategory(category)}
                    // className="rounded-full border px-3 py-1 text-md transition hover:bg-muted"
                    className={cn(
                      "rounded-full border px-3 py-1 text-sm transition",
                      isActive
                        ? "bg-primary text-primary-foreground border-primary"
                        : "hover:bg-muted",
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
