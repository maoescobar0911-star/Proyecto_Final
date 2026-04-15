<script setup>
import { computed, reactive, ref } from 'vue'

const storageKey = 'planner-notes'

const form = reactive({
  titulo: '',
  categoria: 'Clase',
  prioridad: 'Media',
  contenido: '',
})

const notas = ref(JSON.parse(localStorage.getItem(storageKey) || '[]'))
const session = JSON.parse(localStorage.getItem('planner-session') || 'null')

const totalPendientes = computed(() =>
  notas.value.filter((nota) => !nota.completada).length,
)

const totalCompletadas = computed(() =>
  notas.value.filter((nota) => nota.completada).length,
)

function guardarNotas() {
  localStorage.setItem(storageKey, JSON.stringify(notas.value))
}

function crearNota() {
  if (!form.titulo.trim() || !form.contenido.trim()) {
    return
  }

  notas.value.unshift({
    id: Date.now(),
    titulo: form.titulo.trim(),
    categoria: form.categoria,
    prioridad: form.prioridad,
    contenido: form.contenido.trim(),
    completada: false,
    fecha: new Date().toLocaleDateString(),
  })

  guardarNotas()

  form.titulo = ''
  form.categoria = 'Clase'
  form.prioridad = 'Media'
  form.contenido = ''
}

function alternarEstado(id) {
  const nota = notas.value.find((item) => item.id === id)
  if (!nota) {
    return
  }

  nota.completada = !nota.completada
  guardarNotas()
}

function eliminarNota(id) {
  notas.value = notas.value.filter((nota) => nota.id !== id)
  guardarNotas()
}
</script>

<template>
  <section class="planner">
    <div class="planner-header panel">
      <div>
        <p class="eyebrow">Panel principal</p>
        <h2>Mis notas</h2>
        <p class="subtitle">
          {{ session ? `Sesion activa: ${session.nombre}` : 'Modo demostracion sin sesion activa.' }}
        </p>
      </div>

      <div class="stats">
        <div class="stat">
          <strong>{{ notas.length }}</strong>
          <span>Total</span>
        </div>
        <div class="stat">
          <strong>{{ totalPendientes }}</strong>
          <span>Pendientes</span>
        </div>
        <div class="stat">
          <strong>{{ totalCompletadas }}</strong>
          <span>Listas</span>
        </div>
      </div>
    </div>

    <div class="planner-grid">
      <form class="editor panel" @submit.prevent="crearNota">
        <h3>Nueva nota</h3>
        <input v-model="form.titulo" type="text" placeholder="Titulo" required />

        <div class="split">
          <select v-model="form.categoria">
            <option>Clase</option>
            <option>Tarea</option>
            <option>Idea</option>
            <option>Importante</option>
          </select>

          <select v-model="form.prioridad">
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
          </select>
        </div>

        <textarea
          v-model="form.contenido"
          rows="7"
          placeholder="Escribe tu nota aqui"
          required
        />

        <button type="submit">Guardar nota</button>
      </form>

      <div class="notes-list">
        <article v-for="nota in notas" :key="nota.id" class="note panel">
          <div class="note-top">
            <div>
              <p class="chip">{{ nota.categoria }}</p>
              <h3>{{ nota.titulo }}</h3>
            </div>
            <span class="priority" :data-priority="nota.prioridad">{{ nota.prioridad }}</span>
          </div>

          <p class="note-body">{{ nota.contenido }}</p>

          <div class="note-bottom">
            <small>{{ nota.fecha }}</small>
            <div class="actions">
              <button class="ghost" type="button" @click="alternarEstado(nota.id)">
                {{ nota.completada ? 'Marcar pendiente' : 'Completar' }}
              </button>
              <button class="danger" type="button" @click="eliminarNota(nota.id)">
                Eliminar
              </button>
            </div>
          </div>
        </article>

        <div v-if="!notas.length" class="empty panel">
          <h3>No hay notas todavia</h3>
          <p>Crea una nota a la izquierda para empezar la demostracion.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.planner {
  display: grid;
  gap: 20px;
}

.planner-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 24px;
}

.eyebrow {
  margin: 0 0 8px;
  color: #0284c7;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 700;
}

h2,
h3 {
  margin: 0;
  color: #0f172a;
}

.subtitle {
  margin: 8px 0 0;
  color: #475569;
}

.stats {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.stat {
  min-width: 100px;
  padding: 16px;
  border-radius: 18px;
  background: #eff6ff;
  text-align: center;
}

.stat strong {
  display: block;
  font-size: 1.8rem;
  color: #1d4ed8;
}

.stat span {
  color: #475569;
}

.planner-grid {
  display: grid;
  grid-template-columns: minmax(280px, 360px) 1fr;
  gap: 20px;
}

.editor,
.note,
.empty {
  padding: 24px;
}

.editor {
  display: grid;
  gap: 14px;
  align-self: start;
}

input,
select,
textarea,
button {
  font: inherit;
  border-radius: 14px;
}

input,
select,
textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
}

textarea {
  resize: vertical;
}

.split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

button {
  border: 0;
  padding: 12px 16px;
  font-weight: 700;
  cursor: pointer;
}

.editor button {
  background: #0f172a;
  color: white;
}

.notes-list {
  display: grid;
  gap: 16px;
}

.note-top,
.note-bottom {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.chip {
  display: inline-block;
  margin: 0 0 10px;
  padding: 6px 10px;
  border-radius: 999px;
  background: #e0f2fe;
  color: #0369a1;
  font-size: 0.85rem;
  font-weight: 700;
}

.priority {
  align-self: start;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 700;
}

.priority[data-priority='Alta'] {
  background: #fee2e2;
  color: #b91c1c;
}

.priority[data-priority='Media'] {
  background: #fef3c7;
  color: #b45309;
}

.priority[data-priority='Baja'] {
  background: #dcfce7;
  color: #15803d;
}

.note-body {
  margin: 16px 0;
  color: #334155;
  line-height: 1.6;
  white-space: pre-wrap;
}

.note-bottom {
  align-items: center;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.ghost {
  background: #e2e8f0;
  color: #0f172a;
}

.danger {
  background: #fee2e2;
  color: #b91c1c;
}

.empty {
  text-align: center;
}

.empty p,
small {
  color: #64748b;
}

@media (max-width: 860px) {
  .planner-header,
  .planner-grid {
    grid-template-columns: 1fr;
    display: grid;
  }

  .planner-header {
    justify-content: initial;
  }
}
</style>
