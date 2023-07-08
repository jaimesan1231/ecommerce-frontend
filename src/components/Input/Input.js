import React, { useEffect, useState } from "react";
import "./Input.css";
import { useField } from "formik";
import eyeIcon from "../../images/eye.svg";

const Input = ({ name, label, onChange, placeholder, type = "text" }) => {
  const [field, meta] = useField(name);
  const [inputType, setInputType] = useState("text");
  useEffect(() => {
    if (type === "password") {
      setInputType("password");
    }
  }, []);
  const handleVisibleInput = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <div className="input__section">
      <div className="input__container">
        <input
          type={inputType}
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
        {type === "password" && (
          <img
            src={eyeIcon}
            alt=""
            className="input__icon"
            onClick={handleVisibleInput}
          />
        )}
      </div>
      {meta.touched && meta.error ? (
        <div className="input__error-message">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Input;
