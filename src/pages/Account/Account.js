import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Account.css";
import useUserStore from "../../store/userStore";
import { Form, Formik } from "formik";
import Input from "../../components/Input/Input";
import {
  EmailSchema,
  FullNameSchema,
  PasswordSchema,
  PhoneSchema,
} from "../../Schemas";
import { changeEmail, changePassword } from "../../utils/user";
import { reauthenticate } from "../../utils/auth";
import { useLocation } from "react-router-dom";

const Account = () => {
  const user = useUserStore((state) => state.user);
  const editUser = useUserStore((state) => state.editUser);
  const location = useLocation();
  const openState = location.state?.open || false;
  const [userInfo, setUserInfo] = useState({
    name: "save",
    lastname: "save",
    email: "save",
    phone: "save",
    password: "save",
  });
  const [errorInfo, setErrorInfo] = useState({
    email: {
      error: false,
      text: "",
    },
    password: {
      error: false,
      text: "",
    },
  });
  const [openNavbar, setOpenNavbar] = useState(false);
  useEffect(() => {
    if (openState) {
      setOpenNavbar(true);
    }
  }, []);
  const handleNavbar = () => {
    setOpenNavbar(!openNavbar);
  };

  const handleEdit = (field) => {
    if (userInfo[field] === "save") {
      setUserInfo((prevState) => ({
        ...prevState,
        [field]: "edit",
      }));
    } else {
      setUserInfo((prevState) => ({
        ...prevState,
        [field]: "save",
      }));
    }
  };
  const handleError = (field, message) => {
    setErrorInfo((prevState) => ({
      ...prevState,
      [field]: {
        error: true,
        text: message,
      },
    }));
    setTimeout(() => {
      setErrorInfo((prevState) => ({
        ...prevState,
        [field]: {
          error: false,
          text: "",
        },
      }));
    }, 4000);
  };

  return (
    <div className="account">
      <Navbar isOpen={openNavbar} onClose={handleNavbar} />
      <div className="account__info">
        <div className="account__header">
          <button onClick={handleNavbar} className="account__menu">
            Menu
          </button>
          <h2 className="account__title"> Account</h2>
        </div>

        <div className="account__info-section">
          {userInfo["name"] === "save" ? (
            <>
              <p className="account__info-title">Full name</p>
              <p className="account__info-field">
                {user["name"]} {user["lastname"]}
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
              <Formik
                initialValues={{
                  name: user.name,
                  lastname: user.lastname,
                }}
                validationSchema={FullNameSchema}
                onSubmit={(value) => {
                  editUser(value);
                  handleEdit("name");
                }}
              >
                <Form className="account__form">
                  <Input name="name" label="First name" />
                  <Input name="lastname" label="First name" />
                  <div className="account__buttons-container">
                    <button
                      className="account__button account__button_type_cancel"
                      onClick={() => {
                        handleEdit("name");
                      }}
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="account__button account__button_type_success"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              </Formik>
            </>
          )}
        </div>

        <div className="account__info-section">
          {userInfo["email"] === "save" ? (
            <>
              <p className="account__info-title">Email address</p>
              <p className="account__info-field">{user["email"]}</p>
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
              <Formik
                initialValues={{
                  email: user.email,
                  password: "",
                }}
                validationSchema={EmailSchema}
                onSubmit={(value) => {
                  editUser(value);
                  changeEmail(
                    user.email,
                    value.email,
                    value.password,
                    (field, text) => handleError(field, text),
                    () => handleEdit("email")
                  );
                }}
              >
                <Form className="account__form">
                  {errorInfo["email"].error && (
                    <p className="account__error">{errorInfo["email"].text} </p>
                  )}
                  <Input name="email" label="Email address" />
                  <Input
                    name="password"
                    label="Current password"
                    type="password"
                  />
                  <div className="account__buttons-container">
                    <button
                      className="account__button account__button_type_cancel"
                      onClick={() => {
                        handleEdit("email");
                      }}
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="account__button account__button_type_success"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              </Formik>
            </>
          )}
        </div>

        <div className="account__info-section">
          {userInfo["phone"] === "save" ? (
            <>
              <p className="account__info-title">Phone number</p>
              <p className="account__info-field">
                {user["phone"] || " Add phone number"}
              </p>
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
              <Formik
                initialValues={{
                  phone: user.phone || "",
                }}
                validationSchema={PhoneSchema}
                onSubmit={(value) => {
                  editUser(value);
                  handleEdit("phone");
                }}
              >
                <Form className="account__form">
                  <Input name="phone" label="Phone number" />

                  <div className="account__buttons-container">
                    <button
                      className="account__button account__button_type_cancel"
                      onClick={() => {
                        handleEdit("phone");
                      }}
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="account__button account__button_type_success"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              </Formik>
            </>
          )}
        </div>

        <div className="account__info-section">
          {userInfo["password"] === "save" ? (
            <>
              <p className="account__info-title">Password</p>
              <p className="account__info-field">*********</p>
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
              <Formik
                initialValues={{
                  password: "",
                  newPassword: "",
                }}
                validationSchema={PasswordSchema}
                onSubmit={(value) => {
                  changePassword(
                    user.email,
                    value.password,
                    value.newPassword,
                    (field, text) => handleError(field, text),
                    () => handleEdit("password")
                  );
                }}
              >
                <Form className="account__form">
                  {errorInfo["password"].error && (
                    <p className="account__error">
                      {errorInfo["password"].text}{" "}
                    </p>
                  )}
                  <Input
                    name="password"
                    label="Current password"
                    type="password"
                  />
                  <Input
                    name="newPassword"
                    label="New password"
                    type="password"
                  />

                  <div className="account__buttons-container">
                    <button
                      className="account__button account__button_type_cancel"
                      onClick={() => {
                        handleEdit("password");
                      }}
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="account__button account__button_type_success"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              </Formik>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
