const API_URL = 'http://localhost:3000/api'

export async function postJson(path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.msg || data.error || 'Error de servidor')
  }

  return data
}

export async function getJson(path) {
  const response = await fetch(`${API_URL}${path}`)
  const data = await response.json().catch(() => [])

  if (!response.ok) {
    throw new Error(data.msg || data.error || 'Error de servidor')
  }

  return data
}

export async function putJson(path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.msg || data.error || 'Error de servidor')
  }

  return data
}

export async function deleteJson(path) {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'DELETE',
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.msg || data.error || 'Error de servidor')
  }

  return data
}
