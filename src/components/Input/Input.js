import React from "react";
import "./Input.css";
import { Field, useField } from "formik";

const Input = ({ name, label, onChange, placeholder }) => {
  const [field, meta] = useField(name);
  return (
    <div className="input__section">
      <div className="input__container">
        <input
          type="text"
          className={`input ${meta.error && meta.touched && "input__error"}`}
          name={name}
          required
          onChange={onChange}
          {...field}
          placeholder={placeholder}
        />
        <label htmlFor={name} className="input__label">
          <span>{label}</span>
        </label>
      </div>
      {meta.touched && meta.error ? (
        <div className="input__error-message">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Input;
