import {
  useMovieDetails,
  useMovieReleaseDates,
  useMovieVideos,
} from '@/hooks/useMovies';

import { useParams } from 'react-router-dom';
import { getImageUrl } from '@/lib/utils';

import TrailerModal from '@/components/TrailerModal';
import { Play } from 'lucide-react';
import { useState } from 'react';

export default function MovieDetailPage() {
  const { id } = useParams();

  const movieId = Number(id);

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const { data, isLoading } = useMovieDetails(movieId);
  const { data: releaseDates } = useMovieReleaseDates(movieId);
  const { data: videos } = useMovieVideos(movieId);

  if (isLoading) return <div>Loading...</div>;

  const cast = data?.credits?.cast?.slice(0, 6) || [];

  const trailer = videos?.results?.find(
    (video: any) => video.site === 'YouTube' && video.type === 'Trailer'
  );

  const usRelease = releaseDates?.results?.find(
    (r: any) => r.iso_3166_1 === 'US'
  );

  const ageLimit = usRelease?.release_dates?.[0]?.certification || 'N/A';

  return (
    <div className='min-h-screen bg-black text-white px-8 py-6'>
      {/* HERO */}
      <div className='relative h-[560px] rounded-2xl overflow-hidden'>
        <img
          src={getImageUrl(data?.backdrop_path)}
          alt={data?.title}
          className='w-full h-full object-cover'
        />

        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent' />

        <div className='absolute bottom-10 left-10 flex gap-8 items-end'>
          {/* POSTER */}
          <img
            src={getImageUrl(data?.poster_path)}
            alt={data?.title}
            className='w-52 rounded-xl shadow-2xl'
          />

          {/* INFO */}
          <div className='flex flex-col justify-end pb-2'>
            <h1 className='text-4xl md:text-5xl font-bold max-w-3xl'>
              {data?.title}
            </h1>

            <p className='text-gray-300 mt-3'>{data?.release_date}</p>

            <div className='flex gap-4 mt-6'>
              <button
                onClick={() => setIsTrailerOpen(true)}
                className='flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full'
              >
                <Play size={18} fill='white' />
                Watch Trailer
              </button>
            </div>

            <div className='flex flex-wrap gap-4 mt-6'>
              {/* rating */}
              <div className='bg-zinc-900/90 border border-zinc-700 rounded-xl px-6 py-4 min-w-[150px]'>
                <p className='text-gray-400 text-sm'>Rating</p>

                <p className='font-semibold text-lg'>
                  {data?.vote_average?.toFixed(1)}/10
                </p>
              </div>

              {/* genre */}
              <div className='bg-zinc-900/90 border border-zinc-700 rounded-xl px-6 py-4 min-w-[150px]'>
                <p className='text-gray-400 text-sm'>Genre</p>

                <p className='font-semibold text-lg'>
                  {data?.genres?.[0]?.name}
                </p>
              </div>

              {/* age */}
              <div className='bg-zinc-900/90 border border-zinc-700 rounded-xl px-6 py-4 min-w-[150px]'>
                <p className='text-gray-400 text-sm'>Age Limit</p>

                <p className='font-semibold text-lg'>{ageLimit}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OVERVIEW */}
      <div className='mt-12 max-w-5xl'>
        <h2 className='text-2xl font-bold mb-4'>Overview</h2>

        <p className='text-gray-300 leading-8'>{data?.overview}</p>
      </div>

      {/* CAST */}
      <div className='mt-12 pb-16'>
        <h2 className='text-2xl font-bold mb-8'>Cast & Crew</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {cast.map((person: any) => (
            <div
              key={person.id}
              className='flex items-center gap-4 bg-zinc-900/40 rounded-xl p-4'
            >
              <img
                src={getImageUrl(person.profile_path)}
                alt={person.name}
                className='w-16 h-16 rounded-lg object-cover'
              />

              <div>
                <p className='font-medium'>{person.name}</p>

                <p className='text-sm text-gray-400'>{person.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TrailerModal
        isOpen={isTrailerOpen}
        videoKey={trailer?.key}
        title={data?.title}
        onClose={() => setIsTrailerOpen(false)}
      />
    </div>
  );
}
