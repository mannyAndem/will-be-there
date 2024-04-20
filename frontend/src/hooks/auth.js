/**
 * File contains hooks to handle authentication
 */

import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuthContext } from "../contexts/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";

export const useGetCurrentUser = () => {
  const { user, setUser } = useAuthContext();
  const { data, isSuccess, isPending, isError, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => axios.get("auth/me"),
    enabled: false,
  });

  useEffect(() => {
    if (!user) {
      refetch();
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setUser(data.data.user);
    }
    if (isError) {
      console.error(error);
    }
  }, [isSuccess, isError]);

  return { isSuccess, isError, isPending };
};

export const useLogin = () => {
  const { isError, isPending, isSuccess, error, mutate, data } = useMutation({
    mutationFn: async (data) =>
      axios.post("auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }),
  });

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("access_token", data?.data?.token.access_token);
      localStorage.setItem("refresh_token", data?.data?.token.refresh_token);
    }
  }, [isSuccess, data]);

  return { login: mutate, isSuccess, isError, isPending, error };
};

export const useSignup = () => {
  const { isError, isPending, isSuccess, data, error, mutate } = useMutation({
    mutationFn: async (data) =>
      axios.post("auth/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }),
  });

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("access_token", data?.data?.token.access_token);
      localStorage.setItem("refresh_token", data?.data?.token.refresh_token);
    }
  }, [isSuccess, data]);

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
      setIsPending(true);
      try {
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
      } catch (error) {
        console.error(error);
        setIsPending(false);
        setIsError(true);
        setError(error);
      }
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
