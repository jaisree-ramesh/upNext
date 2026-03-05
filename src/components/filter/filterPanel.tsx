import { useState } from "react";
import { MediaType } from "../../types/media";
import { cn } from "@/lib/utils";
import {
  useFilterActions,
  usePodcastCategories,
  useProviders,
  useMovieGenres,
  useTvGenres,
} from "../../store/filterStore";
import { Button } from "../ui/button";
import { usePageHeader } from "../../context/PageHeaderContect";
import { useMovieGenreList, useTvGenreList } from "@/store/genreStore";
import { podcastGenres } from "@/types/filterTypes";
import {
  useMovieProviderList,
  useTvProviderList,
} from "@/store/providerListStore";

interface IFilterPanelProps {
  type: MediaType;
  kind?: "movie" | "tv";
}


const POPULAR_PROVIDER_NAMES = [
  "Netflix",
  "Amazon Prime Video",
  "Disney Plus",
  "Apple TV Plus",
  "Max",
  "WOW",
  "Sky Go",
];

const FilterPanel = (props: IFilterPanelProps) => {
  // Selected filters (IDs)
  const selectedMovieGenres = useMovieGenres();
  const selectedTvGenres = useTvGenres();
  const providers = useProviders();
  const podcastCategories = usePodcastCategories();

  // Available genres from TMDB
  const movieGenreList = useMovieGenreList();
  const tvGenreList = useTvGenreList();

  // Available providers from TMDB
  const movieProviders = useMovieProviderList();
  const tvProviders = useTvProviderList();

  const { clearQuery, query } = usePageHeader();

  const {
    toggleMovieGenre,
    toggleTvGenre,
    toggleProvider,
    togglePodcastCategory,
    clearMovies,
    clearTv,
    clearPodcasts,
    clearAll,
  } = useFilterActions();

  const hasMovieFilters = selectedMovieGenres.length > 0;
  const hasTvFilters = selectedTvGenres.length > 0 || providers.length > 0;
  const hasPodcastFilters = podcastCategories.length > 0;
  const hasAnyFilters = hasMovieFilters || hasTvFilters || hasPodcastFilters;

  const isSearching = query.trim().length > 0;

  const handleClear = () => {
    clearQuery();
    if (props.type === MediaType.Cinema) clearMovies();
    else if (props.type === MediaType.Streaming) clearTv();
    else if (props.type === MediaType.Podcast) clearPodcasts();
    else clearAll();
  };

  // Pick correct provider list
  const rawProviderList = props.kind === "tv" ? tvProviders : movieProviders;

  // Show more / less state
  const [showAllProviders, setShowAllProviders] = useState(false);

  const popularProviders = rawProviderList.filter((p) =>
    POPULAR_PROVIDER_NAMES.includes(p.provider_name),
  );

  const otherProviders = rawProviderList.filter(
    (p) => !POPULAR_PROVIDER_NAMES.includes(p.provider_name),
  );

  const providerListToShow = showAllProviders
    ? rawProviderList
    : popularProviders;

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

      <div className="p-4 relative z-10 h-full flex-1 border-none bg-transparent">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="mb-4 text-lg font-semibold uppercase text-muted-foreground">
            {props.type === MediaType.Cinema
              ? "Cinema"
              : props.type === MediaType.Streaming
                ? "Streaming"
                : "Podcast"}{" "}
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

        {/*  CINEMA */}
        {props.type === MediaType.Cinema && (
          <div className="mb-6">
            <p className="mb-2 text-md font-medium">Genres</p>
            <div className="flex flex-wrap gap-2">
              {movieGenreList.map((genre) => {
                const isActive = selectedMovieGenres.includes(genre.id);
                return (
                  <button
                    key={genre.id}
                    onClick={() => toggleMovieGenre(genre.id)}
                    className={`rounded-full border px-3 py-1 text-md transition ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary"
                        : "hover:bg-muted"
                    }`}
                  >
                    {genre.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/*  STREAMING */}
        {props.type === MediaType.Streaming && (
          <>
            <div className="mb-6">
              <p className="mb-2 text-md font-medium">
                {props.kind === "tv" ? "TV Genres" : "Movie Genres"}
              </p>
              <div className="flex flex-wrap gap-2">
                {(props.kind === "tv" ? tvGenreList : movieGenreList).map(
                  (genre) => {
                    const isActive =
                      props.kind === "tv"
                        ? selectedTvGenres.includes(genre.id)
                        : selectedMovieGenres.includes(genre.id);

                    return (
                      <button
                        key={genre.id}
                        onClick={() =>
                          props.kind === "tv"
                            ? toggleTvGenre(genre.id)
                            : toggleMovieGenre(genre.id)
                        }
                        className={`rounded-full border px-3 py-1 text-md transition ${
                          isActive
                            ? "bg-primary text-primary-foreground border-primary"
                            : "hover:bg-muted"
                        }`}
                      >
                        {genre.name}
                      </button>
                    );
                  },
                )}
              </div>
            </div>

            <div>
              <p className="mb-2 text-md font-medium">Streaming Services</p>
              <div className="space-y-2 max-h-64 overflow-auto pr-1">
                {providerListToShow.map((provider) => {
                  const checked = providers.includes(provider.provider_id);
                  return (
                    <label
                      key={provider.provider_id}
                      className="flex cursor-pointer items-center gap-2 text-md"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleProvider(provider.provider_id)}
                      />
                      {provider.provider_name}
                    </label>
                  );
                })}
              </div>

              {otherProviders.length > 0 && (
                <button
                  onClick={() => setShowAllProviders((v) => !v)}
                  className="mt-2 text-sm text-primary hover:underline"
                >
                  {showAllProviders ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          </>
        )}

        {/*  PODCAST */}
        {props.type === MediaType.Podcast && (
          <div>
            <p className="mb-2 text-md font-medium">Categories</p>
            <div className="flex flex-wrap gap-2">
              {podcastGenres.map((category) => {
                const isActive = podcastCategories.includes(category);
                return (
                  <button
                    key={category}
                    onClick={() => togglePodcastCategory(category)}
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
