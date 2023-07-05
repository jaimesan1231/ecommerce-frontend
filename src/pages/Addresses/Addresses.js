import React, { useState } from "react";
import "./Addresses.css";
import Navbar from "../../components/Navbar/Navbar";
import AddressPopup from "../../components/AddressPopup/AddressPopup";
import AddressCard from "../../components/AddressCard/AddressCard";
import addIcon from "../../images/add.svg";
import useUserStore from "../../store/userStore";

const Addresses = () => {
  const user = useUserStore((state) => state.user);
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className="addresses">
      <Navbar />
      <div className="addresses__container">
        <div>
          <h2 className="addresses__title">Your Addresses</h2>
        </div>
        <div className="addresses__info">
          <div className="addresses__add" onClick={() => setOpenPopup(true)}>
            <img src={addIcon} alt="" className="addresses__add-icon" />
            <p>Add Address</p>
          </div>
          {user &&
            user.addresses &&
            user.addresses.map((address) => <AddressCard address={address} />)}
        </div>
      </div>
      {openPopup && <AddressPopup onClose={() => setOpenPopup(false)} />}
    </div>
  );
};

export default Addresses;
