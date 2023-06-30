import React, { useEffect } from "react";
import { Form, Formik, useFormik } from "formik";
import Input from "../Input/Input";
import "./AddressPopup.css";

const AddressPopup = () => {
  const handleChange = () => {
    console.log("aea");
  };
  useEffect(() => {
    document.body.classList.add("no-overflow");
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
        >
          <Form>
            <Input
              name="country"
              label="Country"
              onChange={handleChange}
              value=""
            />
            <Input
              name="name"
              label="Full name"
              onChange={handleChange}
              value=""
            />
            <Input
              name="address"
              label="Street address"
              onChange={handleChange}
              value=""
            />
            <Input name="city" label="City" onChange={handleChange} value="" />
            <Input
              name="state"
              label="State / Province / Region"
              onChange={handleChange}
              value=""
            />
            <Input
              name="zip"
              label="Zip code"
              onChange={handleChange}
              value=""
            />
            <Input
              name="state"
              label="Phone number"
              onChange={handleChange}
              value=""
            />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddressPopup;
