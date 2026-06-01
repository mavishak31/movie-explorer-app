import { Heart } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useSearchMovies } from '@/hooks/useMovies';
import { useMovieStore } from '@/store/movieStore';
import notFoundImage from '@/assets/notfound.png';
import type { IMovie } from '@/types/movie';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function SearchPage() {
  const [params] = useSearchParams();

  const query = params.get('query') ?? '';

  const { data, isLoading } = useSearchMovies(query);

  const movies = data?.results ?? [];

  // zustand favorites store
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieStore();

  // handle favorite
  const handleFavorite = (movie: IMovie) => {
    const favorite = isFavorite(movie.id);

    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  if (isLoading) {
    return (
      <div className='bg-black min-h-screen text-white p-8'>Loading...</div>
    );
  }

  return (
    <div className='bg-black text-white min-h-screen py-8'>
      <div className='mx-auto max-w-7xl px-6'>
        {movies.length === 0 ? (
          <div className='flex flex-col items-center justify-center min-h-[70vh] text-center'>
            <img src={notFoundImage} alt='Not found' className='w-48 mb-6' />

            <h2 className='text-xl font-semibold'>Data Not Found</h2>

            <p className='text-gray-400 mt-2'>Try other keywords</p>
          </div>
        ) : (
          <>
            <h1 className='text-3xl font-bold mb-10'>
              Search Results for "{query}"
            </h1>

            <div className='flex flex-col gap-8'>
              {movies.map((movie) => (
                <div key={movie.id} className='flex gap-5 items-start'>
                  {/* poster */}
                  <img
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    className='w-[120px] rounded-xl object-cover'
                  />

                  {/* content */}
                  <div className='flex-1'>
                    <h2 className='text-2xl font-bold mb-2'>{movie.title}</h2>

                    <p className='text-yellow-400 mb-3'>
                      ⭐ {movie.vote_average.toFixed(1)}/10
                    </p>

                    <p className='text-gray-300 line-clamp-3'>
                      {movie.overview}
                    </p>

                    <button className='mt-5 bg-red-700 hover:bg-red-600 px-6 py-3 rounded-full font-semibold'>
                      Watch Trailer
                    </button>
                  </div>

                  {/* favorite */}
                  <button
                    onClick={() => handleFavorite(movie)}
                    className='w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center'
                  >
                    <Heart
                      size={18}
                      fill={isFavorite(movie.id) ? '#ef4444' : 'none'}
                      className='text-red-500'
                    />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
