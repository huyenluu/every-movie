const API_KEY = import.meta.env.VITE_API_KEY;
const baseURL = "https://api.themoviedb.org/3";

// fetch default list of movies
export const fetchDefaultMovies = async (page = 1) => {
  try {
    const response = await fetch(`${baseURL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// search for movies by query
export const searchMovies = async (query) => {
  try {
    const response = await fetch(
      `${baseURL}/search/movie?api_key=${API_KEY}&query=${query}`
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
    const response = await fetch(`${baseURL}/genre/movie/list?language=en&api_key=${API_KEY}`);
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
      `${baseURL}/discover/movie?api_key=${API_KEY}&with_genres=${genreIdsString}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};