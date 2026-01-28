import { useEffect } from "react";
import { usePageHeader } from "../../context/PageHeaderContect";
import MediaCarousel from "../media/mediaCarousel";
import { mockMovies } from "../mock/media";
import {
  useFilterActions,
  useMovieGenres,
  useProviders,
} from "../../store/filterStore";
import { filterMovies } from "../../lib/filterMedia";
import { useFilteredMedia } from "../../hooks/filteredMedia";

const AtHomePage = () => {
  const { setTitle, query, setFilterType } = usePageHeader();
  const movieGenres = useMovieGenres();
  const providers = useProviders();
  const { clearAll } = useFilterActions();

  useEffect(() => {
    setTitle("Find something to watch at home");
    setFilterType("movie");
    clearAll();
  }, [setTitle, setFilterType, clearAll]);

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

export default AtHomePage;
