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
  const addOrder = useUserStore((state) => state.addOrder);
  const addAddress = useUserStore((state) => state.addAddress);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [addressError, setAddressError] = useState(false);

  useEffect(() => {
    if (user.addresses?.length > 0) {
      setSelectedAddress(user.addresses[0].id);
    }
  }, []);
  const handleChangeAddress = (addressId) => {
    setSelectedAddress(addressId);
  };

  return (
    <div className="checkout">
      <div className="checkout__cart-section">
        <h2 className="checkout__section-title">Review Item And Shipping</h2>
        <ul className="checkout__items">
          {cart.items.map((item) => (
            <CartItem item={item} key={item.id} />
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
            if (selectedAddress !== "") {
              const currentAddress = user.addresses.find(
                (address) => address.id === selectedAddress
              );
              addOrder(currentAddress, value.card);
              setConfirmOrder(true);
            } else {
              setAddressError(true);
              setTimeout(() => {
                setAddressError(false);
              }, 4000);
            }
          }}
        >
          <Form noValidate className="checkout__form">
            <Input name="email" label="Email" />

            <Input name="name" label="Card Holder Name" />

            <Input name="card" label="Card Number" />

            <Input name="expiry" label="Expiry" placeholder="mm/yy" />

            <Input name="cvc" label="CVC" />
            <div className="checkout__subtotal">
              <p>Sub Total</p>
              <p>${cart.subTotal.toFixed(2)}</p>
            </div>
            <button className="checkout__button">
              Pay ${cart.subTotal.toFixed(2)}
            </button>
          </Form>
        </Formik>
      </div>

      <div className="checkout__delivery-section">
        <h2 className="checkout__section-title">Delivery Information</h2>
        {addressError && (
          <p className="checkout__address-error">Select an address</p>
        )}
        <div className="checkout__address-list">
          {user.addresses &&
            user.addresses.map((address) => (
              <AddressRadio
                address={address}
                key={address.id}
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
        {openPopup && (
          <AddressPopup
            onClose={() => setOpenPopup(false)}
            onSubmit={(values) => addAddress(values)}
          />
        )}
      </div>
      {confirmOrder && <Loading />}
    </div>
  );
};

export default Checkout;
