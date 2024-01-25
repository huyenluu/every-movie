import PropTypes from "prop-types";
import MovieGrid from "../Movie/MovieGrid";
import styles from "./AppLayout.module.css";

const AppLayout = ({ movies, children, title }) => (
  <section className={styles.appLayout}>
    <h3 className={styles["page-title"]}>{title}</h3>
    {children}
    <MovieGrid movies={movies} />
    {movies.length === 0 && (
      <p className={styles["no-movies"]}>No Movies Available</p>
    )}
  </section>
);

export default AppLayout;

AppLayout.propTypes = {
  movies: PropTypes.array,
  handleGenreChange: PropTypes.func,
  children: PropTypes.element,
  title: PropTypes.string,
};