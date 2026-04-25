import { getJson } from './api'
import { getLocalDietas, getLocalUsers } from './session'

export async function fetchAdminResumen() {
  return getJson('/admin/resumen')
}

export function buildLocalAdminResumen() {
  const usuarios = getLocalUsers()
  const dietas = getLocalDietas()

  return {
    usuarios,
    dietas,
    resumen: {
      total_usuarios: usuarios.length,
      total_dietas: dietas.length,
      dietas_activas: dietas.filter((dieta) => !dieta.completada).length,
      dietas_completadas: dietas.filter((dieta) => dieta.completada).length,
    },
  }
}
