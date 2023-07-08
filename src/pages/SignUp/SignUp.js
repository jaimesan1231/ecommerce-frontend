import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import Input from "../../components/Input/Input";
import { RegisterSchema } from "../../Schemas";
import { registerUser } from "../../utils/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const handleSignUp = async (data, onError, onSuccess) => {
    await registerUser(data, onError, onSuccess);
  };
  const handleError = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 4000);
  };

  return (
    <div className="signup">
      <h2 className="signup__title">Create an account</h2>
      {showError && <p className="signup__error">Email already in use</p>}
      <Formik
        initialValues={{
          email: "",
          password: "",
          name: "",
          lastname: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          handleSignUp(
            values,
            () => handleError(),
            () => navigate("/")
          );
        }}
      >
        <Form className="signup__form">
          <Input name="name" label="Name" />
          <Input name="lastname" label="Last name" />
          <Input name="email" label="Email" />
          <Input name="password" label="Password" type="password" />
          <button className="signup__button">Create account</button>
        </Form>
      </Formik>

      <p className="signin__register">
        Already have an account?{" "}
        <Link to="/signin" className="signin__link">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
