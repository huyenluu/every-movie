import { useState, useEffect, useCallback } from "react";
import propTypes from "prop-types";
import debounce from "lodash.debounce";
import { MdClear } from "react-icons/md";
import styles from "./NavBar.module.css";

const Search = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [hasResults, setHasResults] = useState(false);

  // Debounce the search function
  const debouncedSearch = useCallback(debounce((query) => {
    onSearch(query).then(() => {
        setHasResults(true);
    });
  }, 500), [onSearch]); // 500 ms

  useEffect(() => {
    if (inputValue && !hasResults) {
      debouncedSearch(inputValue);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue, debouncedSearch, hasResults]);

  useEffect(() => {
    if (inputValue === "") {
      setHasResults(false);
      onSearch(""); // Reset the search
    }
  }, [inputValue, onSearch]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setHasResults(false);
  };

  const handleClear = () => {
    setInputValue("");
    setHasResults(false);
    onSearch(""); // Reset the search
  };

  return (
    <div className={styles["search-bar"]}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search movies..."
        aria-label="Search movies"
        className={styles["search-input"]}
      />
      {inputValue && <button onClick={handleClear}><MdClear className={styles['clear-icon']} /></button>}
    </div>
  );
};

export default Search;

Search.propTypes = {
    onSearch: propTypes.func.isRequired,
}