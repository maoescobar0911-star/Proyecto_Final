<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const session = ref(JSON.parse(localStorage.getItem('planner-session') || 'null'))

watch(
  () => route.fullPath,
  () => {
    session.value = JSON.parse(localStorage.getItem('planner-session') || 'null')
  },
  { immediate: true },
)

const isAuthView = computed(() =>
  route.path === '/login' || route.path === '/registro',
)

function cerrarSesion() {
  localStorage.removeItem('planner-session')
  session.value = null
  router.push('/login')
}
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <div>
        <p class="eyebrow">Proyecto final</p>
        <h1>Planeador de Dietas</h1>
      </div>

      <div class="topbar-actions">
        <nav class="nav">
          <router-link to="/">Inicio</router-link>
          <router-link v-if="!session" to="/login">Login</router-link>
          <router-link v-if="!session" to="/registro">Registro</router-link>
          <router-link to="/dietas">Mis dietas</router-link>
        </nav>

        <div v-if="session" class="session-card">
          <span>{{ session.nombre }}</span>
          <button type="button" @click="cerrarSesion">Cerrar sesion</button>
        </div>
        <p v-else-if="!isAuthView" class="session-hint">Inicia sesion para guardar tu avance como estudiante.</p>
      </div>
    </header>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style>
:root {
  font-family: Arial, Helvetica, sans-serif;
  color: #1f2937;
  background:
    radial-gradient(circle at top, rgba(249, 115, 22, 0.18), transparent 30%),
    linear-gradient(135deg, #fff7ed 0%, #fef3c7 45%, #ecfccb 100%);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

#app {
  min-height: 100vh;
}

.app-shell {
  width: min(1100px, calc(100% - 32px));
  margin: 0 auto;
  padding: 24px 0 40px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px 24px;
  border: 1px solid rgba(217, 119, 6, 0.22);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(12px);
  box-shadow: 0 12px 30px rgba(120, 53, 15, 0.08);
}

.topbar h1 {
  margin: 6px 0 0;
  font-size: clamp(1.6rem, 3vw, 2.4rem);
}

.eyebrow {
  margin: 0;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #c2410c;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nav a {
  padding: 10px 14px;
  border-radius: 999px;
  background: #ffedd5;
  color: #9a3412;
  font-weight: 700;
}

.nav a.router-link-active {
  background: #7c2d12;
  color: white;
}

.session-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px 8px 14px;
  border-radius: 999px;
  background: #fff7ed;
  color: #9a3412;
  font-weight: 700;
}

.session-card button {
  border: 0;
  border-radius: 999px;
  padding: 9px 12px;
  background: #7c2d12;
  color: white;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.session-hint {
  margin: 0;
  color: #9a3412;
  font-weight: 600;
}

.content {
  display: block;
}

.panel {
  border: 1px solid rgba(217, 119, 6, 0.2);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 16px 40px rgba(120, 53, 15, 0.08);
}

@media (max-width: 760px) {
  .app-shell {
    width: min(100% - 20px, 1100px);
    padding-top: 16px;
  }

  .topbar {
    flex-direction: column;
    align-items: stretch;
  }

  .topbar-actions {
    justify-content: center;
  }

  .nav {
    justify-content: center;
  }
}
</style>
