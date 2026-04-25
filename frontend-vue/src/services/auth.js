import { postJson } from './api'

export function loginRequest(credentials) {
  return postJson('/auth/login', credentials)
}

export function registerRequest(payload) {
  return postJson('/auth/register', payload)
}
