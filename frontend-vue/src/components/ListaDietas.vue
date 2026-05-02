<script setup>
defineProps({
  dietas: {
    type: Array,
    default: () => [],
  },
  editingId: {
    type: [Number, String, null],
    default: null,
  },
  editForm: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits([
  'edit-start',
  'edit-save',
  'edit-cancel',
  'toggle',
  'delete',
])
</script>

<template>
  <div class="dietas-list">
    <article v-for="dieta in dietas" :key="dieta.id" class="diet-card panel">
      <template v-if="editingId === dieta.id">
        <div class="diet-edit">
          <input v-model="editForm.nombre" type="text" placeholder="Nombre del plan" />
          <div class="split">
            <select v-model="editForm.objetivo">
              <option>Definicion</option>
              <option>Mantenimiento</option>
              <option>Volumen</option>
            </select>
            <input v-model="editForm.calorias" type="number" min="1000" step="50" />
          </div>
          <textarea v-model="editForm.descripcion" rows="5" />
          <div class="actions">
            <button class="save" type="button" @click="emit('edit-save', dieta.id)">Guardar cambios</button>
            <button class="ghost" type="button" @click="emit('edit-cancel')">Cancelar</button>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="diet-top">
          <div class="diet-main">
            <div class="chips">
              <p class="chip">{{ dieta.objetivo }}</p>
              <p class="status" :data-done="dieta.completada">
                {{ dieta.completada ? 'Completada' : 'Activa' }}
              </p>
            </div>
            <h3 class="diet-title">{{ dieta.nombre }}</h3>
            <p class="diet-meta">Plan creado para seguimiento alimenticio personal.</p>
          </div>
          <span class="calories">{{ dieta.total_calorias }} kcal</span>
        </div>

        <p class="diet-body">{{ dieta.descripcion }}</p>

        <div class="diet-bottom">
          <small class="diet-date">Actualizado: {{ dieta.fecha }}</small>
          <div class="actions">
            <button class="edit" type="button" @click="emit('edit-start', dieta)">
              Editar
            </button>
            <button class="ghost" type="button" @click="emit('toggle', dieta.id)">
              {{ dieta.completada ? 'Marcar activa' : 'Completar plan' }}
            </button>
            <button class="danger" type="button" @click="emit('delete', dieta.id)">
              Eliminar
            </button>
          </div>
        </div>
      </template>
    </article>

    <div v-if="!dietas.length" class="empty panel">
      <h3>No hay dietas todavia</h3>
      <p>No hay resultados para ese filtro o aun no has creado dietas.</p>
    </div>
  </div>
</template>
