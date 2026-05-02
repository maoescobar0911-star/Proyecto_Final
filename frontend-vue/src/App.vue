<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { useSessionStore } from './stores/session'

const route = useRoute()
const router = useRouter()
const sessionStore = useSessionStore()

watch(
  () => route.fullPath,
  () => {
    sessionStore.hydrate()
  },
  { immediate: true },
)

const isAuthView = computed(() =>
  route.path === '/login' || route.path === '/registro',
)

function cerrarSesion() {
  sessionStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="app-shell">
    <Navbar :session="sessionStore.user" :is-auth-view="isAuthView" @logout="cerrarSesion" />

    <main class="content">
      <router-view />
    </main>
  </div>
</template>
