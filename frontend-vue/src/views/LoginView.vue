<script setup>
import { reactive, ref } from 'vue'
import { loginRequest } from '../services/auth'
import { getLocalUsers, saveSession } from '../services/session'

const form = reactive({
  email: '',
  password: '',
})

const message = ref('Ingresa con tu usuario para ver tus dietas.')

async function login() {
  try {
    const data = await loginRequest({
      email: form.email,
      password: form.password,
    })

    saveSession(data.user)
    message.value = `Bienvenido, ${data.user.nombre}. Ya puedes entrar al panel.`
    return
  } catch (error) {
    const usuarios = getLocalUsers()
    const existe = usuarios.find(
      (usuario) =>
        usuario.email === form.email && usuario.password === form.password,
    )

    if (!existe) {
      message.value = error.message || 'No encontramos ese usuario.'
      return
    }

    saveSession(existe)
    message.value = `Bienvenido, ${existe.nombre}. Entraste en modo demo local.`
  }
}
</script>

<template>
  <section class="auth-layout panel">
    <div class="info-card">
      <p class="label">Acceso</p>
      <h2>Iniciar sesion</h2>
      <p class="description">
        Entra con tu cuenta para revisar y organizar tus dietas. Si el backend no esta
        disponible, la vista sigue funcionando para que la demostracion no se detenga.
      </p>
    </div>

    <form class="auth-form" @submit.prevent="login">
      <label class="field">
        <span>Correo</span>
        <input v-model="form.email" type="email" placeholder="correo@ejemplo.com" required />
      </label>

      <label class="field">
        <span>Contrasena</span>
        <input
          v-model="form.password"
          type="password"
          placeholder="Ingresa tu contrasena"
          required
        />
      </label>

      <button type="submit">Entrar al sistema</button>
      <p class="message">{{ message }}</p>
    </form>
  </section>
</template>
<style scoped src="../assets/styles/auth.css"></style>
<style scoped>
button {
  background: #8a6a22;
  box-shadow: 0 10px 22px rgba(138, 106, 34, 0.2);
}
</style>
