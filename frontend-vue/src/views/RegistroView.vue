<script setup>
import { computed, reactive, ref } from 'vue'
import { registerRequest } from '../services/auth'
import { getLocalUsers, saveLocalUsers } from '../services/session'
import { useSessionStore } from '../stores/session'

const form = reactive({
  nombre: '',
  email: '',
  password: '',
  altura: 1.7,
  pesoActual: 70,
  objetivoPersonal: 'Mantener peso',
})

const sessionStore = useSessionStore()
const message = ref('Crea un usuario para registrar y organizar dietas.')
const pesoIdeal = computed(() => {
  const altura = Number(form.altura)

  if (!altura || altura < 1 || altura > 2.5) {
    return null
  }

  return (22 * altura * altura).toFixed(1)
})
const imc = computed(() => {
  const altura = Number(form.altura)
  const peso = Number(form.pesoActual)

  if (!altura || !peso || altura < 1 || altura > 2.5) {
    return null
  }

  return (peso / (altura * altura)).toFixed(1)
})

async function registrar() {
  try {
    const data = await registerRequest({
      nombre: form.nombre,
      email: form.email,
      password: form.password,
      altura: Number(form.altura),
      peso_actual: Number(form.pesoActual),
      objetivo_personal: form.objetivoPersonal,
    })

    sessionStore.setSession(data)
    message.value = `Usuario ${data.user.nombre} creado correctamente.`
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : 'Error al registrar usuario.'

    const esModoLocal =
      mensaje.includes('Failed to fetch') ||
      mensaje.includes('NetworkError') ||
      mensaje.includes('fetch')

    const usuarios = getLocalUsers()
    const yaExiste = usuarios.some((usuario) => usuario.email === form.email)

    if (yaExiste) {
      message.value = 'Ese correo ya existe en la demo. Usa otro o entra con login.'
      return
    }

    if (!esModoLocal) {
      message.value = `No se guardo en backend: ${mensaje}`
      return
    }

    const nuevoUsuario = {
      id: Date.now(),
      nombre: form.nombre,
      email: form.email,
      password: form.password,
      altura: Number(form.altura),
      peso_actual: Number(form.pesoActual),
      objetivo_personal: form.objetivoPersonal,
      peso_ideal: Number(pesoIdeal.value),
      imc: Number(imc.value),
      recomendacion:
        form.objetivoPersonal === 'Bajar peso'
          ? 'Te conviene un plan con control calorico y seguimiento semanal.'
          : form.objetivoPersonal === 'Ganar masa'
            ? 'Te conviene aumentar calorias y proteina de forma progresiva.'
            : 'Tu meta puede centrarse en mantener un equilibrio alimenticio.',
    }

    usuarios.push(nuevoUsuario)
    saveLocalUsers(usuarios)
    sessionStore.setSession(nuevoUsuario)
    message.value = `Usuario ${form.nombre} creado en modo demo local porque el backend no respondio.`
  }

  form.nombre = ''
  form.email = ''
  form.password = ''
  form.altura = 1.7
  form.pesoActual = 70
  form.objetivoPersonal = 'Mantener peso'
}
</script>

<template>
  <section class="auth-layout panel">
    <div class="info-card">
      <p class="label">Registro</p>
      <h2>Crear usuario</h2>
      <p class="description">
        Esta parte permite crear una cuenta para entrar al sistema. Si el backend esta
        activo, el usuario se guarda en MySQL. Si no, se mantiene un modo local para la demo.
      </p>

      <div class="helper-box">
        <strong>Idea de uso</strong>
        <span>Crea un usuario rapido para mostrar el flujo completo durante la presentacion.</span>
      </div>
    </div>

    <form class="auth-form" @submit.prevent="registrar">
      <label class="field">
        <span>Nombre</span>
        <input v-model="form.nombre" type="text" placeholder="Tu nombre" required />
      </label>

      <label class="field">
        <span>Correo</span>
        <input v-model="form.email" type="email" placeholder="correo@ejemplo.com" required />
      </label>

      <label class="field">
        <span>Contrasena</span>
        <input
          v-model="form.password"
          type="password"
          placeholder="Crea una contrasena"
          required
        />
      </label>

      <label class="field">
        <span>Altura en metros</span>
        <input
          v-model="form.altura"
          type="number"
          min="1"
          max="2.5"
          step="0.01"
          placeholder="Ejemplo: 1.70"
          required
        />
      </label>

      <label class="field">
        <span>Peso actual en kg</span>
        <input
          v-model="form.pesoActual"
          type="number"
          min="25"
          max="300"
          step="0.1"
          placeholder="Ejemplo: 68"
          required
        />
      </label>

      <label class="field">
        <span>Objetivo personal</span>
        <select v-model="form.objetivoPersonal">
          <option>Bajar peso</option>
          <option>Mantener peso</option>
          <option>Ganar masa</option>
        </select>
      </label>

      <div class="helper-box" v-if="pesoIdeal && imc">
        <strong>Resumen rapido</strong>
        <span>Peso ideal estimado: {{ pesoIdeal }} kg</span>
        <span>IMC aproximado: {{ imc }}</span>
        <span>Objetivo: {{ form.objetivoPersonal }}</span>
      </div>

      <button type="submit">Crear cuenta</button>
      <p class="message">{{ message }}</p>
    </form>
  </section>
</template>
<style scoped src="../assets/styles/auth.css"></style>
<style scoped>
button {
  background: #c89b2e;
  box-shadow: 0 10px 22px rgba(200, 155, 46, 0.22);
}
</style>
