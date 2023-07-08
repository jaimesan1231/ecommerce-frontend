import React from "react";
import "./AddressRadio.css";

const AddressRadio = ({ address, onChange, isSelected }) => {
  return (
    <label
      className={`checkout__address-item ${
        isSelected && "checkout__address-item_selected"
      }`}
    >
      <input
        type="radio"
        name="address"
        id={address.id}
        checked={isSelected}
        onChange={() => onChange(address.id)}
      />
      <p className="checkout__address-info">
        <span className="checkout__address-name">{address.name}</span>{" "}
        {address.address}, {address.state}, {address.country}, {address.zip}
      </p>
    </label>
  );
};

export default AddressRadio;
