import defaultAxios from "axios";

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

    if (error.status === 401 && !initialRequest._retry) {
      initialRequest._retry = true;

      const refresh_token = localStorage.getItem("refresh_token");
      const data = { refresh_token };
      const res = await axios.post("auth/refresh", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res);
      const access_token = res.data.token.access_token;
      localStorage.setItem("access_token", access_token);

      initialRequest.headers.setAuthorization(`Bearer ${token}`);

      return axios(initialRequest);
    }

    return Promise.reject(error);
  }
);

export default axios;
