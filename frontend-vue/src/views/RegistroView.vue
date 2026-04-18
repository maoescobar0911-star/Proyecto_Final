<script setup>
import { reactive, ref } from 'vue'
import { postJson } from '../services/api'

const form = reactive({
  nombre: '',
  email: '',
  password: '',
})

const message = ref('Crea un usuario para registrar y organizar dietas.')

async function registrar() {
  try {
    const data = await postJson('/auth/register', {
      nombre: form.nombre,
      email: form.email,
      password: form.password,
    })

    localStorage.setItem('planner-session', JSON.stringify(data.user))
    message.value = `Usuario ${data.user.nombre} creado correctamente.`
  } catch (error) {
    const usuarios = JSON.parse(localStorage.getItem('planner-users') || '[]')
    const yaExiste = usuarios.some((usuario) => usuario.email === form.email)

    if (yaExiste) {
      message.value = 'Ese correo ya existe en la demo. Usa otro o entra con login.'
      return
    }

    const nuevoUsuario = {
      id: Date.now(),
      nombre: form.nombre,
      email: form.email,
      password: form.password,
    }

    usuarios.push(nuevoUsuario)
    localStorage.setItem('planner-users', JSON.stringify(usuarios))
    localStorage.setItem('planner-session', JSON.stringify(nuevoUsuario))
    message.value = `Usuario ${form.nombre} creado en modo demo local.`
  }

  form.nombre = ''
  form.email = ''
  form.password = ''
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

      <button type="submit">Crear cuenta</button>
      <p class="message">{{ message }}</p>
    </form>
  </section>
</template>
<style scoped src="../assets/styles/auth.css"></style>
<style scoped>
button {
  background: #16a34a;
  box-shadow: 0 10px 22px rgba(22, 163, 74, 0.16);
}
</style>
