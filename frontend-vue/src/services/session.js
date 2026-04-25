const SESSION_KEY = 'planner-session'
const USERS_KEY = 'planner-users'
const DIETAS_KEY = 'planner-dietas'

export function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
}

export function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function getLocalUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
}

export function saveLocalUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getLocalDietas() {
  return JSON.parse(localStorage.getItem(DIETAS_KEY) || '[]')
}

export function saveLocalDietas(dietas) {
  localStorage.setItem(DIETAS_KEY, JSON.stringify(dietas))
}
