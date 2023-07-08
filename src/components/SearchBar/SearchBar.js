import React, { useEffect, useRef, useState } from "react";
import searchIcon from "../../images/search.svg";
import SearchResult from "../SearchResult/SearchResult";
import algoliasearch from "algoliasearch/lite";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from "../../config";
const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = searchClient.initIndex("ecommerce-products");
const SearchBar = () => {
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  const performSearch = async (value) => {
    const { hits } = await index.search(value, {
      hitsPerPage: 5,
    });
    const results = hits.map((hit) => {
      const { title, id, description, image } = hit;
      return { title, id, description, image };
    });
    setResults(results);
  };

  const handleFocus = (e) => {
    setIsOpen(true);
  };
  const handleBlur = (e) => {
    setIsOpen(false);
  };
  const handleSearch = (e) => {
    const { value } = e.target;
    value === "" ? setResults(null) : performSearch(inputRef.current.value);
  };
  useEffect(() => {
    inputRef.current.value = "";
    inputRef.current.blur();
    setResults(null);
  }, [location]);
  return (
    <div
      className={`searchbar__container ${
        results && isOpen && "searchbar__container_opened"
      }`}
    >
      {results && isOpen && (
        <SearchResult
          result={results}
          onClick={handleClick}
          searchTerm={inputRef.current.value}
        />
      )}
      <input
        ref={inputRef}
        type="text"
        placeholder="Buscar"
        className="searchbar__input"
        onChange={handleSearch}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <button type="submit" className="searchbar__button">
        <img src={searchIcon} alt="" />
      </button>
    </div>
  );
};

export default SearchBar;
