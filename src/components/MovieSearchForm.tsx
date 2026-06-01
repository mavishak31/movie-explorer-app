import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  movieSearchSchema,
  type MovieSearchFromValues,
} from '@/lib/movieSchema';

type Props = {
  onSubmit: (values: MovieSearchFromValues) => void;
};

export default function MovieSearchForm({ onSubmit }: Props) {
  const { register, handleSubmit } = useForm<MovieSearchFromValues>({
    resolver: zodResolver(movieSearchSchema),
    defaultValues: {
      search: '',
      genre: '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col md:flex-row gap-4 mb-8'
    >
      {/* Search */}
      <input
        {...register('search')}
        placeholder='Search movies...'
        className='flex-1 bg-gray-700 rounded-lg px-4 py-3 text-white'
      />

      {/* Genre */}
      <select
        {...register('genre')}
        className='bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white'
      >
        <option value=''>All Genres</option>
        <option value='Action'>Action</option>
        <option value='Drama'>Drama</option>
        <option value='Animation'>Animation</option>
      </select>

      <button
        type='submit'
        className='bg-red-500 hover:bg-red-700 px-5 py-3 rounded-lg font-medium'
      >
        Search
      </button>
    </form>
  );
}
