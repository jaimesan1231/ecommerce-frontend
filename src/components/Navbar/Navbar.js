import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__header">
        <h2 className="navbar__title">Hi, Jaime</h2>
        <p className="navbar__subtitle">
          Thanks for beign a Multimart customer
        </p>
      </div>
      <ul className="navbar__list">
        <NavLink to="/account" className="navbar__link">
          <li className="navbar__item">Account</li>
        </NavLink>
        <NavLink to="/orders" className="navbar__link">
          <li className="navbar__item">Purchase history</li>
        </NavLink>
        <NavLink to="/addresses" className="navbar__link">
          <li className="navbar__item">Addresses</li>
        </NavLink>

        <li className="navbar__item">Sign out</li>
      </ul>
    </div>
  );
};

export default Navbar;
