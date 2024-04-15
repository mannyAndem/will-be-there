import { Formik } from "formik";
import InputGroup from "../../../../ui/InputGroup/InputGroup";
import Button from "../../../../ui/Button/Button";
import "./reset-password-form.scss";
import * as yup from "yup";
import { useResetPassword } from "../../../../hooks/auth";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

const ResetPasswordForm = () => {
  const { resetPassword, isPending, isSuccess, isError, error } =
    useResetPassword();

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password should be atleast 6 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const handleSubmit = (values) => {
    const data = {
      token: searchParams.get("token"),
      newPassword: values.password,
    };

    resetPassword(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password reset successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
    if (isError) {
      console.error(error);
      toast.error("Something went wrong, try again?");
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Toaster containerStyle={{ fontFamily: "Montserrat" }} />
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <form className="reset-password-form" onSubmit={handleSubmit}>
            <InputGroup
              name="password"
              error={touched.password && errors.password}
            >
              <InputGroup.Label>Password</InputGroup.Label>
              <InputGroup.Input
                type="password"
                placeholder="Input new password"
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
                placeholder="Confirm password"
                value={values.confirmPassword}
                onChange={handleChange}
              />
            </InputGroup>
            <div className="button-container">
              <Button pending={isPending}>Change Password</Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ResetPasswordForm;
