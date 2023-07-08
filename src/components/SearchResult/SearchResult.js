import React from "react";
import "./SearchResult.css";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../images/search.svg";

const SearchResult = ({ result, onClick, searchTerm }) => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search-results?search=${encodeURIComponent(searchTerm)}`);
  };
  return (
    <ul className={`search-result__container`}>
      {result.map((item) => (
        <li
          className="search-result"
          onMouseDown={() => onClick(item.id)}
          key={item.id}
        >
          <img src={item.image} alt="" className="search-result__image" />
          <div className="search-result__info">
            <p className="search-result__title">{item.title}</p>
            <p className="search-result__description">{item.description}</p>
          </div>
        </li>
      ))}
      {result.length === 5 && (
        <div className="search-result__link" onMouseDown={handleSubmit}>
          <img src={searchIcon} alt="" />
          <p className="search-result__all">search all "{`${searchTerm}`}"</p>
        </div>
      )}
    </ul>
  );
};

export default SearchResult;
