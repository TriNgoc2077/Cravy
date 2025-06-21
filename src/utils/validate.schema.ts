import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email has format email!")
    .required("Email is required!"),
  password: Yup.string()
    .min(2, "Password minimum 6 characters!")
    .max(50, "Password maximum 50 characters!")
    .required("Password is required!"),
});

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "FullName minimum 3 characters!")
    .required("FullName is required!"),
  email: Yup.string()
    .email("Email has format email!")
    .required("Email is required!"),
  password: Yup.string()
    .min(2, "Password minimum 6 characters!")
    .max(50, "Password maximum 50 characters!")
    .required("Password is required!"),
});
