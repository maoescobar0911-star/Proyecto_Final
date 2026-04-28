import { deleteJson, getJson, postJson } from './api'

export function fetchProgreso(usuarioId) {
  return getJson(`/progreso?usuario_id=${usuarioId}`)
}

export function createRegistroPeso(payload) {
  return postJson('/progreso', payload)
}

export function removeRegistroPeso(id) {
  return deleteJson(`/progreso/${id}`)
}
