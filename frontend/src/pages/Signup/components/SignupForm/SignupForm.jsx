import { Formik } from "formik";
import InputGroup from "../../../../ui/InputGroup/InputGroup";
import * as yup from "yup";
import "./signup-form.scss";
import { useSignup } from "../../../../hooks/auth";
import { useEffect } from "react";
import Button from "../../../../ui/Button/Button";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { signup, isPending, isSuccess, isError, error } = useSignup();
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password should be atleast 6 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const handleSubmit = (values) => {
    const { confirmPassword, ...data } = values;

    signup(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast("Signed up successfully.");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }

    if (isError) {
      if (error.response?.data?.status === 500) {
        toast.error("Something went wrong on our end");
      } else {
        toast.error(error.response?.data?.message ?? "Something went wrong");
      }
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
            <InputGroup name="name" error={touched.name && errors.name}>
              <InputGroup.Label>Full Name</InputGroup.Label>
              <InputGroup.Input
                placeholder="Enter your full name"
                value={values.name}
                onChange={handleChange}
              />
            </InputGroup>
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
            <InputGroup
              name="confirmPassword"
              error={touched.confirmPassword && errors.confirmPassword}
            >
              <InputGroup.Label>Confirm Password</InputGroup.Label>
              <InputGroup.Input
                type="password"
                placeholder="Confirm your password"
                value={values.confirmPassword}
                onChange={handleChange}
              />
            </InputGroup>
            <Button pending={isPending}>Sign up</Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;
