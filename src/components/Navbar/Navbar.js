import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import useUserStore from "../../store/userStore";
import arrow from "../../images/filterIcon.svg";
import "./Navbar.css";
import { signOutUser } from "../../utils/auth";

const Navbar = ({ isOpen, onClose }) => {
  const user = useUserStore((state) => state.user);
  const location = useLocation();
  const handleClick = (e) => {
    if ("/" + e.target.id === location.pathname) {
      onClose();
    }
  };
  return (
    <div className={`navbar ${isOpen && "navbar_opened"}`}>
      <div className="navbar__return-section" onClick={onClose}>
        <img src={arrow} alt="" className="navbar__return-icon" />
        <p className="navbar__return-text">return</p>
      </div>
      <div className="navbar__header">
        <h2 className="navbar__title">Hi, {user.name}</h2>
        <p className="navbar__subtitle">
          Thanks for beign a Multimart customer
        </p>
      </div>
      <ul className="navbar__list">
        <NavLink to="/account" className="navbar__link" onClick={handleClick}>
          <li className="navbar__item" id="account">
            Account
          </li>
        </NavLink>
        <NavLink to="/orders" className="navbar__link" onClick={handleClick}>
          <li className="navbar__item" id="orders">
            My Orders
          </li>
        </NavLink>
        <NavLink to="/addresses" className="navbar__link" onClick={handleClick}>
          <li className="navbar__item" id="addresses">
            Addresses
          </li>
        </NavLink>

        <li className="navbar__item" onClick={signOutUser}>
          Sign out
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
