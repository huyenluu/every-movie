import { useContext,useEffect } from "react";
import { MoviesContext } from "../../contexts/MoviesContext";
import { useLoadMovies } from "../../hooks/useLoadMovie";
import NavBar from "../../components/NavBar/NavBar";
import MovieGrid from "../../components/Movie/MovieGrid";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import styles from "../Pages.module.css";

const HomePage = () => {
    const { state } = useContext(MoviesContext);
    const { movies, isLoading, error } = state;
    const loadMovies = useLoadMovies();

    useEffect(() => {
        loadMovies();
    }, [loadMovies]);

    return (
        <>  
            {isLoading && <Loading />}
            {error && <ErrorMessage message={error} />}
            {!isLoading && movies && (
                <main className={styles.appContainer}>
                    <NavBar />
                    <section className={styles.appLayout}>
                        <h3 className={styles['page-title']}>Popular Movies</h3>
                        <MovieGrid movies={movies} />
                    </section>
                </main>
            )}
        </>
    );
};

export default HomePage;
