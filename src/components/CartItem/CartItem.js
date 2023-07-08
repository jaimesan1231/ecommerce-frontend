import React from "react";
import "./CartItem.css";
import useCartStore from "../../store/cartStore";

const CartItem = ({ item, cart }) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const { title, price, image, quantity } = item;
  return (
    <li className="item">
      <img src={image} alt="" className="item__image" />

      <p className="item__title">{title}</p>
      <p className="item__quantity">Quantity: {quantity}</p>
      {cart && (
        <button
          className="item__delete"
          onClick={() => removeFromCart(item.id)}
        >
          Delete
        </button>
      )}

      <h4 className="item__price">${price.toFixed(2)}</h4>
    </li>
  );
};

export default CartItem;
