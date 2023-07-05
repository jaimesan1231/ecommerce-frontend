import React from "react";
import "./AddressCard.css";

const AddressCard = ({ address }) => {
  return (
    <div className="address-card">
      <ul className="address-card__list">
        <h3 className="address-card__item">{address.name}</h3>
        <p className="address-card__item">{address.address}</p>
        <p className="address-card__item">{address.state}</p>
        <p className="address-card__item">{address.country}</p>
        <p className="address-card__item">Phone: {address.phone}</p>
      </ul>

      <div className="address-card__buttons">
        <p className="address-card__button">Edit</p>
        <p className="address-card__button">Remove</p>
      </div>
    </div>
  );
};

export default AddressCard;
