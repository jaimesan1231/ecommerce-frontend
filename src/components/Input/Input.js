import React from "react";
import "./Input.css";
import { Field } from "formik";

const Input = ({ name, label, onChange, value }) => {
  return (
    <div className="input__container">
      <Field
        type="text"
        className="input"
        name={name}
        required
        onChange={onChange}
        value={value}
      />
      <label htmlFor={name} className="input__label">
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Input;
