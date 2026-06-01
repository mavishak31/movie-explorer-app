// TODO: Define TypeScript interfaces for Movie data
// Hint: Check TMDB API documentation for the movie object structure
// https://developer.themoviedb.org/reference/movie-details

export interface IMovie {
  // TODO: Add movie properties based on TMDB API response
  // Examples: id, title, overview, poster_path, etc.
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  vote_average: number;
  release_date: string;
  runtime?: number;
  genres?: IGenre[];
}

export interface IMovieResponse {
  // TODO: Add pagination properties
  // Examples: page, results, total_pages, total_results
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovieDetails extends IMovie {
  credits?: {
    cast: ICast[];
    crew: ICrew[];
  };
  videos?: {
    results: IVideo[];
  };
}

// TODO: Add more types as needed (Genre, Video, etc.)

export interface IGenre {
  id: number;
  name: string;
}

export interface IVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface ICast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface ICrew {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}
