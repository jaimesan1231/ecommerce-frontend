import React, { useState } from "react";
import searchIcon from "../../images/search.svg";
import "./SearchBar.css";
const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleInputFocus = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`searchbar__container ${
        isOpen && "searchbar__container_opened"
      }`}
    >
      <input
        type="text"
        placeholder="Buscar"
        className="searchbar__input"
        onFocus={handleToggleInputFocus}
        onBlur={handleToggleInputFocus}
      />
      <button type="submit" className="searchbar__button">
        <img src={searchIcon} alt="" />
      </button>
      <ul className={`searchbar__list ${isOpen && "searchbar__list_opened"}`}>
        <li className="searchbar__item">1</li>
        <li className="searchbar__item">2</li>
        <li className="searchbar__item">3</li>
        <li className="searchbar__item">4</li>
      </ul>
    </div>
  );
};

export default SearchBar;
