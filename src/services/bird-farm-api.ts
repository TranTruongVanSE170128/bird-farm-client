import axios from 'axios'

export const birdFarmApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`
})

birdFarmApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')

  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`
  }

  return config
})
