import PropTypes from 'prop-types';
import MovieThumbnail from "./MovieThumbnail";
import styles from './Movie.module.css';

function MovieGrid({ movies }) {
    return (
      <ul className={styles["movie-grid"]}>
        {movies?.map((movie) => (
          <MovieThumbnail  
            key={movie.id}
            id={movie.id} 
            title={movie.original_title} 
            posterPath={movie.poster_path}
            releaseDate={movie.release_date}
          />
        ))}
      </ul>
    );
}
MovieGrid.propTypes = {
    movies: PropTypes.array.isRequired,
};

export default MovieGrid;