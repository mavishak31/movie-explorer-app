import Navbar from '@/components/layout/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';

export default function Layout() {
  const [search, setSearch] = useState('');

  return (
    <div className='bg-black text-white min-h-screen relative'>
      <Navbar search={search} onSearchChange={setSearch} />

      <main className='relative z-0'>
        <Outlet context={{ search }} />
      </main>

      <Footer />
    </div>
  );
}
