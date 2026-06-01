import { Link } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import logo from '@/assets/logo-movie.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // lock scroll ketika menu mobile dibuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Navbar */}
      <header className='sticky top-0 z-50 bg-[#0A0D12CC] backdrop-blur-xl'>
        <div className='mx-auto max-w-7xl px-4 md:px-8 lg:px-10 h-[72px] md:h-[90px] flex items-center justify-between'>
          {/* Left */}
          <div className='flex items-center gap-10'>
            {/* Logo */}
            <Link
              to='/'
              className='hidden md:flex items-center gap-2 font-bold text-2xl'
            >
              <img src={logo} alt='Logo' className='h-8 w-auto' />
              <span>Movie</span>
            </Link>

            {/* Desktop Nav */}
            <nav className='hidden md:flex items-center gap-8 text-sm'>
              <Link to='/' className='hover:text-gray-400 transition'>
                Home
              </Link>

              <Link to='/favorites' className='hover:text-gray-400 transition'>
                Favorites
              </Link>
            </nav>
          </div>

          {/* Right Desktop Search */}
          <div className='hidden md:block relative'>
            <Search
              size={16}
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            />

            <input
              type='text'
              placeholder='Search Movie'
              className='
                w-64
                bg-[#0A0D1299]
                border border-[#1F2937]
                rounded-xl
                pl-9
                pr-4
                py-3
                text-sm
                outline-none
                placeholder:text-gray-400
              '
            />
          </div>

          {/* Mobile Right Header */}
          <div className='md:hidden w-full flex items-center justify-between'>
            {/* Logo */}
            <Link
              to='/'
              className='flex items-center gap-2 font-bold text-[20px]'
            >
              <img src={logo} alt='Logo' className='h-7 w-auto' />
              <span>Movie</span>
            </Link>

            {/* Right Menu */}
            <div className='flex items-center gap-3'>
              <button className='p-2'>
                <Search size={20} />
              </button>

              <button className='p-2' onClick={() => setIsOpen(true)}>
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU FULLSCREEN */}
      {isOpen && (
        <div
          className='
            fixed
            top-0
            left-0
            w-screen
            h-screen
            bg-black
            z-[9999]
            md:hidden
          '
        >
          {/* HEADER */}
          <div className='h-[72px] px-4 flex items-center justify-between'>
            <Link
              to='/'
              onClick={() => setIsOpen(false)}
              className='flex items-center gap-2 font-bold text-[20px]'
            >
              <img src={logo} alt='Logo' className='h-7 w-auto' />
              <span>Movie</span>
            </Link>

            <button className='p-2' onClick={() => setIsOpen(false)}>
              <X size={22} />
            </button>
          </div>

          {/* MENU */}
          <nav className='px-4 pt-8 flex flex-col gap-10 text-sm'>
            <Link
              to='/'
              onClick={() => setIsOpen(false)}
              className='hover:text-gray-400 transition'
            >
              Home
            </Link>

            <Link
              to='/favorites'
              onClick={() => setIsOpen(false)}
              className='hover:text-gray-400 transition'
            >
              Favorites
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
