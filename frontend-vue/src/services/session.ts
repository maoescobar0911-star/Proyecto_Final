const SESSION_KEY = 'planner-session'
const USERS_KEY = 'planner-users'
const DIETAS_KEY = 'planner-dietas'
const PROGRESO_KEY = 'planner-progreso'

function limpiarSesionAntigua() {
  localStorage.removeItem(SESSION_KEY)
}

export function getSession() {
  limpiarSesionAntigua()
  return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null')
}

export function saveSession(user: unknown) {
  limpiarSesionAntigua()
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEY)
  limpiarSesionAntigua()
}

export function getLocalUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
}

export function saveLocalUsers(users: unknown) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function getLocalDietas() {
  return JSON.parse(localStorage.getItem(DIETAS_KEY) || '[]')
}

export function saveLocalDietas(dietas: unknown) {
  localStorage.setItem(DIETAS_KEY, JSON.stringify(dietas))
}

export function getLocalProgreso() {
  return JSON.parse(localStorage.getItem(PROGRESO_KEY) || '[]')
}

export function saveLocalProgreso(registros: unknown) {
  localStorage.setItem(PROGRESO_KEY, JSON.stringify(registros))
}
