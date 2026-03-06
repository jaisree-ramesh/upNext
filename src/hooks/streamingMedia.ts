import { useEffect, useState } from "react";
import {
  getMovieProviders,
  getTvProviders,
} from "@/api/providers";
import { useProviderStore } from "@/store/providerStore";
import type { IMediaQuery } from "@/types/mediaQuery";
import { getStreamingMedia } from "@/api/streaming";
import { getMovieAgeRating, getTvAgeRating } from "@/api/ageRatings";
import type { IStreamingMedia } from "@/types/media";
import { useAgeRatingStore } from "@/store/ageRatingStore";
import i18n from "@/i18n";


export function useStreamingMedia(props: IMediaQuery) {
    const lang = i18n.language.startsWith("de") ? "de-DE" : "en-US";
  const [items, setItems] = useState<(IStreamingMedia)[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const providersById = useProviderStore((s) => s.providersByMovieId);
  const setProviders = useProviderStore((s) => s.setProviders);

  const ratings = useAgeRatingStore((s) => s.ratings);
  const setRating = useAgeRatingStore((s) => s.setRating);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const { results, totalPages } = await getStreamingMedia(props);
        setTotalPages(totalPages);

        const enriched = await Promise.all(
          results.map(async (item) => {
            let providers = providersById[item.id];

            if (!providers) {
              const rawProviders =
                item.kind === "movie"
                  ? await getMovieProviders(item.id)
                  : await getTvProviders(item.id);

              providers = rawProviders.map((p: any) => ({
                id: p.provider_id,
                name: p.provider_name,
                logo: `https://image.tmdb.org/t/p/w92${p.logo_path}`,
              }));

              setProviders(item.id, providers);
            }

            let ageRating: string | null = ratings[item.id];
            if (!ageRating) {
              ageRating =
                item.kind === "movie"
                  ? await getMovieAgeRating(item.id)
                  : await getTvAgeRating(item.id);
              setRating(item.id, ageRating);
            }
            return {
              ...item,
              providers,
              ageRating,
            };
          }),
        );

        setItems(enriched);
      } catch (e) {
        console.error(e);
        setError("Failed to load streaming content");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [
    props.page,
    props.kind,
    props.query,
    props.genres?.join(","),
    props.providers?.join(","),
    lang,
  ]);

  return { items, loading, error, totalPages };
}