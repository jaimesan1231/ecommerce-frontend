import * as Yup from "yup";
export const addressSchema = Yup.object().shape({
  country: Yup.string().required("Please enter a country."),
  name: Yup.string().required("Please enter a name."),
  address: Yup.string().required("Please enter an address."),
  city: Yup.string().required("Please enter a city name."),
  state: Yup.string(),
  zip: Yup.string().required("Please enter a ZIP or postal code."),
  phone: Yup.string().required(
    "Please enter a phone number so we can call if there are any issues with delivery."
  ),
});
