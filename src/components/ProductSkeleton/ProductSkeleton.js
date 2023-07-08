import React from "react";
import Skeleton from "react-loading-skeleton";
import "./ProductSkeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="product-skeleton">
      <div className="product-skeleton__image">
        <Skeleton height={450} />
      </div>

      <Skeleton count={2} className="product-skeleton__title" />
      <Skeleton count={5} />
      <Skeleton count={1} width={200} />
      <Skeleton count={1} width={200} />
      <Skeleton count={1} width={300} />
      <Skeleton count={1} width={300} />
    </div>
  );
};

export default ProductSkeleton;
