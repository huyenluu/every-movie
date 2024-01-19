import { useContext, useEffect, useState, useRef } from "react";
import { MoviesContext } from "../../contexts/MoviesContext";
import NavBar from "../../components/NavBar/NavBar";
import MovieGrid from "../../components/Movie/MovieGrid";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import GenresSelect from "../../components/GenresSelector/GenresSelect";

import styles from "../Pages.module.css";

const HomePage = () => {
  const { 
    state, 
    dispatch, 
    loadMovies, 
    handleSearch 
  } = useContext(MoviesContext);
  const { movies, searchResults, isLoading, error } = state;
  const [currentPage, setCurrentPage] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const loader = useRef(null);

  // Load movies on initial render and when currentPage changes
  useEffect(() => {
    loadMovies("default", currentPage);
  }, [loadMovies, currentPage]);

  // Scroll to previous scroll position when movies change
  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [movies, scrollPosition]);
  
  // Handle scroll event to set scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setScrollPosition(0);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Intersection observer to load more movies when reaching the end of the page (loader)
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setScrollPosition(window.scrollY);
      setCurrentPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle genre change and load movies based on selected genres
  const handleGenreChange = (arr) => {
    dispatch({ type: "SET_GENRES", payload: arr });
    loadMovies("genres", arr);
  };

  return (
    <main className={styles.appContainer}>
      <NavBar onSearch={handleSearch} haveSearchBar />
      {isLoading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && searchResults.length >= 1 && (
        <section className={styles.appLayout}>
          <h3 className={styles["page-title"]}>Search Results</h3>
          <MovieGrid movies={searchResults} />
        </section>
      )}
      {!isLoading && movies && !error && searchResults.length === 0 && (
        <section className={styles.appLayout}>
          <h3 className={styles["page-title"]}>Popular Movies</h3>
          <GenresSelect onChange={(arr) => handleGenreChange(arr)} />
          <MovieGrid movies={movies} />
          {movies.length === 0 && (
            <p className={styles["no-movies"]}>No movies found</p>
          )}
        </section>
      )}
      <div ref={loader} className={searchResults.length > 0 ? "hidden" : styles["loader-pages"]}>Loading more movies...</div>
    </main>
  );
};

export default HomePage;
