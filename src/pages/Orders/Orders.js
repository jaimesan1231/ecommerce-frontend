import React from "react";
import "./Orders.css";
import emptyBox from "../../images/empty-box.svg";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import AddressPopup from "../../components/AddressPopup/AddressPopup";

const Orders = () => {
  return (
    <div className="orders">
      <Navbar />
      <div className="orders__container">
        <h2 className="orders__title">My orders</h2>
        <img src={emptyBox} alt="" className="orders__image" />
        <h3>You currently have no orders</h3>
        <p>Check back after your next shopping trip!</p>
        <Link to="/" className="orders__button">
          Start shopping
        </Link>
        <AddressPopup />
      </div>
    </div>
  );
};

export default Orders;
