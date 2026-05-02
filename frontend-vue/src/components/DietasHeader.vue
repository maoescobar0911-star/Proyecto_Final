<script setup>
defineProps({
  session: {
    type: Object,
    default: null,
  },
  sourceLabel: {
    type: String,
    default: '',
  },
  feedback: {
    type: String,
    default: '',
  },
  dietasLength: {
    type: Number,
    default: 0,
  },
  totalActivas: {
    type: Number,
    default: 0,
  },
  promedioCalorias: {
    type: Number,
    default: 0,
  },
  pesoIdeal: {
    type: [String, Number, null],
    default: null,
  },
})
</script>

<template>
  <div class="planner-header panel">
    <div>
      <p class="eyebrow">Panel principal</p>
      <h2>Mis dietas</h2>
      <p class="subtitle">
        {{ session ? `Sesion activa: ${session.nombre}` : 'Modo demostracion sin sesion activa.' }}
      </p>
      <p v-if="session?.altura && pesoIdeal" class="subtitle">
        Altura: {{ session.altura }} m | Peso ideal estimado: {{ pesoIdeal }} kg
      </p>
      <p class="subtitle">{{ sourceLabel }}</p>
      <p class="feedback">{{ feedback }}</p>
    </div>

    <div class="stats">
      <div class="stat">
        <strong>{{ dietasLength }}</strong>
        <span>Planes</span>
      </div>
      <div class="stat">
        <strong>{{ totalActivas }}</strong>
        <span>Activas</span>
      </div>
      <div class="stat">
        <strong>{{ promedioCalorias }}</strong>
        <span>Kcal promedio</span>
      </div>
    </div>
  </div>
</template>
