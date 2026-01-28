import { type IMovieMediaProps, MediaType, type IPodcastProps } from "../../types/media";

export const mockMovies: IMovieMediaProps[] = [
  {
    id: "movie-1",
    type: MediaType.Movie,
    title: "Dune: Part Two",
    year: 2024,
    genres: ["Sci-Fi", "Adventure"],
    image: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    description:
      "Paul Atreides unites with the Fremen while seeking revenge against the conspirators who destroyed his family.",
    providers: ["Netflix", "Amazon Prime"],
  },
  {
    id: "movie-2",
    type: MediaType.Movie,
    title: "Oppenheimer",
    year: 2023,
    genres: ["Drama", "History"],
    image: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
    description:
      "The story of J. Robert Oppenheimer and the development of the atomic bomb.",
  },
  {
    id: "movie-3",
    type: MediaType.Movie,
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    genres: ["Animation", "Action"],
    image: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    description:
      "Miles Morales returns for the next chapter of the Spider-Verse saga.",
  },
];

export const mockPodcasts: IPodcastProps[] = [
  {
    id: "podcast-1",
    type: MediaType.Podcast,
    title: "The Lex Fridman Podcast",
    publisher: "Lex Fridman",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=800",
    description:
      "Conversations about science, technology, history, philosophy, and the nature of intelligence.",
  },
  {
    id: "podcast-2",
    type: MediaType.Podcast,
    title: "The Daily",
    publisher: "The New York Times",
    category: "News",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800",
    description:
      "This is what the news should sound like. Twenty minutes a day, five days a week.",
  },
  {
    id: "podcast-3",
    type: MediaType.Podcast,
    title: "Darknet Diaries",
    publisher: "Jack Rhysider",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800",
    description: "True stories from the dark side of the internet.",
  },
];
