<script setup>
import { reactive, ref } from 'vue'
import { postJson } from '../services/api'

const form = reactive({
  email: '',
  password: '',
})

const message = ref('Ingresa con tu usuario para ver tus dietas.')

async function login() {
  try {
    const data = await postJson('/auth/login', {
      email: form.email,
      password: form.password,
    })

    localStorage.setItem('planner-session', JSON.stringify(data.user))
    message.value = `Bienvenido, ${data.user.nombre}. Ya puedes entrar al panel.`
    return
  } catch (error) {
    const usuarios = JSON.parse(localStorage.getItem('planner-users') || '[]')
    const existe = usuarios.find(
      (usuario) =>
        usuario.email === form.email && usuario.password === form.password,
    )

    if (!existe) {
      message.value = error.message || 'No encontramos ese usuario.'
      return
    }

    localStorage.setItem('planner-session', JSON.stringify(existe))
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

      <div class="helper-box">
        <strong>Tip para la exposicion</strong>
        <span>Puedes usar un usuario de prueba o crear uno nuevo desde registro.</span>
      </div>
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
  background: #166534;
  box-shadow: 0 10px 22px rgba(22, 101, 52, 0.16);
}
</style>
