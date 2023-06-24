import React, { useEffect, useState } from "react";
import "./SearchList.css";
import { fetchPopularProducts, searchProductByName } from "../../utils/api";

const SearchList = ({ result }) => {
  // const [result, setResult] = useState([]);
  // useEffect(() => {
  //   if (searchTerm === "") {
  //     const getPopularProducts = async () => {
  //       const popularProducts = await fetchPopularProducts(5);
  //       console.log(result);
  //       setResult(popularProducts);
  //       console.log(result);
  //     };
  //     getPopularProducts();
  //   } else {
  //     const searchProduct = async () => {
  //       const searchResult = await searchProductByName(searchTerm);
  //       console.log(result);
  //       setResult(searchResult);
  //       console.log(result);
  //     };
  //     console.log("aea");
  //     searchProduct();
  //   }
  //   console.log(result);
  // }, [searchTerm]);
  return (
    <ul className={`searchlist `}>
      {result.map((item) => (
        <li className="searchlist__item">{item.title}</li>
      ))}
      {/* <li className="searchlist__item">1</li>
      <li className="searchlist__item">2</li>
      <li className="searchlist__item">3</li>
      <li className="searchlist__item">4</li> */}
    </ul>
  );
};

export default SearchList;
