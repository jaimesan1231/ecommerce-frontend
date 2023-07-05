import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import { AddressSchema } from "../../Schemas";
import Input from "../Input/Input";
import "./AddressPopup.css";
import addIcon from "../../images/add.svg";
import useUserStore from "../../store/userStore";

const AddressPopup = ({ onClose }) => {
  const addAddress = useUserStore((state) => state.addAddress);
  const handleChange = () => {
    console.log("aea");
  };
  useEffect(() => {
    document.body.classList.add("no-overflow");
    return () => {
      document.body.classList.remove("no-overflow");
    };
  }, []);
  return (
    <div className="popup__container">
      <div className="popup">
        <h2 className="popup__title">Add a new address</h2>
        <Formik
          initialValues={{
            country: "",
            name: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            phone: "",
          }}
          validationSchema={AddressSchema}
          onSubmit={(value) => {
            console.log(value);
            addAddress(value);
          }}
        >
          <Form noValidate className="popup__form">
            <Input name="country" label="Country" onChange={handleChange} />

            <Input name="name" label="Full name" onChange={handleChange} />

            <Input
              name="address"
              label="Street address"
              onChange={handleChange}
            />

            <Input name="city" label="City" onChange={handleChange} />

            <Input
              name="state"
              label="State / Province / Region"
              onChange={handleChange}
            />

            <Input name="zip" label="Zip code" onChange={handleChange} />

            <Input name="phone" label="Phone number" onChange={handleChange} />

            <button type="submit" className="popup__button">
              Add address
            </button>
          </Form>
        </Formik>
        <img
          src={addIcon}
          alt=""
          className="popup__close-icon"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default AddressPopup;
