import React, { useEffect, useState } from "react";
import "./Checkout.css";
import CartItem from "../../components/CartItem/CartItem";
import useCartStore from "../../store/cartStore";
import useUserStore from "../../store/userStore";
import AddressRadio from "../../components/AddressRadio/AddressRadio";
import AddressPopup from "../../components/AddressPopup/AddressPopup";
import { Form, Formik } from "formik";
import Input from "../../components/Input/Input";
import { PaymentSchema } from "../../Schemas";
import Loading from "../../components/Loading/Loading";

const Checkout = () => {
  const cart = useCartStore((state) => state.cart);
  const user = useUserStore((state) => state.user);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  useEffect(() => {
    if (user.addresses) {
      setSelectedAddress(user.addresses[0].id);
    }
  }, []);
  const handleChangeAddress = (addressId) => {
    setSelectedAddress(addressId);
  };
  const handleChange = () => {
    console.log("aea");
  };
  const handleSubmit = () => {
    setConfirmOrder(true);
    setTimeout(() => {
      console.log("termino los dos segundos");
      setConfirmOrder(false);
    }, 4000);
  };

  console.log(user);
  return (
    <div className="checkout">
      <div className="checkout__cart-section">
        <h2 className="checkout__section-title">Review Item And Shipping</h2>
        <ul className="checkout__items">
          {cart.items.map((item) => (
            <CartItem item={item} />
          ))}
        </ul>
      </div>
      <div className="checkout__payment-section">
        <h2 className="checkout__section-title">Payment Details</h2>
        <Formik
          initialValues={{
            email: "",
            name: "",
            card: "",
            expiry: "",
            cvc: "",
          }}
          validationSchema={PaymentSchema}
          onSubmit={(value) => {
            console.log(value);
            // addAddress(value);
          }}
        >
          <Form noValidate className="checkout__form">
            <Input name="email" label="Email" onChange={handleChange} />

            <Input
              name="name"
              label="Card Holder Name"
              onChange={handleChange}
            />

            <Input name="card" label="Card Number" onChange={handleChange} />

            <Input
              name="expiry"
              label="Expiry"
              onChange={handleChange}
              placeholder="mm/aa"
            />

            <Input name="cvc" label="CVC" onChange={handleChange} />
          </Form>
        </Formik>
        <div className="checkout__subtotal">
          <p>Sub Total</p>
          <p>${cart.subTotal.toFixed(2)}</p>
        </div>
        <button className="checkout__button" onClick={handleSubmit}>
          Pay ${cart.subTotal.toFixed(2)}
        </button>
      </div>

      <div className="checkout__delivery-section">
        <h2 className="checkout__section-title">Delivery Information</h2>
        <div className="checkout__address-list">
          {user.addresses &&
            user.addresses.map((address, index) => (
              <AddressRadio
                address={address}
                onChange={handleChangeAddress}
                isSelected={selectedAddress === address.id ? true : false}
              />
            ))}
          <button
            className="checkout__address-button"
            onClick={() => setOpenPopup(true)}
          >
            Add Address
          </button>
        </div>
        {openPopup && <AddressPopup onClose={() => setOpenPopup(false)} />}
      </div>
      {confirmOrder && <Loading />}
    </div>
  );
};

export default Checkout;
