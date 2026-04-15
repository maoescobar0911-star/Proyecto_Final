<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { deleteJson, getJson, postJson, putJson } from '../services/api'

const storageKey = 'planner-dietas'

const form = reactive({
  nombre: '',
  objetivo: 'Mantenimiento',
  calorias: 2000,
  descripcion: '',
})

const dietas = ref(JSON.parse(localStorage.getItem(storageKey) || '[]'))
const session = JSON.parse(localStorage.getItem('planner-session') || 'null')
const sourceLabel = ref('Modo demostracion local')

const totalActivas = computed(() =>
  dietas.value.filter((dieta) => !dieta.completada).length,
)

const totalCompletadas = computed(() =>
  dietas.value.filter((dieta) => dieta.completada).length,
)

const promedioCalorias = computed(() => {
  if (!dietas.value.length) {
    return 0
  }

  const total = dietas.value.reduce(
    (acumulado, dieta) => acumulado + Number(dieta.total_calorias || 0),
    0,
  )

  return Math.round(total / dietas.value.length)
})

function guardarDietas() {
  localStorage.setItem(storageKey, JSON.stringify(dietas.value))
}

async function cargarDietas() {
  if (!session?.id) {
    dietas.value = JSON.parse(localStorage.getItem(storageKey) || '[]')
    sourceLabel.value = 'Modo demostracion local'
    return
  }

  try {
    const data = await getJson(`/dietas?usuario_id=${session.id}`)
    dietas.value = data.map((dieta) => ({
      id: dieta.id,
      nombre: dieta.nombre,
      descripcion: dieta.descripcion,
      objetivo: dieta.objetivo,
      total_calorias: Number(dieta.total_calorias),
      completada: Boolean(dieta.completada),
      fecha: new Date(dieta.fecha_creacion).toLocaleDateString(),
    }))
    sourceLabel.value = 'Conectado al backend'
    guardarDietas()
  } catch {
    dietas.value = JSON.parse(localStorage.getItem(storageKey) || '[]')
    sourceLabel.value = 'Modo demostracion local'
  }
}

async function crearDieta() {
  if (!form.nombre.trim() || !form.descripcion.trim()) {
    return
  }

  const nuevaDieta = {
    id: Date.now(),
    nombre: form.nombre.trim(),
    descripcion: form.descripcion.trim(),
    objetivo: form.objetivo,
    total_calorias: Number(form.calorias),
    completada: false,
    fecha: new Date().toLocaleDateString(),
  }

  if (session?.id) {
    try {
      const data = await postJson('/dietas', {
        usuario_id: session.id,
        nombre: nuevaDieta.nombre,
        descripcion: nuevaDieta.descripcion,
        objetivo: nuevaDieta.objetivo,
        total_calorias: nuevaDieta.total_calorias,
      })

      nuevaDieta.id = data.id
      sourceLabel.value = 'Conectado al backend'
    } catch {
      sourceLabel.value = 'Modo demostracion local'
    }
  }

  dietas.value.unshift(nuevaDieta)
  guardarDietas()

  form.nombre = ''
  form.objetivo = 'Mantenimiento'
  form.calorias = 2000
  form.descripcion = ''
}

async function alternarEstado(id) {
  const dieta = dietas.value.find((item) => item.id === id)
  if (!dieta) {
    return
  }

  dieta.completada = !dieta.completada

  if (session?.id && Number.isInteger(dieta.id)) {
    try {
      await putJson(`/dietas/${dieta.id}`, {
        nombre: dieta.nombre,
        descripcion: dieta.descripcion,
        objetivo: dieta.objetivo,
        total_calorias: dieta.total_calorias,
        completada: dieta.completada,
      })
      sourceLabel.value = 'Conectado al backend'
    } catch {
      sourceLabel.value = 'Modo demostracion local'
    }
  }

  guardarDietas()
}

async function eliminarDieta(id) {
  const dieta = dietas.value.find((item) => item.id === id)
  dietas.value = dietas.value.filter((item) => item.id !== id)

  if (session?.id && dieta && Number.isInteger(dieta.id)) {
    try {
      await deleteJson(`/dietas/${dieta.id}`)
      sourceLabel.value = 'Conectado al backend'
    } catch {
      sourceLabel.value = 'Modo demostracion local'
    }
  }

  guardarDietas()
}

onMounted(() => {
  cargarDietas()
})
</script>

<template>
  <section class="planner">
    <div class="planner-header panel">
      <div>
        <p class="eyebrow">Panel principal</p>
        <h2>Mis dietas</h2>
        <p class="subtitle">
          {{ session ? `Sesion activa: ${session.nombre}` : 'Modo demostracion sin sesion activa.' }}
        </p>
        <p class="subtitle">{{ sourceLabel }}</p>
      </div>

      <div class="stats">
        <div class="stat">
          <strong>{{ dietas.length }}</strong>
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

    <div class="planner-grid">
      <form class="editor panel" @submit.prevent="crearDieta">
        <h3>Nueva dieta</h3>
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

      <div class="dietas-list">
        <article v-for="dieta in dietas" :key="dieta.id" class="diet-card panel">
          <div class="diet-top">
            <div>
              <p class="chip">{{ dieta.objetivo }}</p>
              <h3>{{ dieta.nombre }}</h3>
            </div>
            <span class="calories">{{ dieta.total_calorias }} kcal</span>
          </div>

          <p class="diet-body">{{ dieta.descripcion }}</p>

          <div class="diet-bottom">
            <small>{{ dieta.fecha }}</small>
            <div class="actions">
              <button class="ghost" type="button" @click="alternarEstado(dieta.id)">
                {{ dieta.completada ? 'Marcar activa' : 'Completar plan' }}
              </button>
              <button class="danger" type="button" @click="eliminarDieta(dieta.id)">
                Eliminar
              </button>
            </div>
          </div>
        </article>

        <div v-if="!dietas.length" class="empty panel">
          <h3>No hay dietas todavia</h3>
          <p>Crea una dieta a la izquierda para empezar la demostracion.</p>
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
  color: #c2410c;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 700;
}

h2,
h3 {
  margin: 0;
  color: #7c2d12;
}

.subtitle {
  margin: 8px 0 0;
  color: #57534e;
}

.stats {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.stat {
  min-width: 110px;
  padding: 16px;
  border-radius: 18px;
  background: #fff7ed;
  text-align: center;
}

.stat strong {
  display: block;
  font-size: 1.8rem;
  color: #c2410c;
}

.stat span {
  color: #57534e;
}

.planner-grid {
  display: grid;
  grid-template-columns: minmax(280px, 360px) 1fr;
  gap: 20px;
}

.editor,
.diet-card,
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
  border: 1px solid #fed7aa;
  background: #fffbeb;
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
  background: #7c2d12;
  color: white;
}

.dietas-list {
  display: grid;
  gap: 16px;
}

.diet-top,
.diet-bottom {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.chip {
  display: inline-block;
  margin: 0 0 10px;
  padding: 6px 10px;
  border-radius: 999px;
  background: #ffedd5;
  color: #9a3412;
  font-size: 0.85rem;
  font-weight: 700;
}

.calories {
  align-self: start;
  padding: 7px 10px;
  border-radius: 999px;
  background: #dcfce7;
  color: #166534;
  font-size: 0.85rem;
  font-weight: 700;
}

.diet-body {
  margin: 16px 0;
  color: #44403c;
  line-height: 1.6;
  white-space: pre-wrap;
}

.diet-bottom {
  align-items: center;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.ghost {
  background: #ffedd5;
  color: #9a3412;
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
  color: #78716c;
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
