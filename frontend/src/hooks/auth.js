/**
 * File contains hooks to handle authentication
 */

import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuthContext } from "../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentUser = (enabled) => {
  const { setUser } = useAuthContext();
  const { data, isSuccess, isPending, isError, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get("auth/me");
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      return res.data.user;
    },
    enabled: enabled ?? true,
  });

  return { isSuccess, isError, isPending, refetch };
};

export const useLogin = () => {
  const { setUser } = useAuthContext();
  const { refetch } = useGetCurrentUser(false);

  const { isError, isPending, isSuccess, error, mutate, data } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post("auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      });
      localStorage.setItem("access_token", res?.data?.token.access_token);
      localStorage.setItem("refresh_token", res?.data?.token.refresh_token);

      await refetch();
      // const userRes = await axios.get("auth/me");
      // console.log(userRes);
      // localStorage.setItem("user", JSON.stringify(userRes.data.user));
      // setUser(userRes.data.user);
      // return userRes.data.user;
    },
  });

  return { login: mutate, isSuccess, isError, isPending, error };
};

export const useSignup = () => {
  const { setUser } = useAuthContext();
  const { refetch } = useGetCurrentUser();

  const { isError, isPending, isSuccess, data, error, mutate } = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post("auth/register", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("access_token", res?.data?.token.access_token);
      localStorage.setItem("refresh_token", res?.data?.token.refresh_token);

      // getting current user
      await refetch();
      // const userRes = await axios.get("auth/me");

      // localStorage.setItem("user", JSON.stringify(userRes.data.user));

      // setUser(userRes.data.user);
      // return userRes.data.user;
    },
  });

  return { signup: mutate, isSuccess, isError, isPending, error };
};

export const useForgotPassword = () => {
  const { mutate, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async (data) =>
      axios.post("auth/forgot-password", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }),
  });

  return { isSuccess, isPending, isError, error, trigger: mutate };
};

export const useResetPassword = () => {
  const { isSuccess, isError, isPending, error, mutate } = useMutation({
    mutationFn: async (data) =>
      axios.post("auth/change-password", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }),
  });

  return { isSuccess, isError, isPending, error, resetPassword: mutate };
};

export const useGoogleAuth = (type) => {
  // state flags
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const {
    error: signupError,
    isError: isSignupError,
    isSuccess: isSignupSuccess,
    signup,
  } = useSignup();
  const {
    error: loginError,
    isError: isLoginError,
    isSuccess: isLoginSuccess,
    login,
  } = useLogin();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      setIsPending(true);
      const res = await axios.post("auth/google-login", {
        token: tokenResponse.access_token,
      });

      console.log(res);
      // try {
      //   const userInfo = await axios
      //     .get('https://www.googleapis.com/oauth2/v3/userinfo', {
      //       headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      //     })
      //     .then((res) => res.data)

      //   if (type === 'signup') {
      //     const data = {
      //       email: userInfo?.email,
      //       name: userInfo?.name,
      //       provider: 'google',
      //     }

      //     signup(data)
      //   } else {
      //     const data = {
      //       email: userInfo?.email,
      //       provider: 'google',
      //     }

      //     login(data)
      //   }
      // } catch (error) {
      //   console.error(error)
      //   setIsPending(false)
      //   setIsError(true)
      //   setError(error)
      // }
    },
  });

  useEffect(() => {
    if (isSignupError || isLoginError) {
      console.error(loginError ?? signupError);
      setIsError(true);
      setError(loginError ?? signupError);
      setIsPending(false);
    }
    if (isLoginSuccess || isSignupSuccess) {
      setIsSuccess(true);
      setIsPending(false);
    }
  }, [isSignupError, isLoginError, isSignupSuccess, isLoginSuccess]);

  return { isSuccess, isError, isPending, googleLogin, error };
};
