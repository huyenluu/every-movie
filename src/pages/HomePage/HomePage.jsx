import { useContext, useEffect, useState, useRef } from "react";
import { MoviesContext } from "../../contexts/MoviesContext";
import PropTypes from "prop-types";
import NavBar from "../../components/NavBar/NavBar";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import GenresSelect from "../../components/GenresSelector/GenresSelect";
import Search from "../../components/Search/Search";
import AppLayout from "../../components/AppLayout/AppLayout";
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
  // Reset scroll position when user scrolls to top of page
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
    const observer = new IntersectionObserver(handleObserver, { threshold: 0.1 });
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
      <NavBar>
        <Search onSearch={handleSearch}/>
      </NavBar>
      <Content isLoading={isLoading} error={error} searchResults={searchResults} movies={movies} handleGenreChange={handleGenreChange} />
      <div ref={loader} className={searchResults.length > 0 && movies.length === 0? "hidden" : styles["loader-pages"]}>Loading more movies...</div>
    </main>
  );
};

const Content = ({ isLoading, error, searchResults, movies, handleGenreChange }) => {
  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (searchResults.length >= 1) return (
    <AppLayout movies={searchResults} title="Search Results"/>
  );
  if (movies) return( 
    <AppLayout movies={movies} title="Popular Movies" noMoviesMessage="Sorry! No Movies Available">
      <GenresSelect onChange={(arr) => handleGenreChange(arr)} />
    </AppLayout>
  );
  return <ErrorMessage message="Something went wrong!"/>;
};

export default HomePage;

Content.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  searchResults: PropTypes.array,
  movies: PropTypes.array,
  handleGenreChange: PropTypes.func
};
