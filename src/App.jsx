import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MoviesProvider } from './contexts/MoviesContext';
import Favorites from './pages/Favorites/Favorites';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import HomePage from './pages/HomePage/HomePage';

const router = createBrowserRouter([
  {
      path: '/',
      element: <HomePage />,
      errorElement: <ErrorMessage message="Render Error!" />,
  },
  {
      path: '/favorites',
      element: <Favorites />,
      errorElement: <ErrorMessage message="Render Error!"/>,
  },
]);

export default function App() {
  return (
    <MoviesProvider>
      <RouterProvider router={router} />
    </MoviesProvider>
  );
}

