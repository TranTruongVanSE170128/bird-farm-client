import axios from 'axios'

export const birdFarmApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`
})
