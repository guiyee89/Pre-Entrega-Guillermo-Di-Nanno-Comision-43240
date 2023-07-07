import { useNavigate } from "react-router-dom";
import { SignUp } from "./SignUp";
import { useFormik } from "formik";
import { loginWithGoogle, register } from "../../../../firebaseConfig";
import * as Yup from "yup";

export const SignUpContainer = () => {
  const navigate = useNavigate();

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      let res = await register(values);
      navigate("/login");
      return res 
    },

    validateOnChange: false,

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "A minimum of 6 characters is required"),
    }),
  });

  //Login con Google
  const handleSubmitGoogle = async () => {
    let res = await loginWithGoogle();
    navigate("/");
    return res;
  };

  return (
    <SignUp
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleSubmitGoogle={handleSubmitGoogle}
      errors={errors}
    />
  );
};
