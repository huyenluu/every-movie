import { useContext } from "react";
import { MoviesContext } from "../../contexts/MoviesContext";
import MovieGrid from "../../components/Movie/MovieGrid";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { TbHeartPlus } from "react-icons/tb";

import styles from "../Pages.module.css";

const Favorites = () => {
  const { state } = useContext(MoviesContext);
  const { favorites } = state;
  return (
    <main className={styles.appContainer}>
      <NavBar />
      <section className={styles.appLayout}>
        <Link to="/" className={styles['back-button']}>
          <MdOutlineArrowBackIosNew />
          <span>Home</span>
        </Link>
        <h3 className={styles['page-title']}>My Favorites</h3>
        {favorites.length === 0 && <h3 className={styles["empty-favorite-msg"]}>Tap on  <TbHeartPlus className={styles["heart-icon"]}/>  to add movies to your favorite!</h3>}
        {favorites.length > 0 && <MovieGrid movies={favorites} />}
      </section>
    </main>
  );
};

export default Favorites;
