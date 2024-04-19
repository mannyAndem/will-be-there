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

// Still need to test.
// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.status === 401) {
//       console.error(error);
//       const refresh_token = localStorage.getItem("refresh_token");
//       const data = { refresh_token };
//       const originalRequestConfig = error.config;

//       try {
//         const res = await axios.post("auth/refresh", JSON.stringify(data), {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const token = res.data.token.access_token;
//         localStorage.setItem("access_token", token);
//         axios.request(originalRequestConfig);
//       } catch (error) {
//         return Promise.reject(error);
//       }
//     }
//   }
// );

export default axios;
