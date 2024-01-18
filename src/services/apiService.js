const API_KEY = import.meta.env.VITE_API_KEY;
const baseURL = "https://api.themoviedb.org/3";
const requests = {
  // Movies all
  fetchAllMovies: `/discover/movie?api_key=${API_KEY}`,
  // get movie based on genres
  getMovieGenres: `/discover/movie?api_key=${API_KEY}&with_genres=`,
  // Search
  searchMovies: `/search/movie?api_key=${API_KEY}`,
  // get genres list
  getGenresList: `/genre/movie/list?language=en&api_key=${API_KEY}`,
};

// fetch default list of movies
export const fetchDefaultMovies = async () => {
  try {
    const response = await fetch(`${baseURL}${requests.fetchAllMovies}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

// search for movies by query
export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${baseURL}${requests.searchMovies}&query=${query}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.results.length === 0) {
      throw new Error("No results found");
    }
    return data.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

// fetch movie genres
export const fetchGenres = async () => {
  try {
    const response = await fetch(`${baseURL}${requests.getGenresList}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.genres;
  } catch (error) {
    throw new Error(error.message);
  }
};
// fetch movies by genres
export const fetchMoviesByGenres = async (genreIds) => {
  try {
    // Convert the array of genre IDs to a comma-separated string
    const genreIdsString = genreIds.join(",");
    const response = await fetch(
      `${baseURL}${requests.getMovieGenres}${genreIdsString}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error(error.message);
  }
};