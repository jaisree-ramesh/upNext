const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export interface TMDBGenre {
  id: number;
  name: string;
}

export async function fetchMovieGenres(): Promise<TMDBGenre[]> {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie genres");
  }

  const data = await res.json();
  return data.genres;
}
