import * as Yup from "yup";

const fullName = Yup.string().required("Full name is required").min(2, "Full name must be at least 2 characters");

const email = Yup.string().email("Invalid email address").required("Email is required");

const password = Yup.string().required("Password is required").min(8, "Password must be at least 8 characters");

const confirmPassword = Yup.string()
  .oneOf([Yup.ref("password")], "Passwords must match")
  .required("Confirm password is required");
const phoneNumber = Yup.string()
  .matches(/^[0-9]+$/, "Phone number must be digits")
  .min(10, "Phone number must be at least 10 digits")
  .required("Phone number is required");

const dateOfBirth = Yup.date().nullable().required("Date of birth is required");

// const url = Yup.string().url("Invalid URL").required("URL is required");

const validationSchemas = {
  register: Yup.object({
    fullName,
    email,
    password,
    confirmPassword,
  }),

  login: Yup.object({
    email,
    password,
  }),

  profile: Yup.object({
    fullName,
    phoneNumber,
    dateOfBirth,
  }),

  customSchema: (schemaObj: any) => Yup.object(schemaObj),
};

export default validationSchemas;
