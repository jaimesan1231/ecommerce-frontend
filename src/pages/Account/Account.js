import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Account.css";

const Account = () => {
  const [userInfo, setUserInfo] = useState({
    name: {
      value: "Jaime",
      state: "save",
    },
    lastname: {
      value: "Salvatierra Sanchez",
      state: "save",
    },
    email: {
      value: "jaime_salvatierra31@hotmail.com",
      state: "save",
    },
    phone: {
      value: "Add phone number",
      state: "save",
    },
    password: {
      value: "**********",
      state: "save",
    },
  });
  const [originalUserInfo, setOriginalUserInfo] = useState();
  const handleEdit = (field, secondField) => {
    if (userInfo[field].state === "save") {
      console.log("era save");
      const originalInfo = {
        ...originalUserInfo,
        [field]: userInfo[field].value,
      };
      if (secondField) {
        originalInfo[secondField] = userInfo[secondField].value;
      }
      setOriginalUserInfo(originalInfo);
      setUserInfo((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          state: "edit",
        },
      }));
    } else {
      console.log(userInfo[field]);
      setUserInfo((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          state: "save",
        },
      }));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: {
        state: "edit",
        value: value,
      },
    }));
  };
  const handleCancelChanges = (field) => {
    console.log(originalUserInfo[field]);
    console.log(userInfo);
    setUserInfo((prevState) => ({
      ...prevState,
      [field]: {
        state: "save",
        value: originalUserInfo[field],
      },
    }));
  };
  return (
    <div className="account">
      <Navbar />
      <div className="account__info">
        <h2 className="account__title"> Your personal information</h2>

        <div className="account__info-section">
          {userInfo["name"].state === "save" ? (
            <>
              <p className="account__info-title">Full name</p>
              <p className="account__info-field">
                {userInfo["name"].value} {userInfo["lastname"].value}
              </p>
              <button
                className="account__button"
                onClick={() => handleEdit("name", "lastname")}
              >
                Edit
              </button>
            </>
          ) : (
            <>
              <h3 className="account__edit-title">Edit full name</h3>
              <div className="account__input-container">
                <input
                  type="text"
                  className="account__input"
                  name="name"
                  required
                  value={userInfo["name"].value}
                  onChange={handleChange}
                />
                <label htmlFor="name" className="account__label">
                  <span>First name</span>
                </label>
              </div>
              <div className="account__input-container">
                <input
                  type="text"
                  className="account__input"
                  name="lastname"
                  required
                  value={userInfo["lastname"].value}
                  onChange={handleChange}
                />
                <label htmlFor="lastname" className="account__label">
                  <span>Last name</span>
                </label>
              </div>
              <div className="account__buttons-container">
                <button
                  className="account__button account__button_type_cancel"
                  onClick={() => {
                    handleCancelChanges("name");
                    handleCancelChanges("lastname");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="account__button account__button_type_success"
                  onClick={() => handleEdit("name")}
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>

        <div className="account__info-section">
          {userInfo["email"].state === "save" ? (
            <>
              <p className="account__info-title">Email address</p>
              <p className="account__info-field">{userInfo["email"].value}</p>
              <button
                className="account__button "
                onClick={() => handleEdit("email")}
              >
                Edit
              </button>
            </>
          ) : (
            <>
              <h3 className="account__edit-title">Edit email address</h3>
              <div className="account__input-container">
                <input
                  type="text"
                  className="account__input"
                  name="email"
                  required
                  value={userInfo["email"].value}
                  onChange={handleChange}
                />
                <label htmlFor="email" className="account__label">
                  <span>Email address</span>
                </label>
              </div>

              <div className="account__buttons-container">
                <button
                  className="account__button account__button_type_cancel"
                  onClick={() => {
                    handleCancelChanges("email");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="account__button account__button_type_success"
                  onClick={() => handleEdit("email")}
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>

        <div className="account__info-section">
          {userInfo["phone"].state === "save" ? (
            <>
              <p className="account__info-title">Phone number</p>
              <p className="account__info-field">{userInfo["phone"].value}</p>
              <button
                className="account__button"
                onClick={() => handleEdit("phone")}
              >
                Edit
              </button>
            </>
          ) : (
            <>
              <h3 className="account__edit-title">Edit phone number</h3>
              <div className="account__input-container">
                <input
                  type="text"
                  className="account__input"
                  name="phone"
                  required
                  value={userInfo["phone"].value}
                  onChange={handleChange}
                />
                <label htmlFor="phone" className="account__label">
                  <span>Phone number</span>
                </label>
              </div>

              <div className="account__buttons-container">
                <button
                  className="account__button account__button_type_cancel"
                  onClick={() => {
                    handleCancelChanges("phone");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="account__button account__button_type_success"
                  onClick={() => handleEdit("phone")}
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>

        <div className="account__info-section">
          {userInfo["password"].state === "save" ? (
            <>
              <p className="account__info-title">Password</p>
              <p className="account__info-field">
                {userInfo["password"].value}
              </p>
              <button
                className="account__button"
                onClick={() => handleEdit("password")}
              >
                Edit
              </button>
            </>
          ) : (
            <>
              <h3 className="account__edit-title">Edit password</h3>
              <div className="account__input-container">
                <input
                  type="text"
                  className="account__input"
                  name="password"
                  required
                  value={userInfo["password"].value}
                  onChange={handleChange}
                />
                <label htmlFor="password" className="account__label">
                  <span>Password</span>
                </label>
              </div>

              <div className="account__buttons-container">
                <button
                  className="account__button account__button_type_cancel"
                  onClick={() => {
                    handleCancelChanges("password");
                  }}
                >
                  Cancel
                </button>
                <button
                  className="account__button account__button_type_success"
                  onClick={() => handleEdit("password")}
                >
                  Save
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
