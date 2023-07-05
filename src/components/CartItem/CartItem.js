import React from "react";
import "./CartItem.css";
import useCartStore from "../../store/cartStore";

const CartItem = ({ item }) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const { title, price, image, quantity } = item;
  return (
    <li className="item">
      <img src={image} alt="" className="item__image" />

      <div className="item__info">
        <p className="item__title">{title}</p>
        <p>Quantity: {quantity}</p>
        <button
          className="item__delete"
          onClick={() => removeFromCart(item.id)}
        >
          Delete
        </button>
      </div>
      <h4 className="item__price">${price.toFixed(2)}</h4>
    </li>
  );
};

export default CartItem;
