import { useEffect, useState } from "react";
import { getCinemaMovies } from "@/api/cinema";
import { MediaType, type ICinemaMovie } from "@/types/media";
import { getMovieProviders } from "@/api/providers";
import { useProviderStore } from "@/store/providerStore";
import type { IMediaQuery } from "@/types/mediaQuery";
import { useAgeRatingStore } from "@/store/ageRatingStore";
import { getMovieAgeRating } from "@/api/ageRatings";

export function useCinemaMedia(props: IMediaQuery) {
  const [movies, setMovies] = useState<ICinemaMovie[]>([]);
  // const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const providersByMovieId = useProviderStore((s) => s.providersByMovieId);
  const setProviders = useProviderStore((s) => s.setProviders);

  const ratings = useAgeRatingStore((s) => s.ratings);
  const setRating = useAgeRatingStore((s) => s.setRating);

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);

        const { results } = await getCinemaMovies({
          page: props.page,
          section: MediaType.Cinema,
          language: props.language || "de",
          query: props.query,
          genres: props.genres || [],
          providers: props.providers || [],
        });

        // setTotalPages(totalPages);

        let filteredResults = results;

        // genre filter
        if (props.genres && props.genres.length > 0) {
          filteredResults = filteredResults.filter((movie) =>
            movie.genres.some((genre) => props.genres!.includes(genre)),
          );
        }

        const enriched = await Promise.all(
          filteredResults.map(async (movie) => {
            let providers = providersByMovieId[movie.id];

            if (!providers) {
              const rawProviders = await getMovieProviders(movie.id);

              providers = rawProviders.map((p) => ({
                id: p.provider_id,
                name: p.provider_name,
                logo: `https://image.tmdb.org/t/p/w92${p.logo_path}`,
              }));

              setProviders(movie.id, providers);
            }

            //  Remove movies already available on streaming
            if (providers.length > 0) {
              return null;
            }

            let ageRating: string | null = ratings[movie.id];

            if (!ageRating) {
              ageRating = await getMovieAgeRating(movie.id);
              setRating(movie.id, ageRating);
            }

            return {
              ...movie,
              providers,
              ageRating,
            };
          }),
        );

        // remove nulls
        const cleaned = enriched.filter(
          (movie): movie is ICinemaMovie => movie !== null,
        );

        setMovies(cleaned);
      } catch (e) {
        console.error(e);
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [
    props.page,
    props.section,
    props.language,
    props.query,
    props.genres?.join(","),
    props.providers?.join(","),
  ]);

  return { movies, loading, error };
}
