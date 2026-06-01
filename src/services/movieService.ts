import api from '@/lib/axios';
import type { IMovieDetails, IMovieResponse } from '@/types/movie';

// TODO: Create service functions to fetch data from TMDB API
// Reference: https://developer.themoviedb.org/reference/intro/getting-started

export const movieService = {
  // TODO: Implement getPopularMovies function
  // Endpoint: GET /movie/popular
  async getPopularMovies(page = 1): Promise<IMovieResponse> {
    const { data } = await api.get('/movie/popular', {
      params: { page },
    });
    return data;
  },

  // TODO: Implement getNowPlayingMovies function
  // Endpoint: GET /movie/now_playing
  async getNowPlayingMovies(page = 1): Promise<IMovieResponse> {
    const { data } = await api.get('/movie/now_playing', {
      params: { page },
    });
    return data;
  },

  // TODO: Implement getMovieDetails function
  // Endpoint: GET /movie/{movie_id}
  async getMovieDetails(id: number): Promise<IMovieDetails> {
    const { data } = await api.get(`/movie/${id}`, {
      params: {
        append_to_response: 'credits,videos,similar',
      },
    });
    return data;
  },

  // TODO: Implement searchMovies function
  // Endpoint: GET /search/movie
  async searchMovies(query: string, page = 1): Promise<IMovieResponse> {
    const { data } = await api.get('/search/movie', {
      params: {
        query,
        page,
      },
    });
    return data;
  },

  // TODO: Add more endpoints as needed
  // Endpoint: GET /movie/{movie_id}/release_dates
  async getMovieReleaseDates(id: number) {
    const { data } = await api.get(`/movie/${id}/release_dates`);

    return data;
  },
};
