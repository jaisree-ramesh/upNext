export const movieGenres = [
  "Action",
  "Comedy",
  "Drama",
  "Sci-Fi",
  "Horror",
  "Animation",
];

export type MovieGenre = (typeof movieGenres)[number];

export const streamingProviders = [
  "Netflix",
  "Prime Video",
  "Disney+",
  "Apple TV",
  "HBO Max",
];

export type StreamingProvider = (typeof streamingProviders)[number];

export const podcastGenres = [
  "Technology",
  "Business",
  "Comedy",
  "True Crime",
  "Health",
  "Education",
];

export type PodcastGenre = (typeof podcastGenres)[number];