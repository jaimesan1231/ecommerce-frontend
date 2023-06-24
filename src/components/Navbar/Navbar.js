import React from "react";
import "./Navbar.css";

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
        <li className="navbar__item">Account</li>
        <li className="navbar__item">Purchase history</li>
        <li className="navbar__item">Addresses</li>
        <li className="navbar__item">Sign out</li>
      </ul>
    </div>
  );
};

export default Navbar;
