import { Formik } from "formik";
import InputGroup from "../../../../ui/InputGroup/InputGroup";
import "./login-form.scss";
import Button from "../../../../ui/Button/Button";
import { useLogin } from "../../../../hooks/auth";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const { login, isPending, isSuccess, isError, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    login(values);
  };

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .required("This field is required")
      .email("Invalid email"),
    password: yup.string().required("This field is required"),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged in successfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    if (isError) {
      toast.error(error.response?.data?.message ?? "Something went wrong");
    }
  }, [isSuccess, isError]);
  return (
    <>
      <Toaster containerStyle={{ fontFamily: "Montserrat" }} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={formSchema}
      >
        {({ values, touched, errors, handleSubmit, handleChange }) => (
          <form onSubmit={handleSubmit}>
            <InputGroup name="email" error={touched.email && errors.email}>
              <InputGroup.Label>Email</InputGroup.Label>
              <InputGroup.Input
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup
              name="password"
              error={touched.password && errors.password}
            >
              <InputGroup.Label>Password</InputGroup.Label>
              <InputGroup.Input
                type="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
              />
            </InputGroup>
            <Link className="forgot-pass">Forgot Password?</Link>
            <Button pending={isPending}>Sign in</Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;