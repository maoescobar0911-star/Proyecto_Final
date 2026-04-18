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
  background: #7c2d12;
  color: white;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 22px rgba(124, 45, 18, 0.16);
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
