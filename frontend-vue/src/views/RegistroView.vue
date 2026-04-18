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

<style scoped>
.auth-layout {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 24px;
  padding: 32px;
  background:
    radial-gradient(circle at left top, rgba(251, 146, 60, 0.1), transparent 35%),
    rgba(255, 255, 255, 0.92);
}

.info-card {
  display: grid;
  align-content: start;
  gap: 12px;
}

.label {
  margin: 0;
  color: #c2410c;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 700;
}

h2 {
  margin: 0;
  font-size: 2.2rem;
  color: #7c2d12;
  line-height: 1.1;
}

.description {
  margin: 0;
  color: #57534e;
  line-height: 1.8;
}

.helper-box {
  display: grid;
  gap: 6px;
  margin-top: 10px;
  padding: 18px;
  border-radius: 18px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
}

.helper-box strong {
  color: #9a3412;
}

.helper-box span {
  color: #57534e;
  line-height: 1.6;
}

.auth-form {
  display: grid;
  gap: 16px;
  padding: 24px;
  border-radius: 22px;
  background: linear-gradient(180deg, #fffdf9 0%, #fff7ed 100%);
  border: 1px solid rgba(251, 146, 60, 0.2);
}

.field {
  display: grid;
  gap: 8px;
}

.field span {
  color: #7c2d12;
  font-weight: 700;
  font-size: 0.95rem;
}

input,
button {
  border: 0;
  border-radius: 14px;
  padding: 14px 16px;
  font-size: 1rem;
}

input {
  background: white;
  border: 1px solid #fed7aa;
  color: #44403c;
}

input::placeholder {
  color: #a8a29e;
}

button {
  background: #ea580c;
  color: white;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 22px rgba(234, 88, 12, 0.16);
}

.message {
  margin: 0;
  color: #9a3412;
  line-height: 1.7;
  font-weight: 600;
}

@media (max-width: 760px) {
  .auth-layout {
    grid-template-columns: 1fr;
    padding: 24px;
  }

  .auth-form {
    padding: 20px;
  }
}
</style>
