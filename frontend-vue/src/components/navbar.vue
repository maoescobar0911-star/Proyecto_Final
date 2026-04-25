<script setup>
defineProps({
  session: {
    type: Object,
    default: null,
  },
  isAuthView: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['logout'])
</script>

<template>
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
        <router-link v-if="session?.rol === 'admin'" to="/admin">Admin</router-link>
      </nav>

      <div v-if="session" class="session-card">
        <span>{{ session.nombre }}</span>
        <button type="button" @click="emit('logout')">Cerrar sesion</button>
      </div>
      <p v-else-if="!isAuthView" class="session-hint">
        Inicia sesion para guardar tu avance como estudiante.
      </p>
    </div>
  </header>
</template>
