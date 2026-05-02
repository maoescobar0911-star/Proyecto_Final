<script setup>
defineProps({
  session: {
    type: Object,
    default: null,
  },
  pesoIdeal: {
    type: [String, Number, null],
    default: null,
  },
  imc: {
    type: [String, Number, null],
    default: null,
  },
  clasificacionImc: {
    type: String,
    default: '',
  },
  recomendacion: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section v-if="session" class="profile-card panel">
    <div>
      <p class="filter-title">Perfil nutricional</p>
      <h3>{{ session.nombre }}</h3>
      <p class="profile-text">
        Resumen calculado con la altura y el peso actual registrados por el usuario.
      </p>
    </div>

    <div class="profile-metrics">
      <div class="profile-item">
        <span>Altura</span>
        <strong>{{ session.altura || '--' }} m</strong>
      </div>
      <div class="profile-item">
        <span>Peso actual</span>
        <strong>{{ session.peso_actual || '--' }} kg</strong>
      </div>
      <div class="profile-item">
        <span>Peso ideal</span>
        <strong>{{ pesoIdeal || '--' }} kg</strong>
      </div>
      <div class="profile-item">
        <span>IMC</span>
        <strong>{{ imc || '--' }}</strong>
      </div>
      <div class="profile-item">
        <span>Objetivo</span>
        <strong>{{ session.objetivo_personal || 'Sin definir' }}</strong>
      </div>
      <div class="profile-item">
        <span>Clasificacion</span>
        <strong>{{ clasificacionImc || 'Sin datos' }}</strong>
      </div>
    </div>

    <div class="recommendation-box">
      <p class="filter-title">Recomendacion automatica</p>
      <p class="profile-text">{{ recomendacion }}</p>
    </div>
  </section>
</template>
