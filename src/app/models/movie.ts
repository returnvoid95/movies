export type Rating = {
  kp: number | null;
  //imdb and other
}

export type Poster = {
  url: string | null;
  previewUrl: string | null;
}

export type Movie = {
  id: string | null;
  name: string | null;
  rating: Rating;
  shortDescription: string | null;
  poster: Poster;
}

export type MoviesResponse = {
  docs: Movie[];
}
