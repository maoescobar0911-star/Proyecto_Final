import axios from 'axios'
import { getToken } from './session'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

function normalizarError(error) {
  const message =
    error?.response?.data?.msg ||
    error?.response?.data?.error ||
    error?.message ||
    'Error de servidor'

  throw new Error(message)
}

export async function postJson(path, body) {
  try {
    const { data } = await apiClient.post(path, body)
    return data
  } catch (error) {
    normalizarError(error)
  }
}

export async function getJson(path) {
  try {
    const { data } = await apiClient.get(path)
    return data
  } catch (error) {
    normalizarError(error)
  }
}

export async function putJson(path, body) {
  try {
    const { data } = await apiClient.put(path, body)
    return data
  } catch (error) {
    normalizarError(error)
  }
}

export async function deleteJson(path) {
  try {
    const { data } = await apiClient.delete(path)
    return data
  } catch (error) {
    normalizarError(error)
  }
}

export { apiClient }
