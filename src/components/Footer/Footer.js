import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__columns">
          <div className="footer__column">
            <h3 className="footer__title">Know Us</h3>
            <p className="footer__description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              euismod libero vitae urna ultricies, et accumsan enim cursus.
            </p>
          </div>
          <div className="footer__column">
            <h3 className="footer__title">About us</h3>
            <ul className="footer__contact-list">
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
            <h3 className="footer__title">Services</h3>
            <ul className="footer__contact-list">
              <li>Gift Card</li>
              <li>Mobile App</li>
              <li>Shipping & Delivery</li>
              <li>Order Pickup</li>
              <li>Account Signup</li>
            </ul>
          </div>
          <div className="footer__column">
            <h3 className="footer__title">Help</h3>
            <ul className="footer__contact-list">
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
