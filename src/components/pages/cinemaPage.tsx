import { useEffect } from "react";
import { usePageHeader } from "../../context/PageHeaderContect";
import MediaCarousel from "../media/mediaCarousel";
import { mockMovies } from "../mock/media";
import { filterMovies } from "../../lib/filterMedia";
import { useMovieGenres, useProviders, useFilterActions } from "../../store/filterStore";
import { useFilteredMedia } from "../../hooks/filteredMedia";

const CinemaPage = () => {
  const { setTitle, query, setFilterType } = usePageHeader();

  const movieGenres = useMovieGenres();
  const providers = useProviders();
  const { clearAll } = useFilterActions();

  useEffect(() => {
    setTitle("Find something to watch in the cinema");
    setFilterType("movie");
    clearAll(); // reset filters when entering cinema
  }, [setTitle, setFilterType, clearAll]);

  // const itemsToShow = useMemo(() => {
  //   // 1️ Search wins
  //   if (query.trim()) {
  //     return searchByTitle([...mockMovies, ...mockPodcasts], query);
  //   }

  //   // 2️ Filters
  //   if (movieGenres.length > 0 || providers.length > 0) {
  //     return filterMovies(mockMovies, {
  //       query: "",
  //       genres: movieGenres,
  //       providers,
  //     });
  //   }

  //   // 3️ Default
  //   return mockMovies;
  // }, [query, movieGenres, providers]);

   const itemsToShow = useFilteredMedia({
     items: mockMovies,
     query,
     filterFn: () => {
       if (movieGenres.length === 0 && providers.length === 0) {
         return mockMovies;
       }

       return filterMovies(mockMovies, {
         query: "",
         genres: movieGenres,
         providers,
       });
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

export default CinemaPage;