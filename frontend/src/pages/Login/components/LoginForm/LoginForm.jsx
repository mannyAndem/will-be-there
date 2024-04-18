import { Formik } from "formik";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useLogin } from "../../../../hooks/auth";
import Button from "../../../../ui/Button/Button";
import InputGroup from "../../../../ui/InputGroup/InputGroup";
import "./login-form.scss";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const { login, isPending, isSuccess, isError, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    login({ ...values, provider: "local" });
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
            <div>
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
              <Link className="forgot-pass" to="/forgot-password">
                Forgot Password?
              </Link>
            </div>
            <div className="button-container">
              <Button pending={isPending}>Sign in</Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
