import { Field, Formik } from "formik";
import InputGroup from "../../../../ui/InputGroup/InputGroup";
import "./signup-form.scss";

const SignupForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, touched, errors, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <InputGroup name="name">
            <InputGroup.Label>Full Name</InputGroup.Label>
            <InputGroup.Input placeholder="Enter your full name" />
          </InputGroup>
          <InputGroup name="email">
            <InputGroup.Label>Email</InputGroup.Label>
            <InputGroup.Input placeholder="Enter your email" />
          </InputGroup>
          <InputGroup name="password">
            <InputGroup.Label>Password</InputGroup.Label>
            <InputGroup.Input placeholder="Enter your password" />
          </InputGroup>
          <InputGroup name="confirmPassword">
            <InputGroup.Label>Confirm Password</InputGroup.Label>
            <InputGroup.Input placeholder="Confirm your password" />
          </InputGroup>
          <button className="signup-btn">Sign Up</button>
        </form>
      )}
    </Formik>
  );
};

export default SignupForm;
