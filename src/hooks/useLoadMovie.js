import { useContext, useCallback } from 'react';
import { MoviesContext } from '../contexts/MoviesContext';
import { fetchDefaultMovies } from '../services/apiService';

export const useLoadMovies = () => {
  const { dispatch } = useContext(MoviesContext);

  const loadMovies = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const data = await fetchDefaultMovies();
      dispatch({ type: "SET_MOVIES", payload: data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [dispatch]);

  return loadMovies;
};