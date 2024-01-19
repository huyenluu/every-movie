import { useContext,useEffect } from "react";
import { MoviesContext } from "../../contexts/MoviesContext";
import NavBar from "../../components/NavBar/NavBar";
import MovieGrid from "../../components/Movie/MovieGrid";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import GenresSelect from "../../components/GenresSelector/GenresSelect";

import styles from "../Pages.module.css";


const HomePage = () => {
    const { state, dispatch, loadMovies, handleSearch } = useContext(MoviesContext);
    const { movies, searchResults, isLoading, error } = state;
    useEffect(() => {
        loadMovies('default');
    }, [loadMovies]);
    
    const handleGenreChange = (arr) => {
        dispatch({ type: "SET_GENRES", payload: arr });
        loadMovies('genres', arr);
    }

    return (
        <main className={styles.appContainer}>
            <NavBar onSearch={handleSearch} haveSearchBar />
            {isLoading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {!isLoading && searchResults.length >= 1 && (
                <section className={styles.appLayout}>
                    <h3 className={styles['page-title']}>Search Results</h3>
                    <MovieGrid movies={searchResults} />
                </section>
            )}
            {!isLoading && movies && !error && searchResults.length === 0 &&(
                <section className={styles.appLayout}>
                    <h3 className={styles['page-title']}>Popular Movies</h3>
                    <GenresSelect onChange={(arr) => handleGenreChange(arr)} />
                    <MovieGrid movies={movies} />
                    {movies.length === 0 && <p className={styles['no-movies']}>No movies found</p>}
                </section>
            )}
        </main>
    );
};

export default HomePage;
