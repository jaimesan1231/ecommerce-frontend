import React from "react";
import "./CardSkeleton.css";
import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
  return (
    <div className="card-skeleton">
      <div className="card-skeleton__image">
        <Skeleton height={250} />
      </div>
      <div className="card-skeleton__text">
        <Skeleton count={2} />
        <Skeleton count={1} />
      </div>
    </div>
  );
};

export default CardSkeleton;
