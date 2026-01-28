import MediaCarousel from "../media/mediaCarousel";
import { mockPodcasts } from "../mock/media";
import { useEffect } from "react";
import { usePageHeader } from "../../context/PageHeaderContect";
import { useFilterActions, usePodcastCategories } from "../../store/filterStore";
import { useFilteredMedia } from "../../hooks/filteredMedia";

const PodcastPage = () => {
  //
  const { setTitle, query, setFilterType } = usePageHeader();
  const podcastCategories = usePodcastCategories();
  const { clearAll } = useFilterActions();

  useEffect(() => {
    setTitle("Find something to listen to");
    setFilterType("podcast");
    clearAll(); // reset when entering podcasts
  }, [setTitle, setFilterType, clearAll]);

  // const itemsToShow = useMemo(() => {
  //   // 1️ Search wins
  //   if (query.trim()) {
  //     return searchByTitle([...mockMovies, ...mockPodcasts], query);
  //   }

  //   // 2️ Podcast filters
  //   if (podcastCategories.length > 0) {
  //     return mockPodcasts.filter((podcast) =>
  //       podcastCategories.includes(podcast.category as any),
  //     );
  //   }

  //   // 3️ Default
  //   return mockPodcasts;
  // }, [query, podcastCategories]);

  const itemsToShow = useFilteredMedia({
    items: mockPodcasts,
    query,
    filterFn: () => {
      if (podcastCategories.length === 0) {
        return mockPodcasts;
      }

      return mockPodcasts.filter((podcast) =>
        podcastCategories.includes(podcast.category as any),
      );
    },
  });

  return (
    <div>
      {itemsToShow.length > 0 ? (
        <MediaCarousel items={itemsToShow} />
      ) : (
        <p className="mt-12 text-center text-muted-foreground">Nothing found</p>
      )}
    </div>
  );
};

export default PodcastPage;
