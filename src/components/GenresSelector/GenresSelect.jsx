
import Proptypes from 'prop-types';
import Select from 'react-select';
import { useState, useEffect, useContext } from 'react';
import { MoviesContext } from '../../contexts/MoviesContext';
import { fetchGenres } from '../../services/apiService';
import './GenresSelect.css';

export default function GenresSelect({onChange}) {
    const { state } = useContext(MoviesContext);
    const { selectedGenres } = state;
    const [genresList, setGenresList] = useState([]);

    // Fetch genres when the component mounts, check first if the data is cached in localStorage 
    useEffect(() => {
        const fetchGenresList = async () => {
            try {
                const genres = await fetchGenres();
                localStorage.setItem("LC-movies-genres", JSON.stringify(genres));
                setGenresList(genres);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        const cachedData = localStorage.getItem("LC-movies-genres");
        if (cachedData) {
            setGenresList(JSON.parse(cachedData));
        } else {
            fetchGenresList();
        }
    }, []);
    const selectedGenresOptions = genresList
        .filter((genre) => selectedGenres.includes(genre.id))
        .map((genre) => ({
            label: genre.name,
            value: genre.id
        }));
    const genreOptions = genresList.map((genre) => ({
        label: genre.name,
        value: genre.id
    }));
    const handleChange = (selected) => {
        const values = selected ? selected.map(option => option.value) : [];
        onChange(values);
    };
    return (
        <Select
            value={selectedGenresOptions}
            isMulti
            options={genreOptions}
            onChange={handleChange}
            className="genre-select"
            classNamePrefix="select"
            placeholder="All Genres"
            unstyled
        />
    );
}

GenresSelect.propTypes = {
    onChange: Proptypes.func.isRequired
};
