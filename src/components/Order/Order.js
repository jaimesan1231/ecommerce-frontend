import React, { useState } from "react";
import "./Order.css";
import CartItem from "../CartItem/CartItem";
import arrow from "../../images/filterIcon.svg";

const Order = ({ order }) => {
  const [openDetails, setOpenDetails] = useState(false);
  const handleOpenDetail = () => {
    setOpenDetails(!openDetails);
  };
  return (
    <div className="order__container">
      <div className="order__header">
        <span className="order__date">{order.date}</span>
        <span className="order__subtotal">${order.subTotal.toFixed(2)}</span>
        <span className="order__id">Order #{order.id}</span>
        <span className="order__count">
          {order.items.length > 1 ? order.items.length + " items" : "1 item"}
        </span>
      </div>
      <ul className="order__list">
        {order.items.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>
      <div className="order__footer">
        <button className="order__button" onClick={handleOpenDetail}>
          {openDetails ? "Hide" : "Show"} Details{" "}
          <img
            src={arrow}
            alt="arrow icon"
            className={`${openDetails && "order__button_opened"}`}
          />
        </button>
        {openDetails && (
          <div className="order__details">
            <div className="order__column">
              <h3 className="order__column-title">Order summary</h3>
              <p>
                Total <span>${order.subTotal}</span>
              </p>
            </div>
            <div className="order__column">
              <h3 className="order__column-title">Payment method</h3>
              <p>Card ending in {order.card}</p>
            </div>
            <div className="order__column">
              <h3 className="order__column-title">Delivery address</h3>
              <p>{order.address.name}</p>
              <p>{order.address.address}</p>
              <p>
                {order.address.city}, {order.address.country}{" "}
                {order.address.zip}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
