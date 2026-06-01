import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import logo from '@/assets/logo-movie.png';

type TNavbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function Navbar({ search, onSearchChange }: TNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // state search mobile
  const [showMobileSearch, setShowMobileSearch] = useState(false);

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

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/search?query=${encodeURIComponent(search)}`);

    // close search mobile setelah submit
    setShowMobileSearch(false);
  };

  return (
    <>
      {/* Navbar */}
      <header className='fixed top-0 left-0 right-0 z-[9999] bg-[#0A0D1299] backdrop-blur-2xl border-b border-white/10'>
        <div className='mx-auto max-w-7xl px-4 md:px-8 lg:px-10 min-h-[72px] md:h-[90px] flex items-center justify-between'>
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

            <form onSubmit={handleSubmit}>
              <input
                type='text'
                placeholder='Search Movie'
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
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
            </form>
          </div>

          {/* Mobile Right Header */}
          <div className='md:hidden w-full flex flex-col'>
            <div className='flex items-center justify-between'>
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
                <button
                  className='p-2 text-white'
                  onClick={() => setShowMobileSearch(!showMobileSearch)}
                >
                  <Search size={20} />
                </button>

                <button
                  className='p-2 text-white'
                  onClick={() => setIsOpen(true)}
                >
                  <Menu size={22} />
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            {showMobileSearch && (
              <div className='pt-3 pb-3'>
                <form onSubmit={handleSubmit} className='relative'>
                  <Search
                    size={16}
                    className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                  />

                  <input
                    type='text'
                    placeholder='Search Movie'
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className='
                      w-full
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
                    autoFocus
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
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
          {/* Header */}
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

          {/* Mobile Menu */}
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
