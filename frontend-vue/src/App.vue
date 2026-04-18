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
