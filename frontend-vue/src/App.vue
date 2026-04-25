<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { clearSession, getSession } from './services/session'

const route = useRoute()
const router = useRouter()
const session = ref(getSession())

watch(
  () => route.fullPath,
  () => {
    session.value = getSession()
  },
  { immediate: true },
)

const isAuthView = computed(() =>
  route.path === '/login' || route.path === '/registro',
)

function cerrarSesion() {
  clearSession()
  session.value = null
  router.push('/login')
}
</script>

<template>
  <div class="app-shell">
    <Navbar :session="session" :is-auth-view="isAuthView" @logout="cerrarSesion" />

    <main class="content">
      <router-view />
    </main>
  </div>
</template>
