import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [columnsOpened, setColumnsOpened] = useState({
    know: false,
    about: false,
    services: false,
    help: false,
  });
  const handleClick = (column) => {
    setColumnsOpened((prevState) => ({
      ...prevState,
      [column]: !prevState[column],
    }));
  };
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__columns">
          <div className="footer__column">
            <h3 className="footer__title" onClick={() => handleClick("know")}>
              Know Us
            </h3>
            <p
              className={`footer__description ${
                columnsOpened.know && "column_opened"
              }`}
            >
              At Multimart, we strive to provide an exceptional online shopping
              experience. With quality products, fast shipping, and top-notch
              customer support, we are your trusted destination for all your
              shopping needs
            </p>
          </div>
          <div className="footer__column">
            <h3 className="footer__title" onClick={() => handleClick("about")}>
              About us
            </h3>
            <ul
              className={`footer__contact-list ${
                columnsOpened.about && "column_opened"
              }`}
            >
              <li>About Shopcart</li>
              <li>Careers</li>
              <li>News & Blog</li>
              <li>Help</li>
              <li>Press Center</li>
              <li>Shop By Location</li>
              <li>Affiliate & Partners</li>
              <li>Ideas & Guides</li>
            </ul>
          </div>
          <div className="footer__column">
            <h3
              className="footer__title"
              onClick={() => handleClick("services")}
            >
              Services
            </h3>
            <ul
              className={`footer__contact-list ${
                columnsOpened.services && "column_opened"
              }`}
            >
              <li>Gift Card</li>
              <li>Mobile App</li>
              <li>Shipping & Delivery</li>
              <li>Order Pickup</li>
              <li>Account Signup</li>
            </ul>
          </div>
          <div className="footer__column">
            <h3 className="footer__title" onClick={() => handleClick("help")}>
              Help
            </h3>
            <ul
              className={`footer__contact-list ${
                columnsOpened.help && "column_opened"
              }`}
            >
              <li>Shopcart Help</li>
              <li>Returns</li>
              <li>Track Orders</li>
              <li>Contact Us</li>
              <li>Feedback</li>
              <li>Security & Fraud</li>
            </ul>
          </div>
        </div>
        <p className="footer__copy">
          © 2023 Your Ecommerce. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
