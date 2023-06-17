import React, { useContext } from "react";
import Rating from "../Rating/Rating";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const ProductCard = ({ product }) => {
  const { image, id, title, price, rating } = product;
  const { addToCart } = useContext(AppContext);
  const handleAddButton = () => {
    console.log(product);
    addToCart(product);
  };
  return (
    <div className="card">
      <Link className="card__image-container" to={`/product/${id}`}>
        <img src={image} alt="" className="card__image" />
      </Link>
      <div className="card__info">
        <Link to={`/product/${id}`}>
          <h2 className="card__title">{title}</h2>
        </Link>
        <span className="card__price">$ {price}</span>

        <div className="card__stars">
          <Rating rating={rating} />
        </div>
        <button className="card__button" onClick={handleAddButton}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;