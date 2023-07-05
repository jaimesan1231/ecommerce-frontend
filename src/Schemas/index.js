import * as Yup from "yup";
export const AddressSchema = Yup.object().shape({
  country: Yup.string().required("Please enter a country."),
  name: Yup.string().required("Please enter a name."),
  address: Yup.string().required("Please enter an address."),
  city: Yup.string().required("Please enter a city name."),
  state: Yup.string().required("Please enter a city name."),
  zip: Yup.string().required("Please enter a ZIP or postal code."),
  phone: Yup.string().required(
    "Please enter a phone number so we can call if there are any issues with delivery."
  ),
});

export const PaymentSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  name: Yup.string().required("Name is required"),
  card: Yup.string().required("Card number is required"),
  expiry: Yup.string().required("Expiry date is required"),
  cvc: Yup.string().required("CVC is required"),
});
