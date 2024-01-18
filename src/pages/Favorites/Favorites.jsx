import { useContext, useEffect } from "react";
import { MoviesContext } from "../../contexts/MoviesContext";
import MovieGrid from "../../components/Movie/MovieGrid";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import styles from "../Pages.module.css";
const Favorites = () => {
  const { state, loadMovies } = useContext(MoviesContext);
  const { movies, favorites } = state;
  // fetch movies based on favorites if movies is empty
  useEffect(() => {
      loadMovies('default');
  }, [loadMovies]);
  const favoritesMovies = movies ? movies.filter((movie) => favorites.includes(movie.id)) : [];
  return (
    <main className={styles.appContainer}>
      <NavBar />
      <section className={styles.appLayout}>
        <Link to="/" className={styles['back-button']}>
          <MdOutlineArrowBackIosNew />
          <span>Home</span>
        </Link>
        <h3 className={styles['page-title']}>My Favorites</h3>
        <MovieGrid movies={favoritesMovies} />
      </section>
    </main>
  );
};

export default Favorites;
