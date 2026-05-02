import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { clearSession, getSession, getToken, saveSession } from '../services/session'

export const useSessionStore = defineStore('session', () => {
  const user = ref(getSession())
  const token = ref(getToken())

  const isAuthenticated = computed(() => Boolean(user.value))
  const isAdmin = computed(() => user.value?.rol === 'admin')

  function hydrate() {
    user.value = getSession()
    token.value = getToken()
  }

  function setSession(payload: unknown) {
    saveSession(payload)
    hydrate()
  }

  function logout() {
    clearSession()
    hydrate()
  }

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    hydrate,
    setSession,
    logout,
  }
})
