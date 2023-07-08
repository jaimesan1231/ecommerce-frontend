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
  expiry: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, "The format should be mm/yy")
    .required("Expiry date is required"),
  cvc: Yup.string().required("CVC is required"),
});

export const FullNameSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  lastname: Yup.string().required("Last name is required"),
});

export const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const PhoneSchema = Yup.object().shape({
  phone: Yup.string().required("Phone number is required"),
});

export const PasswordSchema = Yup.object().shape({
  password: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(6, "New password should be at least 6 characters")
    .required("New password is required"),
});

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password should be at least 6 characters")
    .required("Password is required"),
  name: Yup.string().required("Name is required"),
  lastname: Yup.string().required("Last name is required"),
});
