import PropTypes from "prop-types";
import MovieThumbnail from "./MovieThumbnail";
import styles from "./Movie.module.css";
// import { forwardRef } from "react";
import React from "react";

const MovieGrid = React.forwardRef (function MovieGrid({ movies },lastItemRef) {
  return (
    <ul className={styles["movie-grid"]}>
      {movies?.map((movie, index) => (
        <MovieThumbnail
          key={movie.id}
          id={movie.id}
          title={movie.title}
          posterPath={movie.poster_path}
          releaseDate={movie.release_date}
          ref={index === movies.length - 1 ? lastItemRef : null}
        />
      ))}
    </ul>
  );
})


MovieGrid.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MovieGrid;
