import CategorySelector from "../general/categorySelector";
import { mockMovies, mockPodcasts } from "../mock/media";
import { useEffect } from "react";
import MediaCarousel from "../media/mediaCarousel";
import { usePageHeader } from "../../context/PageHeaderContect";
import {
  useFilterActions,
  useMovieGenres,
  usePodcastCategories,
  useProviders,
} from "../../store/filterStore";
import { filterMovies } from "../../lib/filterMedia";
import { useFilteredMedia } from "../../hooks/filteredMedia";

const HomePage = () => {
  const { setTitle, query, setFilterType } = usePageHeader();
  const movieGenres = useMovieGenres();
  const providers = useProviders();
  const podcastCategories = usePodcastCategories();
  const { clearAll } = useFilterActions();

  useEffect(() => {
    setTitle("So… what are we watching today?");
    setFilterType("both");
    clearAll();
  }, [setTitle, setFilterType, clearAll]);

  // const itemsToShow = useMemo(() => {
  //   // 1️ Search always wins
  //   if (query.trim()) {
  //     return searchByTitle([...mockMovies, ...mockPodcasts], query);
  //   }

  //   const hasMovieFilters = movieGenres.length > 0 || providers.length > 0;
  //   const hasPodcastFilters = podcastCategories.length > 0;

  //   // 2️ No filters → show categories
  //   if (!hasMovieFilters && !hasPodcastFilters) {
  //     return [];
  //   }

  //   // 3️ Apply movie filters
  //   const filteredMovies = hasMovieFilters
  //     ? filterMovies(mockMovies, {
  //         query: "",
  //         genres: movieGenres,
  //         providers,
  //       })
  //     : [];

  //   // 4️ Apply podcast filters
  //   const filteredPodcasts = hasPodcastFilters
  //     ? mockPodcasts.filter((podcast) =>
  //         podcastCategories.includes(podcast.category as any),
  //       )
  //     : [];

  //   return [...filteredMovies, ...filteredPodcasts];
  // }, [query, movieGenres, providers, podcastCategories]);

  const itemsToShow = useFilteredMedia({
    items: [...mockMovies, ...mockPodcasts],
    query,
    filterFn: () => {
      const hasMovieFilters = movieGenres.length > 0 || providers.length > 0;
      const hasPodcastFilters = podcastCategories.length > 0;

      if (!hasMovieFilters && !hasPodcastFilters) {
        return [];
      }

      const filteredMovies = hasMovieFilters
        ? filterMovies(mockMovies, {
            query: "",
            genres: movieGenres,
            providers,
          })
        : [];

      const filteredPodcasts = hasPodcastFilters
        ? mockPodcasts.filter((podcast) =>
            podcastCategories.includes(podcast.category as any),
          )
        : [];

      return [...filteredMovies, ...filteredPodcasts];
    },
  });


  return (
    <>
      {query || itemsToShow.length > 0 ? (
        itemsToShow.length > 0 ? (
          <MediaCarousel items={itemsToShow} />
        ) : (
          <p className="mt-12 text-center text-muted-foreground">
            Nothing found
          </p>
        )
      ) : (
        <CategorySelector />
      )}
    </>
  );
};

export default HomePage;
