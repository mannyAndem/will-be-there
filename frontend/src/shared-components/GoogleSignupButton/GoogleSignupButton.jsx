/* eslint-disable react/prop-types */
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useLogin, useSignup } from "../../hooks/auth";
import "./google-signup-button.scss";

const GoogleSignupButton = ({ type }) => {
  const { error, isError, isSuccess, signup } = useSignup();
  const {
    error: loginError,
    isError: isLoginError,
    isSuccess: isLoginSuccess,
    login,
  } = useLogin();
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);

      if (type === "signup") {
        const data = {
          email: userInfo?.email,
          name: userInfo?.name,
          provider: "google",
        };

        signup(data);
      } else {
        const data = {
          email: userInfo?.email,
          provider: "google",
        };

        login(data);
      }
    },
  });

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("Logged in successfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    if (isLoginError) {
      toast.error(
        loginError?.response?.data?.message ?? "Something went wrong"
      );
    }
  }, [isLoginError, isLoginSuccess, loginError, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    }

    if (isSuccess) {
      toast.success("Signed up successfully");
      setTimeout(() => {
        navigate("/");
      });
    }
  }, [isError, isSuccess, error, navigate]);

  return (
    <>
      <Toaster containerStyle={{ fontFamily: "Montserrat" }} />
      <button className="signup-with-google" onClick={googleLogin}>
        <FcGoogle size={30} />
        Sign In with Google
      </button>
    </>
  );
};

export default GoogleSignupButton;

GoogleSignupButton.defaultProps = {
  type: "login",
};
