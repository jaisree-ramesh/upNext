import { Outlet } from "react-router-dom";
import Header from "./header";
import {
  PageHeaderProvider,
  usePageHeader,
} from "../../context/PageHeaderContect";
import PageHeader from "./pageHeader";
import FilterPanel from "../filter/filterPanel";
import { useEffect } from "react";
import { useGenreStore } from "@/store/genreStore";
import { MediaType } from "@/types/media";
import { useProviderListStore } from "@/store/providerListStore";
import HomeInfoPanel from "../pages/homeInfoPanel";

const LayoutInner = () => {
  const { title, query, setQuery, filterType, streamingKind } = usePageHeader();

  // const loadMovieGenres = useGenreStore((s) => s.loadMovieGenres);

  const loadGenres = useGenreStore((s) => s.loadGenres);

  useEffect(() => {
    loadGenres("tv", "de");
  }, [loadGenres]);

  useEffect(() => {
    loadGenres("movie", "de");
  }, [loadGenres]);

  const loadMovieProviders = useProviderListStore((s) => s.loadMovieProviders);
  const loadTvProviders = useProviderListStore((s) => s.loadTvProviders);

  useEffect(() => {
    loadMovieProviders("DE");
    loadTvProviders("DE");
  }, [loadMovieProviders, loadTvProviders]);

  return (
    <div className="min-h-svh flex flex-col">
      <Header />

      <main className="flex-1 px-6 py-4">
        <PageHeader
          title={title}
          searchValue={query}
          onSearchChange={setQuery}
        />

        <div className="grid grid-cols-1 md:grid-cols-[420px_1fr]">
          <aside className="hidden md:block">
            {filterType === MediaType.Home && <HomeInfoPanel />}
            {filterType === MediaType.Cinema && (
              <FilterPanel type={MediaType.Cinema} />
            )}
            {filterType === MediaType.Streaming && (
              <FilterPanel type={MediaType.Streaming} kind={streamingKind} />
            )}

            {filterType === MediaType.Podcast && (
              <FilterPanel type={MediaType.Podcast} />
            )}
          </aside>

          <section>
            <Outlet />
          </section>
        </div>
      </main>
    </div>
  );
};

const AppLayout = () => {
  return (
    <PageHeaderProvider>
      <LayoutInner />
    </PageHeaderProvider>
  );
};

export default AppLayout;
