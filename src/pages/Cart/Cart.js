import React, { useContext, useEffect, useState } from "react";
import CartItem from "../../components/CartItem/CartItem";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import cartIcon from "../../images/cart.svg";
import "./Cart.css";
const Cart = () => {
  const { cart } = useContext(AppContext);
  return (
    <div className="cart">
      {cart.items.length > 0 ? (
        <>
          <div className="cart__items-container">
            <h1 className="cart__title">Shopping Cart</h1>
            <ul className="cart__list">
              {cart.items.map((item) => (
                <CartItem item={item} />
              ))}
            </ul>
          </div>
          <div className="cart__orden-summary">
            <p className="cart__subtotal">
              Subtotal: <span>${cart.subTotal.toFixed(2)}</span>
            </p>
            <Link className="cart__button" to="/checkout">
              Proceed to Checkout
            </Link>
          </div>
        </>
      ) : (
        <div className="empty-cart__container">
          <div className="empty-cart">
            <img
              src={cartIcon}
              alt="empty cart"
              className="empty-cart__image"
            />
            <div className="empty-cart__number">0</div>
          </div>
          <h2 className="empty-cart__title">Your Cart is Empty</h2>
          <Link to="/">
            <button className=" empty-cart__button">Go Home</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
