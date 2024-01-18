
import { useRef, useContext, useState } from 'react';
import { MoviesContext } from '../../contexts/MoviesContext';
import PropTypes from 'prop-types';
import styles from './Movie.module.css';
import { TbHeartPlus, TbHeartX } from "react-icons/tb";
import { truncate } from '../../utils/Truncate';

const IMAGE_URL_BASE = 'https://image.tmdb.org/t/p/w500';

const MovieThumbnail = ({ id, title, posterPath, releaseDate }) => {
    
    const { state, dispatch } = useContext(MoviesContext);
    const { favorites } = state;
    const [isFavorite, setIsFavorite] = useState(favorites.includes(id));

    // Truncate the title if it's too long
    const thumbnailRef = useRef(null);
    const titleRef = useRef(null);
    const width = thumbnailRef.current ? thumbnailRef.current.offsetWidth : 450;
    titleRef.current = title ? truncate(title, `${width <= 450 ? 16 : 24}`) : '--';

    const handleAddToFavorites = async () => {
        // Check if the movie is already in favorites
        if (isFavorite) {
            // Remove the movie from favorites
            dispatch({ type: 'REMOVE_FAVORITE', payload: id });
            setIsFavorite(false);
        } else {
            // Add the movie to favorites
            dispatch({ type: 'SET_FAVORITES', payload: id });
            setIsFavorite(true);
        }
    };

    const calcYear = (date) => {
      const year = date?.split("-")[0];
      return year;
    };

    const imagePath = posterPath === null ? "https://via.placeholder.com/500x750?text=No+Image+Available" : `${IMAGE_URL_BASE}${posterPath}` ;
  
    return (
      <div
        ref={thumbnailRef}
        id="movie-thumbnails"
        className={styles["movie-thumbnail"]}
      >
        <img src={imagePath} alt={title}  />
        <h3 className={styles["title"]}>{titleRef.current}</h3>
        <div className={styles["action-section"]}>
          <p>{releaseDate ? calcYear(releaseDate) : "--"}</p>
          <button onClick={() => handleAddToFavorites(id)}>
            {isFavorite ? (
              <TbHeartX className={styles["heart-x-icon"]} />
            ) : (
              <TbHeartPlus className={styles["heart-plus-icon"]} />
            )}
          </button>
        </div>
      </div>
    );
};


export default MovieThumbnail;

MovieThumbnail.propTypes = {
    title: PropTypes.string.isRequired,
    posterPath: PropTypes.string,
    releaseDate: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

