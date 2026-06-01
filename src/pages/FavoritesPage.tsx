import MovieCard from '@/components/MovieCard';

import { useMovieStore } from '@/store/movieStore';

export default function FavoritesPage() {
  const favorites = useMovieStore((state) => state.favorites);

  return (
    <section
      className='
        mx-auto
        max-w-7xl
        px-4
        md:px-8
        py-10
      '
    >
      <h1
        className='
          text-3xl
          font-bold
          mb-8
        '
      >
        Favorites
      </h1>

      {favorites.length === 0 ? (
        <div
          className='
            text-zinc-400
            text-center
            py-16
          '
        >
          No favorite movies yet.
        </div>
      ) : (
        <div
          className='
            grid
            grid-cols-2
            md:grid-cols-4
            gap-6
          '
        >
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
