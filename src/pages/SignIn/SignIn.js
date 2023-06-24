import React, { useState } from "react";
import "./SignIn.css";
import { getUserData, loginUser } from "../../utils/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const handleSignIn = async (e) => {
    e.preventDefault();
    const user = await loginUser(data.email, data.password);
    if (user) {
      const userData = await getUserData(user.uid);
      if (userData) {
        const { name, lastname } = userData;
        console.log(userData);
        const previousPath = location.state?.from || "/";
        navigate(previousPath);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  return (
    <div className="signin">
      <h2 className="signin__title">Login</h2>
      <form action="#" className="signin__form">
        <div className="signin__form-section">
          <input
            type="text"
            className="signin__input"
            name="email"
            required
            onChange={handleChange}
          />
          <label htmlFor="email" className="signin__label">
            <span>Email</span>
          </label>
        </div>
        <div className="signin__form-section">
          <input
            type="password"
            className="signin__input"
            name="password"
            required
            onChange={handleChange}
          />
          <label htmlFor="password" className="signin__label">
            <span>Password</span>
          </label>
        </div>
      </form>
      <button className="signin__button" onClick={handleSignIn}>
        Sign in
      </button>
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
