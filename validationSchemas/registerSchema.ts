import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

const registerSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup.string().min(5).required("Required").matches(passwordRules, {
    message:
      "min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.",
  }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Required"),
});
export default registerSchema;
