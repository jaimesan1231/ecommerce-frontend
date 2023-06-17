import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductsGrid = ({ data = [], isLoading }) => {
  return (
    <>
      {!isLoading ? (
        <div className="product-container">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="product-container">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      )}
    </>
  );
};

export default ProductsGrid;
