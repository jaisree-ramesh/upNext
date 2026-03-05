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

const LayoutInner = () => {
  const { title, query, setQuery, filterType } = usePageHeader();

  const loadMovieGenres = useGenreStore((s) => s.loadMovieGenres);

  useEffect(() => {
    loadMovieGenres();
  }, [loadMovieGenres]);


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
            {filterType === "movie" && <FilterPanel type="movie" />}
            {filterType === "podcast" && <FilterPanel type="podcast" />}
            {filterType === "both" && (
              <>
                <FilterPanel type="movie" />
                <div className="mt-5">
                  <FilterPanel type="podcast" />
                </div>
              </>
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
