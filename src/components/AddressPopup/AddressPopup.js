import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import { AddressSchema } from "../../Schemas";
import Input from "../Input/Input";
import "./AddressPopup.css";
import addIcon from "../../images/add.svg";

const AddressPopup = ({ onClose, data, onSubmit }) => {
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
            country: data ? data.country : "",
            name: data ? data.name : "",
            address: data ? data.address : "",
            city: data ? data.city : "",
            state: data ? data.state : "",
            zip: data ? data.zip : "",
            phone: data ? data.phone : "",
          }}
          validationSchema={AddressSchema}
          onSubmit={(value) => {
            onSubmit(value);
            onClose();
          }}
        >
          <Form noValidate className="popup__form">
            <Input name="country" label="Country" />
            <Input name="name" label="Full name" />
            <Input name="address" label="Street address" />
            <Input name="city" label="City" />
            <Input name="state" label="State / Province / Region" />
            <Input name="zip" label="Zip code" />
            <Input name="phone" label="Phone number" />
            <button type="submit" className="popup__button">
              {data ? "edit address" : "add address"}
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
