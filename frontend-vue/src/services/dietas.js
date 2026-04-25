import { deleteJson, getJson, postJson, putJson } from './api'

export function fetchDietas(usuarioId) {
  return getJson(`/dietas?usuario_id=${usuarioId}`)
}

export function createDieta(payload) {
  return postJson('/dietas', payload)
}

export function updateDieta(id, payload) {
  return putJson(`/dietas/${id}`, payload)
}

export function removeDieta(id) {
  return deleteJson(`/dietas/${id}`)
}
