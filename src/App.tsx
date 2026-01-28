import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/general/appLayout";
import HomePage from "./components/pages/homepage";
import AtHomePage from "./components/pages/atHomePage";
import CinemaPage from "./components/pages/cinemaPage";
import PodcastPage from "./components/pages/podcastPage";
import WatchlistPage from "./components/pages/watchlistPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/watch" element={<AtHomePage />} />
          <Route path="/cinema" element={<CinemaPage />} />
          <Route path="/podcasts" element={<PodcastPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
