import React, { useState } from "react";
import "./Addresses.css";
import Navbar from "../../components/Navbar/Navbar";
import AddressPopup from "../../components/AddressPopup/AddressPopup";
import AddressCard from "../../components/AddressCard/AddressCard";
import addIcon from "../../images/add.svg";
import useUserStore from "../../store/userStore";

const Addresses = () => {
  const user = useUserStore((state) => state.user);
  const addAddress = useUserStore((state) => state.addAddress);
  const [openPopup, setOpenPopup] = useState(false);
  const [openNavbar, setOpenNavbar] = useState(false);
  const handleNavbar = () => {
    setOpenNavbar(!openNavbar);
  };

  return (
    <div className="addresses">
      <Navbar isOpen={openNavbar} onClose={handleNavbar} />
      <div className="addresses__container">
        <div className="addresses__header">
          <button onClick={handleNavbar} className="addresses__menu">
            Menu
          </button>
          <h2 className="addresses__title">Addresses</h2>
        </div>
        <div className="addresses__info">
          <div className="addresses__add" onClick={() => setOpenPopup(true)}>
            <img src={addIcon} alt="add icon" className="addresses__add-icon" />
            <p>Add Address</p>
          </div>
          {user &&
            user.addresses &&
            user.addresses.map((address) => (
              <AddressCard address={address} key={address.id} />
            ))}
        </div>
      </div>
      {openPopup && (
        <AddressPopup
          onClose={() => setOpenPopup(false)}
          onSubmit={(values) => addAddress(values)}
        />
      )}
    </div>
  );
};

export default Addresses;
