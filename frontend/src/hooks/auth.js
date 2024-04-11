/**
 * File contains hooks to handle authentication
 */

import { useMutation } from "@tanstack/react-query";
import axios from "../api/axios";
import { useAuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";

export const useLogin = () => {
  const { setTokens, tokens } = useAuthContext();

  console.log(tokens);
  const { isError, isPending, isSuccess, data, error, mutate } = useMutation({
    mutationFn: (data) =>
      axios.post("auth/login", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      }),
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setTokens(data.data.token);
    }
    if (isError) {
      console.error(error);
    }
  }, [isSuccess, isError]);

  return { login: mutate, isSuccess, isError, isPending, error };
};

export const useSignup = () => {
  const { setTokens, tokens } = useAuthContext();

  const { isError, isPending, isSuccess, data, error, mutate } = useMutation({
    mutationFn: (data) =>
      axios.post(
        "auth/register",
        JSON.stringify({ ...data, provider: "local" }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setTokens(data.data.token);
    }
    if (isError) {
      console.error(error);
    }
  }, [isSuccess, isError]);

  return { signup: mutate, isSuccess, isError, isPending, error };
};
