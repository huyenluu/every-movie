const API_KEY = import.meta.env.VITE_API_KEY;
const baseURL = "https://api.themoviedb.org/3";
const requests = {
  // Movies all
  fetchAllMovies: `/discover/movie?api_key=${API_KEY}`,
  // get movie genres
  getMovieGenres: `genre/movie/list?api_key=${API_KEY}`,
  // Search
  searchMovies: `/search/movie?api_key=${API_KEY}`,
};

// fetch default list of movies
export const fetchDefaultMovies = async () => {
    try {
        const response = await fetch(`${baseURL}${requests.fetchAllMovies}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }
};

// to-do: search for movies by query
export const searchMovies = async (query) => {
    try {
        const response = await fetch(`${baseURL}${requests.searchMovies}&query=${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if(data.results.length === 0) {
            throw new Error('No results found');
        }
        return data.results;
    } catch (error) {
        throw new Error(error.message);
    }
};

// to-do: fetch movies by category

