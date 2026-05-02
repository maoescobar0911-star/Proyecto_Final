<script setup>
defineProps({
  form: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['submit'])
</script>

<template>
  <form class="editor panel" @submit.prevent="emit('submit')">
    <h3>Nueva dieta</h3>
    <p class="form-note">Registra aqui un plan alimenticio como parte del avance del proyecto.</p>
    <input v-model="form.nombre" type="text" placeholder="Nombre del plan" required />

    <div class="split">
      <select v-model="form.objetivo">
        <option>Definicion</option>
        <option>Mantenimiento</option>
        <option>Volumen</option>
      </select>

      <input
        v-model="form.calorias"
        type="number"
        min="1000"
        step="50"
        placeholder="Calorias"
        required
      />
    </div>

    <textarea
      v-model="form.descripcion"
      rows="7"
      placeholder="Describe comidas, horarios o recomendaciones"
      required
    />

    <button type="submit">Guardar dieta</button>
  </form>
</template>
