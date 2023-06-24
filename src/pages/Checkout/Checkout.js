import React, { useContext, useEffect, useState } from "react";
import "./Checkout.css";
import { AppContext } from "../../context/AppContext";
import CartItem from "../../components/CartItem/CartItem";

const Checkout = () => {
  const { cart, user } = useContext(AppContext);
  console.log(user);
  return (
    <div className="checkout">
      <div className="checkout__cart-section">
        <h2 className="checkout__section-title">Review Item And Shipping</h2>
        <ul className="checkout__items">
          {cart.items.map((item) => (
            <CartItem item={item} />
          ))}
        </ul>
      </div>
      <div className="checkout__payment-section">
        <h2 className="checkout__section-title">Payment Details</h2>
        <form action="#" className="checkout__form">
          <label htmlFor="" className="checkout__label">
            Email
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="checkout__input"
          />
          <label htmlFor="" className="checkout__label">
            Card Holder Name
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="checkout__input"
          />
          <label htmlFor="" className="checkout__label">
            Card Number
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="checkout__input"
          />
          <label
            htmlFor=""
            className="checkout__label checkout__label_size_half"
          >
            Expiry
          </label>
          <label
            htmlFor=""
            className="checkout__label checkout__label_size_half"
          >
            CVC
          </label>
          <input
            type="text"
            placeholder="Type here..."
            className="checkout__input checkout__input_size_half"
          />

          <input
            type="text"
            placeholder="Type here..."
            className="checkout__input checkout__input_size_half"
          />
        </form>
        <div className="checkout__subtotal">
          <p>Sub Total</p>
          <p>${cart.subTotal.toFixed(2)}</p>
        </div>
        <button className="checkout__button">
          Pay ${cart.subTotal.toFixed(2)}
        </button>
      </div>

      <div className="checkout__delivery-section">
        <h2 className="checkout__section-title">Delivery Information</h2>
        <h4>Wade Warren</h4>
        <p>4140 Parker RD. AllewTown, New Mexico 31134</p>
        <p>+447700960054</p>
        <p>Warren@mail.com</p>
        <button className="checkout__edit-button">Edit</button>
      </div>
    </div>
  );
};

export default Checkout;
