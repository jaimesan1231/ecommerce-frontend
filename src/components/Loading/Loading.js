import React, { useEffect, useState } from "react";
import "./Loading.css";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    document.body.classList.add("no-overflow");
    return () => {
      document.body.classList.remove("no-overflow");
    };
  }, []);
  const handleButtonClick = () => {
    navigate("/orders");
  };
  return isLoading ? (
    <div className="loading">
      <h2 className="loading__title">Confirming Order</h2>
      <p className="loading__subtitle">
        Please wait, we are processing your purchase request
      </p>
      <i className="loading__circle-preloader"></i>
    </div>
  ) : (
    <div className="loading">
      <h2 className="loading__title">Thank you!</h2>
      <p className="loading__subtitle">Your order has been placed</p>
      <button className="loading__button" onClick={handleButtonClick}>
        Review your orders
      </button>
    </div>
  );
};

export default Loading;
