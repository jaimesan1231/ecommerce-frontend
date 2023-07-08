import React from "react";
import "./SearchList.css";

const SearchList = ({ result }) => {
  return (
    <ul className={`searchlist `}>
      {result.map((item) => (
        <li className="searchlist__item">{item.title}</li>
      ))}
    </ul>
  );
};

export default SearchList;
