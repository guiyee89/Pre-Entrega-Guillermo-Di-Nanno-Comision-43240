import { useNavigate } from "react-router-dom";
import { Login } from "./Login";
import { login, loginWithGoogle } from "../../../../firebaseConfig";
import { useFormik } from "formik";
import * as Yup from "yup";

export const LoginContainer = () => {

    const navigate = useNavigate();

    const { handleSubmit, handleChange, errors } = useFormik({
      initialValues : {
        email: "",
        password: "",
      },
      onSubmit : async (values) => {
        let res = await login(values);
        navigate("/");
        return res
      },
      validateOnChange: false,
      validationSchema : Yup.object({
        email: Yup.string().email("Invalid email address").required("an email is required"),
        password: Yup.string().required("a password is required").min(6, "a minimum of 6 characters"),
      })
    })

    const handleSubmitGoogle = async() => {
        let res = await loginWithGoogle()
        navigate("/")
        return res
    }


  return (
    <Login
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleSubmitGoogle={handleSubmitGoogle}
      errors={errors}
    />
  );
};
