import { createContext, useReducer, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { searchMovies, fetchDefaultMovies } from "../services/apiService";
// 
// Initial state
const initialState = {
  movies: [],
  favorites: [],
  searchResults: [],
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
    case "SET_SEARCH_RESULTS":
      return { ...state, searchResults: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_SEARCH_RESULTS":
      return { ...state, searchResults: [] };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "CLEAR_FAVORITES":
      return { ...state, favorites: [] };
    default:
      return state;
  }
};

// Helper functions
// This function is used to check if the payload is an array or not and return the correct state
const setFavorites = (state, payload) => {
  console.log(typeof payload)
  if ( typeof payload !== "object") {
    return { ...state, favorites: [...state.favorites, payload] };
  } 
  return { ...state, favorites: [...payload] };
}

// Create context
export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if(favorites && favorites.length > 0) {
      dispatch({ type: "SET_FAVORITES", payload: favorites });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state.favorites]);

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

  const handleSearch = async (query) => {
    if (query === "") {
      dispatch({ type: "CLEAR_SEARCH_RESULTS" });
      dispatch({ type: "CLEAR_ERROR" });
      loadMovies();
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
