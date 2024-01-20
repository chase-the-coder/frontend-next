import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, {
      message:
        "min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.",
    })
    .required("Required"),
});
export default loginSchema;
