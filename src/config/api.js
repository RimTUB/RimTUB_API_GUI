import axios from 'axios'

const API_CONFIG = axios.create({
  baseURL: 'http://65.108.157.234:2222',
})

export const URL = 'api.rimtub.pp.ua'

API_CONFIG.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API_CONFIG
