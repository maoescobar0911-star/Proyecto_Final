<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  email: '',
  password: '',
})

const message = ref('Ingresa con un usuario registrado en esta demo.')

function login() {
  const usuarios = JSON.parse(localStorage.getItem('planner-users') || '[]')
  const existe = usuarios.find(
    (usuario) =>
      usuario.email === form.email && usuario.password === form.password,
  )

  if (!existe) {
    message.value = 'No encontramos ese usuario. Revisa tus datos o crea uno demo.'
    return
  }

  localStorage.setItem('planner-session', JSON.stringify(existe))
  message.value = `Sesion iniciada como ${existe.nombre}. Ya puedes mostrar el planeador.`
}
</script>

<template>
  <section class="auth-layout panel">
    <div>
      <p class="label">Acceso</p>
      <h2>Iniciar sesion</h2>
      <p class="description">
        Esta vista funciona con almacenamiento local para que puedas demostrar el flujo
        aunque la base de datos todavia este en construccion.
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
  color: #0284c7;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 700;
}

h2 {
  margin: 0;
  font-size: 2rem;
  color: #0f172a;
}

.description {
  color: #475569;
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
  background: #f8fafc;
  border: 1px solid #cbd5e1;
}

button {
  background: #0f172a;
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.message {
  margin: 0;
  color: #0369a1;
  line-height: 1.6;
}

@media (max-width: 760px) {
  .auth-layout {
    grid-template-columns: 1fr;
    padding: 24px;
  }
}
</style>
