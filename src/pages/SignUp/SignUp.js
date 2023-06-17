import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./SignUp.css";
import { auth, usersCollection } from "../../db/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      await setDoc(doc(usersCollection, user.uid), {
        name: data.name,
        lastname: data.lastname,
      });
      console.log("User registered:", user);
    } catch (error) {
      console.log("Error en el registro:", error);
    }
    console.log(data);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    console.log(data);
  };
  return (
    <div className="signup">
      <h2 className="signup__title">Create an account</h2>
      <form action="#" className="signup__form">
        <div className="signup__form-section">
          <input
            type="text"
            className="signup__input"
            name="name"
            required
            onChange={handleChange}
          />
          <label htmlFor="name" className="signup__label">
            <span>Name</span>
          </label>
        </div>
        <div className="signup__form-section">
          <input
            type="text"
            className="signup__input"
            name="lastname"
            required
            onChange={handleChange}
          />
          <label htmlFor="lastname" className="signup__label">
            <span>LastName</span>
          </label>
        </div>
        <div className="signup__form-section">
          <input
            type="text"
            className="signup__input"
            name="email"
            required
            onChange={handleChange}
          />
          <label htmlFor="email" className="signup__label">
            <span>Email</span>
          </label>
        </div>
        <div className="signup__form-section">
          <input
            type="password"
            className="signup__input"
            name="password"
            required
            onChange={handleChange}
          />
          <label htmlFor="password" className="signup__label">
            <span>Password</span>
          </label>
        </div>
      </form>
      <button className="signup__button" onClick={handleSignUp}>
        Create account
      </button>
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
