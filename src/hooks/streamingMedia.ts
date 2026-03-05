import { useEffect, useState } from "react";
import type { IMovieMediaProps, ITvMediaProps } from "@/types/media";
import {
  getMovieProviders,
  getPopularTvShows,
  getTvProviders,
} from "@/api/providers";
import { useProviderStore } from "@/store/providerStore";
import { getStreamingMovies } from "@/api/streamingMovies";

type MediaItem = IMovieMediaProps | ITvMediaProps;

export function useStreamingMedia(page: number) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const providersById = useProviderStore((s) => s.providersByMovieId);
  const setProviders = useProviderStore((s) => s.setProviders);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        // 1️⃣ Fetch movies + TV in parallel (both paginated)
        const [movieRes, tvRes] = await Promise.all([
          getStreamingMovies(page),
          getPopularTvShows(page),
        ]);

        const combined: MediaItem[] = [...movieRes.results, ...tvRes.results];

        // total pages = min of both (to stay in sync)
        setTotalPages(Math.min(movieRes.totalPages, tvRes.totalPages));

        // 2️⃣ Enrich with providers (cached)
        const enriched = await Promise.all(
          combined.map(async (item) => {
            let providers = providersById[item.id];

            if (!providers) {
              const rawProviders =
                item.type === "movie"
                  ? await getMovieProviders(item.id)
                  : await getTvProviders(item.id);

              providers = rawProviders.map((p) => ({
                id: p.provider_id,
                name: p.provider_name,
                logo: `https://image.tmdb.org/t/p/w92${p.logo_path}`,
              }));

              setProviders(item.id, providers);
            }

            return {
              ...item,
              providers,
            };
          }),
        );

        // 3️⃣ Only keep items that actually have providers (streaming only)
        const onlyStreaming = enriched.filter(
          (i) => i.providers && i.providers.length > 0,
        );

        setItems(onlyStreaming);
      } catch (e) {
        console.error(e);
        setError("Failed to load streaming content");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [page, setProviders]); // ❗ no providersById here to avoid loops

  return { items, loading, error, totalPages };
}
