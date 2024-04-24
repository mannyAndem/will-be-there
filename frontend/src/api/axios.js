import defaultAxios from "axios";
import { queryClient } from "../react-query/react-query";

const axios = defaultAxios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

axios.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.setAuthorization(`Bearer ${token}`);
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const initialRequest = error.config;
    const refresh_token = localStorage.getItem("refresh_token");

    if (
      error.response?.status === 401 &&
      !initialRequest._retry &&
      refresh_token
    ) {
      initialRequest._retry = true;
      const data = { refresh_token };
      try {
        const res = await axios.post("auth/refresh", JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(res);
        const access_token = res.data.token.access_token;
        localStorage.setItem("access_token", access_token);
        initialRequest.headers.setAuthorization(`Bearer ${access_token}`);
      } catch (error) {
        // localStorage.removeItem("access_token");
        // localStorage.removeItem("refresh_token");

        queryClient.invalidateQueries({ queryKey: ["user"] });
      }

      return axios(initialRequest);
    }

    return Promise.reject(error);
  }
);

export default axios;
