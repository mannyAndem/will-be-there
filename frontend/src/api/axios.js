import defaultAxios from 'axios'

const axios = defaultAxios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
})

axios.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('access_token')

  console.log(token)
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    }
  }

  return config
})

export default axios
