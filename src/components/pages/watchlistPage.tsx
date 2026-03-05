import { useEffect } from "react";
// import MediaCarousel from "../media/mediaCarousel";
import { useWatchlist } from "../../store/watchlistStore";
import { usePageHeader } from "../../context/PageHeaderContect";
import {
  useFilterActions,
  useMovieGenres,
  usePodcastCategories,
  useProviders,
} from "../../store/filterStore";
import { MediaType } from "../../types/media";
// import { useFilteredMedia } from "../../hooks/filteredMedia";

const WatchListPage = () => {
  const items = useWatchlist();
  // const { setTitle, query, setFilterType } = usePageHeader();
  const movieGenres = useMovieGenres();
  const providers = useProviders();
  const podcastCategories = usePodcastCategories();

  const { clearAll } = useFilterActions();

  // useEffect(() => {
  //   setTitle("Your Watchlist");
  //   setFilterType("both");
  //   clearAll();
  // }, [setTitle, setFilterType, clearAll]);



  // const itemsToShow = useFilteredMedia({
  //   items,
  //   query,
  //   filterFn: () => {
  //     const hasMovieFilters = movieGenres.length > 0 || providers.length > 0;
  //     const hasPodcastFilters = podcastCategories.length > 0;

  //     if (!hasMovieFilters && !hasPodcastFilters) {
  //       return items;
  //     }

  //     const movies = items.filter((i) => i.type === MediaType.Movie);
  //     const podcasts = items.filter((i) => i.type === MediaType.Podcast);

  //     const filteredMovies = hasMovieFilters
  //       ? filterMovies(movies, {
  //           query: "",
  //           genres: movieGenres,
  //           providers,
  //         })
  //       : [];

  //     const filteredPodcasts = hasPodcastFilters
  //       ? podcasts.filter((p) => podcastCategories.includes(p.category))
  //       : [];

  //     return [...filteredMovies, ...filteredPodcasts];
  //   },
  // });

  // if (items.length === 0) {
  //   return (
  //     <div className="py-20 text-center text-muted-foreground">
  //       Your watchlist is empty
  //     </div>
  //   );
  // }

  return (
    <div>
      {/* {itemsToShow.length > 0 ? (
        // <MediaCarousel items={itemsToShow} />
        <></>
      ) : ( */}
        <p className="mt-12 text-center text-muted-foreground">Nothing found</p>
      {/* )} */}
    </div>
  );
};

export default WatchListPage;
