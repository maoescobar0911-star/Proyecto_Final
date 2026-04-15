<script setup>
import { reactive, ref } from 'vue'
import { postJson } from '../services/api'

const form = reactive({
  email: '',
  password: '',
})

const message = ref('Ingresa con un usuario registrado para ver tus dietas.')

async function login() {
  try {
    const data = await postJson('/auth/login', {
      email: form.email,
      password: form.password,
    })

    localStorage.setItem('planner-session', JSON.stringify(data.user))
    message.value = `Sesion iniciada con backend como ${data.user.nombre}.`
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
    message.value = `Sesion iniciada en modo demo como ${existe.nombre}.`
  }
}
</script>

<template>
  <section class="auth-layout panel">
    <div>
      <p class="label">Acceso</p>
      <h2>Iniciar sesion</h2>
      <p class="description">
        Esta vista intenta usar el backend y, si no responde, sigue funcionando en modo
        demo local para que no se caiga tu presentacion.
      </p>
    </div>

    <form class="auth-form" @submit.prevent="login">
      <input v-model="form.email" type="email" placeholder="Correo" required />
      <input
        v-model="form.password"
        type="password"
        placeholder="Contrasena"
        required
      />
      <button type="submit">Entrar</button>
      <p class="message">{{ message }}</p>
    </form>
  </section>
</template>

<style scoped>
.auth-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 32px;
}

.label {
  margin: 0 0 8px;
  color: #c2410c;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 700;
}

h2 {
  margin: 0;
  font-size: 2rem;
  color: #7c2d12;
}

.description {
  color: #57534e;
  line-height: 1.7;
}

.auth-form {
  display: grid;
  gap: 14px;
}

input,
button {
  border: 0;
  border-radius: 14px;
  padding: 14px 16px;
  font-size: 1rem;
}

input {
  background: #fffbeb;
  border: 1px solid #fed7aa;
}

button {
  background: #7c2d12;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.message {
  margin: 0;
  color: #9a3412;
  line-height: 1.6;
}

@media (max-width: 760px) {
  .auth-layout {
    grid-template-columns: 1fr;
    padding: 24px;
  }
}
</style>
