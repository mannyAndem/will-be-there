import { Formik } from "formik";
import InputGroup from "../../../../ui/InputGroup/InputGroup";
import Button from "../../../../ui/Button/Button";
import "./forgot-password-form.scss";
import * as yup from "yup";
import { useForgotPassword } from "../../../../hooks/auth";
import { Toaster, toast } from "react-hot-toast";
import { useEffect } from "react";

const ForgotPasswordForm = () => {
  const initialValues = {
    email: "",
  };

  const { isError, isPending, isSuccess, error, trigger } = useForgotPassword();

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
  });

  const handleSubmit = (values) => {
    trigger(values);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("We've sent a mail. Check your inbox for next steps.");
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
        {({ values, touched, errors, handleChange, handleSubmit }) => (
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <InputGroup name="email" error={touched.email && errors.email}>
              <InputGroup.Label>Email</InputGroup.Label>
              <InputGroup.Input
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
              />
            </InputGroup>
            <div className="button-container">
              <Button pending={isPending}>Submit</Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPasswordForm;
