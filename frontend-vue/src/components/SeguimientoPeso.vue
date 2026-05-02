<script setup>
defineProps({
  session: {
    type: Object,
    default: null,
  },
  progresoForm: {
    type: Object,
    required: true,
  },
  ultimoRegistro: {
    type: Object,
    default: null,
  },
  variacionPeso: {
    type: [String, Number, null],
    default: null,
  },
  progreso: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['save', 'delete'])
</script>

<template>
  <section v-if="session" class="tracking-grid">
    <form class="panel tracking-form" @submit.prevent="emit('save')">
      <div>
        <p class="filter-title">Seguimiento semanal</p>
        <h3>Registrar peso</h3>
        <p class="form-note">Guarda un peso por fecha para mostrar la evolucion del usuario.</p>
      </div>

      <div class="split">
        <input
          v-model="progresoForm.peso"
          type="number"
          min="25"
          max="300"
          step="0.1"
          placeholder="Peso en kg"
          required
        />
        <input v-model="progresoForm.fecha" type="date" required />
      </div>

      <textarea
        v-model="progresoForm.nota"
        rows="3"
        placeholder="Nota opcional del seguimiento"
      />

      <button type="submit">Guardar seguimiento</button>
    </form>

    <section class="panel tracking-summary">
      <div>
        <p class="filter-title">Historial</p>
        <h3>Progreso de peso</h3>
      </div>

      <div class="profile-metrics">
        <div class="profile-item">
          <span>Ultimo peso</span>
          <strong>{{ ultimoRegistro ? `${ultimoRegistro.peso} kg` : '--' }}</strong>
        </div>
        <div class="profile-item">
          <span>Variacion</span>
          <strong>
            {{
              variacionPeso === null
                ? '--'
                : `${Number(variacionPeso) > 0 ? '+' : ''}${variacionPeso} kg`
            }}
          </strong>
        </div>
        <div class="profile-item">
          <span>Registros</span>
          <strong>{{ progreso.length }}</strong>
        </div>
      </div>

      <div v-if="progreso.length" class="tracking-list">
        <article v-for="registro in progreso" :key="registro.id" class="tracking-card">
          <div>
            <strong>{{ registro.peso }} kg</strong>
            <p>{{ registro.fecha }}</p>
            <small v-if="registro.nota">{{ registro.nota }}</small>
          </div>
          <button class="danger" type="button" @click="emit('delete', registro.id)">
            Eliminar
          </button>
        </article>
      </div>
      <div v-else class="empty panel">
        <h3>Sin seguimiento todavia</h3>
        <p>Agrega tu primer registro de peso para mostrar progreso semanal.</p>
      </div>
    </section>
  </section>
</template>
