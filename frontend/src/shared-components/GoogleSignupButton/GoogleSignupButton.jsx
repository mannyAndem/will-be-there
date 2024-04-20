/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useGoogleAuth, useLogin, useSignup } from "../../hooks/auth";
import "./google-signup-button.scss";

const GoogleSignupButton = ({ type }) => {
  const navigate = useNavigate();
  const { isError, isSuccess, googleLogin, isPending, error } =
    useGoogleAuth(type);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Signed in successfully");
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
      <button
        className="signup-with-google"
        onClick={googleLogin}
        disabled={isPending}
      >
        <FcGoogle size={30} />
        Sign In with Google
      </button>
    </>
  );
};

export default GoogleSignupButton;
