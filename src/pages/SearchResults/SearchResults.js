import algoliasearch from "algoliasearch/lite";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";
import "./SearchResults.css";
import Dropdown from "../../components/Dropdown/Dropdown";
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID } from "../../config";
const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = searchClient.initIndex("ecommerce-products");
const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [searchParms] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState("");
  const searchTerm = searchParms.get("search");
  useEffect(() => {
    setIsLoading(true);
    const performSearch = async () => {
      const { hits } = await index.search(searchTerm, {
        hitsPerPage: 20,
      });
      const results = hits.map((hit) => {
        const { title, id, description, image, rating, price } = hit;
        return { title, id, description, image, rating, price };
      });
      setResults(results);
      setIsLoading(false);
    };
    performSearch();
  }, [searchTerm]);
  useEffect(() => {
    if (order === "") {
      return;
    }
    if (order === "priceAsc") {
      const sortedProducts = [...results];
      sortedProducts.sort((a, b) => {
        return a.price - b.price;
      });
      setResults(sortedProducts);
    } else if (order === "priceDesc") {
      const sortedProducts = [...results];
      sortedProducts.sort((a, b) => {
        return b.price - a.price;
      });
      setResults(sortedProducts);
    }
  }, [order]);
  return (
    <div>
      <h2 className="search-results__title">Results for "{searchTerm}"</h2>
      <div className="sort-section">
        <div className="sort-section__dropdown">
          <Dropdown
            title={"Sort by"}
            items={[
              {
                value: "priceAsc",
                text: "Price: Low to High",
              },
              {
                value: "priceDesc",
                text: "Price: High to Low",
              },
            ]}
            onSelect={(order) => setOrder(order)}
          />
        </div>
      </div>
      <ProductsGrid data={results} isLoading={isLoading} />
    </div>
  );
};

export default SearchResults;
