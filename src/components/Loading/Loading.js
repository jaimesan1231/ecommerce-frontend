import React, { useEffect, useState } from "react";
import "./Loading.css";

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    document.body.classList.add("no-overflow");
    return () => {
      document.body.classList.remove("no-overflow");
    };
  }, []);
  return isLoading ? (
    <div className="loading">
      <h2 className="loading__title">Confirming Order</h2>
      <p className="loading__subtitle">
        Please wait, we are processing your purchase request
      </p>
      <i class="loading__circle-preloader"></i>
    </div>
  ) : (
    <div className="loading">
      <h2 className="loading__title">Thank you!</h2>
      <p className="loading__subtitle">Your order has been placed</p>
    </div>
  );
};

export default Loading;
