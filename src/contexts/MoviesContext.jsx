import { createContext, useReducer, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { searchMovies, fetchDefaultMovies, fetchMoviesByGenres } from "../services/apiService";
// 
// Initial state
const initialState = {
  movies: [],
  favorites: [],
  searchResults: [],
  selectedGenres:[],
  isLoading: false,
  error: null,
};

// Reducer function
const moviesReducer = (state, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return { ...state, movies: action.payload };
    case "SET_FAVORITES":
      return setFavorites(state, action.payload);
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((id) => id !== action.payload),
      };
    case "CLEAR_FAVORITES":
      return { ...state, favorites: [] };
    case "SET_SEARCH_RESULTS":
      return { ...state, searchResults: action.payload };
    case "CLEAR_SEARCH_RESULTS":
      return { ...state, searchResults: [] };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case 'SET_GENRES':
      return { ...state, selectedGenres: action.payload };
    default:
      return state;
  }
};

// Helper functions

// This function is used to check if the payload is an array or not and return the correct state
const setFavorites = (state, payload) => {
  if ( typeof payload !== "object") {
    return { ...state, favorites: [...state.favorites, payload] };
  } 
  return { ...state, favorites: [...payload] };
}

// Create context
export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

  // get and set favorites from local storage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("LC-favorites"));
    if(favorites && favorites.length > 0) {
      dispatch({ type: "SET_FAVORITES", payload: favorites });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("LC-favorites", JSON.stringify(state.favorites));
  }, [state.favorites]);

  // fetch movies from API default endpoint
  const loadMovies = useCallback(async (type, params) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      let data;
      if ( type === 'genres' ) {
        data = await fetchMoviesByGenres(params);
      }
      else if ( type === 'default' ) {
        data = await fetchDefaultMovies();
      }
      
      dispatch({ type: "SET_MOVIES", payload: data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [dispatch]);

  // search movies by query
  const handleSearch = async (query) => {
    if (query === "") {
      dispatch({ type: "CLEAR_SEARCH_RESULTS" });
      dispatch({ type: "CLEAR_ERROR" });
      loadMovies('default');
      return;
    }
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const searchResults = await searchMovies(query);
      dispatch({ type: "SET_SEARCH_RESULTS", payload: searchResults });
      return searchResults;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <MoviesContext.Provider value={{ state, dispatch, handleSearch, loadMovies }}>
      {children}
    </MoviesContext.Provider>
  );
};

MoviesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
