import { useEffect, useState } from "react";
import { getCinemaMovies } from "@/api/cinema";
import type { IMovieMediaProps } from "@/types/media";
import { getMovieProviders } from "@/api/providers";
import { useProviderStore } from "@/store/providerStore";

export function useNowPlayingMovies(page: number) {
  const [movies, setMovies] = useState<IMovieMediaProps[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const providersByMovieId = useProviderStore((s) => s.providersByMovieId);
  const setProviders = useProviderStore((s) => s.setProviders);

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true);
        const { results, totalPages } = await getCinemaMovies(page);
        setTotalPages(totalPages);

        const enriched = await Promise.all(
          results.map(async (movie) => {
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

            return {
              ...movie,
              providers,
            };
          }),
        );

        setMovies(enriched);
      } catch (e) {
        console.error(e);
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, [page]);

  return { movies, loading, error, totalPages };
}
