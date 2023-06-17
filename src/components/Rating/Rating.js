import React from "react";
import emptyStar from "../../images/emptyStar.svg";
import fullStar from "../../images/fullStar.svg";
import halfStar from "../../images/halfStar.svg";
import "./Rating.css";

const Rating = ({ rating }) => {
  const roundedRating = Math.round(rating.rate * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const halfStars = Math.ceil(roundedRating - fullStars);
  const emptyStars = 5 - fullStars - halfStars;
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<img src={fullStar} alt="estrella completa" />);
  }
  if (halfStars) {
    stars.push(<img src={halfStar} alt="estrella completa" />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<img src={emptyStar} alt="estrella completa" />);
  }
  return (
    <div className="rating">
      <div>{stars}</div>
      <span className="rating__count">{rating.count}</span>
    </div>
  );
};

export default Rating;
