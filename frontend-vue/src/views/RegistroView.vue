<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  nombre: '',
  email: '',
  password: '',
})

const message = ref('Crea un usuario de demostracion para la presentacion.')

function registrar() {
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
  message.value = `Usuario ${form.nombre} creado correctamente.`

  form.nombre = ''
  form.email = ''
  form.password = ''
}
</script>

<template>
  <section class="auth-layout panel">
    <div>
      <p class="label">Registro</p>
      <h2>Crear usuario demo</h2>
      <p class="description">
        Este registro te deja una cuenta local para mostrar el flujo de entrada y el manejo de notas.
      </p>
    </div>

    <form class="auth-form" @submit.prevent="registrar">
      <input v-model="form.nombre" type="text" placeholder="Nombre" required />
      <input v-model="form.email" type="email" placeholder="Correo" required />
      <input
        v-model="form.password"
        type="password"
        placeholder="Contrasena"
        required
      />
      <button type="submit">Crear usuario</button>
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
  background: #0284c7;
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
