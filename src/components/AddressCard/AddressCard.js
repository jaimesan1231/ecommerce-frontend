import React, { useState } from "react";
import "./AddressCard.css";
import AddressPopup from "../AddressPopup/AddressPopup";
import useUserStore from "../../store/userStore";

const AddressCard = ({ address }) => {
  const editAddress = useUserStore((state) => state.editAddress);
  const deleteAddress = useUserStore((state) => state.deleteAddress);
  const [openPopup, setOpenPopup] = useState(false);
  const handleEditAddress = (values) => {
    editAddress({
      ...values,
      id: address.id,
    });
  };
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
        <p className="address-card__button" onClick={() => setOpenPopup(true)}>
          Edit
        </p>
        <p
          className="address-card__button"
          onClick={() => deleteAddress(address.id)}
        >
          Remove
        </p>
      </div>
      {openPopup && (
        <AddressPopup
          onClose={() => setOpenPopup(false)}
          data={address}
          onSubmit={(values) => handleEditAddress(values)}
        />
      )}
    </div>
  );
};

export default AddressCard;
