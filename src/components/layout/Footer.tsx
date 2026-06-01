import logo from '@/assets/logo-movie.png';

export default function Footer() {
  return (
    <footer className='border-t border-zinc-800 py-6'>
      <div className='mx-auto max-w-7xl px-6 flex items-center justify-between'>
        {/* kiri */}
        <div className='flex items-center gap-2 font-semibold text-xl'>
          <img src={logo} alt='Logo' />
          <span>Movie</span>
        </div>

        {/* kanan */}
        <p className='text-sm text-gray-400'>Copyright ©2025 Movie Explore</p>
      </div>
    </footer>
  );
}
