import {
  usePopularMovies,
  useNowPlayingMovies,
  useMovieVideos,
} from '@/hooks/useMovies';

import MovieCard from '@/components/MovieCard';
import TrailerModal from '@/components/TrailerModal';

import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

type OutletContextType = {
  search?: string;
};

export default function HomePage() {
  // ambil search dari Layout
  const outletContext = useOutletContext<OutletContextType>();
  const search = outletContext?.search || '';

  const navigate = useNavigate();

  const { data: popular, isLoading } = usePopularMovies();
  const { data: nowPlaying } = useNowPlayingMovies();

  const trendingRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const movies = popular?.results ?? [];

  const filteredPopularMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredNowPlayingMovies = (nowPlaying?.results ?? []).filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  // ambil movie pertama buat hero banner
  const heroMovie = filteredPopularMovies[0];

  const { data: videos } = useMovieVideos(selectedMovieId || 0);

  const trailer = videos?.results?.find(
    (video: any) => video.site === 'YouTube' && video.type === 'Trailer'
  );

  const checkScrollPosition = () => {
    const el = trendingRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
  };

  useEffect(() => {
    checkScrollPosition();
  }, [popular]);

  const scrollTrending = (direction: 'left' | 'right') => {
    const el = trendingRef.current;
    if (!el) return;

    el.scrollBy({
      left: direction === 'right' ? 320 : -320,
      behavior: 'smooth',
    });

    setTimeout(checkScrollPosition, 300);
  };

  const handleWatchTrailer = (movieId: number) => {
    setSelectedMovieId(movieId);
    setIsTrailerOpen(true);
  };

  if (isLoading) {
    return (
      <div className='p-8 text-white bg-black min-h-screen'>Loading...</div>
    );
  }

  return (
    <div className='text-white bg-black min-h-screen'>
      {/* Hero Banner */}
      {heroMovie && (
        <section className='relative h-[72vh] min-h-[520px] md:h-[80vh] md:min-h-[600px] w-full overflow-hidden z-0'>
          {/* Background */}
          <img
            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
            alt={heroMovie.title}
            className='absolute inset-0 w-full h-full object-cover md:object-cover object-[70%_center] md:object-center'
          />

          {/* Overlay */}
          <div className='absolute inset-0 z-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent' />
          <div className='absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black/30' />

          {/* Content */}
          <div className='relative z-10 mx-auto max-w-7xl px-4 md:px-8 lg:px-10 h-full flex items-center'>
            <div className='max-w-xl'>
              <h1 className='text-4xl md:text-6xl font-bold mb-5'>
                {heroMovie.title}
              </h1>

              <p className='text-gray-300 text-sm md:text-base leading-relaxed mb-8 line-clamp-3'>
                {heroMovie.overview}
              </p>

              <div className='flex gap-4'>
                <button
                  onClick={() => handleWatchTrailer(heroMovie.id)}
                  className='flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-medium transition'
                >
                  <Play size={18} fill='white' />
                  Watch Trailer
                </button>

                <button
                  onClick={() => navigate(`/movie/${heroMovie.id}`)}
                  className='border border-white/30 hover:bg-white/10 px-6 py-3 rounded-full transition'
                >
                  See Detail
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className='mx-auto max-w-7xl px-4 md:px-8 lg:px-10 py-10'>
        {/* Trending */}
        <section className='mb-14'>
          <h2 className='font-bold text-2xl mb-6'>Trending Now</h2>

          <div className='relative'>
            {canScrollLeft && (
              <button
                onClick={() => scrollTrending('left')}
                className='absolute left-2 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-[#0A0D12CC] hover:bg-gray-700 flex items-center justify-center'
              >
                <ChevronLeft size={20} />
              </button>
            )}

            {canScrollRight && (
              <button
                onClick={() => scrollTrending('right')}
                className='absolute right-2 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-[#0A0D12CC] hover:bg-gray-700 flex items-center justify-center'
              >
                <ChevronRight size={20} />
              </button>
            )}

            <div
              ref={trendingRef}
              onScroll={checkScrollPosition}
              className='flex gap-4 overflow-x-auto scrollbar-hide px-12'
            >
              {filteredPopularMovies.map((movie) => (
                <div key={movie.id} className='shrink-0 w-[173px] md:w-[216px]'>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New Release */}
        <section>
          <h2 className='font-bold mt-10 mb-10 text-2xl'>New Release</h2>

          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5'>
            {filteredNowPlayingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>

      <TrailerModal
        isOpen={isTrailerOpen}
        videoKey={trailer?.key}
        title={heroMovie?.title}
        onClose={() => setIsTrailerOpen(false)}
      />
    </div>
  );
}
