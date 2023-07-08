import React, { useEffect, useState } from "react";
import "./Orders.css";
import emptyBox from "../../images/empty-box.svg";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import AddressPopup from "../../components/AddressPopup/AddressPopup";
import useUserStore from "../../store/userStore";
import Order from "../../components/Order/Order";

const Orders = () => {
  const user = useUserStore((state) => state.user);
  const [openNavbar, setOpenNavbar] = useState(false);
  const handleNavbar = () => {
    setOpenNavbar(!openNavbar);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="orders">
      <Navbar isOpen={openNavbar} onClose={handleNavbar} />
      <div className="orders__container">
        <div className="orders__header">
          <button onClick={handleNavbar} className="orders__menu">
            Menu
          </button>
          <h2 className="orders__title">My orders</h2>
        </div>
        {user && user.orders ? (
          user.orders
            .slice()
            .reverse()
            .map((order) => <Order order={order} key={order.id} />)
        ) : (
          <>
            <img src={emptyBox} alt="empty box" className="orders__image" />
            <h3 className="orders__empty-title">
              You currently have no orders
            </h3>
            <p className="orders__empty-subtitle">
              Check back after your next shopping trip!
            </p>
            <Link to="/" className="orders__button">
              Start shopping
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
