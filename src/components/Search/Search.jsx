import { useState, useEffect, useCallback } from "react";
import propTypes from "prop-types";
import debounce from "lodash.debounce";
import { MdClear } from "react-icons/md";
import styles from "./Search.module.css";

const Search = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [hasResults, setHasResults] = useState(false);

  // Debounce the search function
  const debouncedSearch = useCallback(debounce((query) => {
    onSearch(query).then(() => {
        setHasResults(true);
    });
  }, 500), [onSearch]);

  useEffect(() => {
    if (inputValue && !hasResults) {
      debouncedSearch(inputValue);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue, debouncedSearch, hasResults]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setHasResults(false);
    if(event.target.value === "") {
      handleClear();
    }
  };

  const handleClear = () => {
    setInputValue("");
    setHasResults(false);
    onSearch("");
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