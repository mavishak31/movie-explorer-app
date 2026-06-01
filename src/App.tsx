import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from '@/pages/HomePage';
import MovieDetailPage from '@/pages/MovieDetailPage';
import FavoritesPage from '@/pages/FavoritesPage';
import Layout from '@/components/layout/Layout';
import SearchPage from '@/pages/SearchPage';

export default function App() {
  // TODO: Setup routing dengan React Router
  // TODO: Implement layout structure
  // TODO: Add navigation between pages

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/movie/:id' element={<MovieDetailPage />} />
          <Route path='/favorites' element={<FavoritesPage />} />
          <Route path='/search' element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
