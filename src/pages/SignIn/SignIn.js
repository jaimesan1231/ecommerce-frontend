import React, { useState } from "react";
import "./SignIn.css";
import { getUserData, loginUser } from "../../utils/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import Input from "../../components/Input/Input";
import { EmailSchema } from "../../Schemas";

const SignIn = () => {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleSignIn = async (email, password, callback) => {
    const user = await loginUser(email, password, callback);
    if (user) {
      const userData = await getUserData(user.uid);
      if (userData) {
        const previousPath = location.state?.from || "/";
        navigate(previousPath);
      }
    }
  };
  const onError = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 4000);
  };
  return (
    <div className="signin">
      <h2 className="signin__title">Login</h2>
      {showError && (
        <p className="signin__error">
          Sorry, unrecognised username or password
        </p>
      )}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={EmailSchema}
        onSubmit={(values) => {
          handleSignIn(values.email, values.password, () => onError());
        }}
      >
        <Form className="signin__form">
          <Input name="email" label="Email" />
          <Input name="password" label="Password" type="password" />
          <button className="signin__button">Sign in</button>
        </Form>
      </Formik>
      <p className="signin__register">
        Not a member yet?{" "}
        <Link to="/signup" className="signin__link">
          Register now
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
