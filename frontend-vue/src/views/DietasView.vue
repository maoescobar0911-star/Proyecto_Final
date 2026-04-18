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

const editingId = ref(null)
const editForm = reactive({
  nombre: '',
  objetivo: 'Mantenimiento',
  calorias: 2000,
  descripcion: '',
})

const dietas = ref(JSON.parse(localStorage.getItem(storageKey) || '[]'))
const session = JSON.parse(localStorage.getItem('planner-session') || 'null')
const sourceLabel = ref('Modo demostracion local')
const feedback = ref('')
const filterObjetivo = ref('Todos')

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

const dietasFiltradas = computed(() => {
  if (filterObjetivo.value === 'Todos') {
    return dietas.value
  }

  return dietas.value.filter((dieta) => dieta.objetivo === filterObjetivo.value)
})

function guardarDietas() {
  localStorage.setItem(storageKey, JSON.stringify(dietas.value))
}

async function cargarDietas() {
  if (!session?.id) {
    dietas.value = JSON.parse(localStorage.getItem(storageKey) || '[]')
    sourceLabel.value = 'Modo demostracion local'
    feedback.value = 'Estas trabajando en modo local para que la demo no se detenga.'
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
    feedback.value = 'Tus dietas se cargaron correctamente desde el backend.'
    guardarDietas()
  } catch {
    dietas.value = JSON.parse(localStorage.getItem(storageKey) || '[]')
    sourceLabel.value = 'Modo demostracion local'
    feedback.value = 'No se pudo conectar al backend, pero la app sigue funcionando en modo local.'
  }
}

async function crearDieta() {
  if (!form.nombre.trim() || !form.descripcion.trim()) {
    feedback.value = 'Completa el nombre y la descripcion de la dieta.'
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
      feedback.value = 'La dieta se guardo en el backend.'
    } catch {
      sourceLabel.value = 'Modo demostracion local'
      feedback.value = 'La dieta se guardo solo en modo local.'
    }
  }

  dietas.value.unshift(nuevaDieta)
  guardarDietas()
  if (!session?.id) {
    feedback.value = 'Dieta creada en modo demo local.'
  }

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
      feedback.value = 'Estado de la dieta actualizado en el backend.'
    } catch {
      sourceLabel.value = 'Modo demostracion local'
      feedback.value = 'Estado actualizado solo en modo local.'
    }
  }

  guardarDietas()
}

function iniciarEdicion(dieta) {
  editingId.value = dieta.id
  editForm.nombre = dieta.nombre
  editForm.objetivo = dieta.objetivo
  editForm.calorias = dieta.total_calorias
  editForm.descripcion = dieta.descripcion
}

function cancelarEdicion() {
  editingId.value = null
  feedback.value = 'Edicion cancelada.'
}

async function guardarEdicion(id) {
  const dieta = dietas.value.find((item) => item.id === id)
  if (!dieta) {
    return
  }

  if (!editForm.nombre.trim() || !editForm.descripcion.trim()) {
    feedback.value = 'Para editar, deja nombre y descripcion completos.'
    return
  }

  dieta.nombre = editForm.nombre.trim()
  dieta.objetivo = editForm.objetivo
  dieta.total_calorias = Number(editForm.calorias)
  dieta.descripcion = editForm.descripcion.trim()

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
      feedback.value = 'Cambios guardados correctamente en el backend.'
    } catch {
      sourceLabel.value = 'Modo demostracion local'
      feedback.value = 'Cambios guardados solo en modo local.'
    }
  }

  guardarDietas()
  if (!session?.id) {
    feedback.value = 'Cambios guardados en modo demo local.'
  }
  cancelarEdicion()
}

async function eliminarDieta(id) {
  const dieta = dietas.value.find((item) => item.id === id)
  dietas.value = dietas.value.filter((item) => item.id !== id)

  if (session?.id && dieta && Number.isInteger(dieta.id)) {
    try {
      await deleteJson(`/dietas/${dieta.id}`)
      sourceLabel.value = 'Conectado al backend'
      feedback.value = 'La dieta fue eliminada del backend.'
    } catch {
      sourceLabel.value = 'Modo demostracion local'
      feedback.value = 'La dieta fue eliminada solo en modo local.'
    }
  }

  guardarDietas()
  if (!session?.id) {
    feedback.value = 'La dieta fue eliminada en modo demo local.'
  }
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
        <p class="feedback">{{ feedback }}</p>
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

    <section class="filter-bar panel">
      <div>
        <p class="filter-title">Filtro rapido</p>
        <span class="filter-text">Puedes mostrar las dietas por objetivo para que la vista se vea mas completa en la presentacion.</span>
      </div>

      <select v-model="filterObjetivo">
        <option>Todos</option>
        <option>Definicion</option>
        <option>Mantenimiento</option>
        <option>Volumen</option>
      </select>
    </section>

    <div class="planner-grid">
      <form class="editor panel" @submit.prevent="crearDieta">
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

      <div class="dietas-list">
        <article v-for="dieta in dietasFiltradas" :key="dieta.id" class="diet-card panel">
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
                <button class="save" type="button" @click="guardarEdicion(dieta.id)">Guardar cambios</button>
                <button class="ghost" type="button" @click="cancelarEdicion">Cancelar</button>
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
                <button class="edit" type="button" @click="iniciarEdicion(dieta)">
                  Editar
                </button>
                <button class="ghost" type="button" @click="alternarEstado(dieta.id)">
                  {{ dieta.completada ? 'Marcar activa' : 'Completar plan' }}
                </button>
                <button class="danger" type="button" @click="eliminarDieta(dieta.id)">
                  Eliminar
                </button>
              </div>
            </div>
          </template>
        </article>

        <div v-if="!dietasFiltradas.length" class="empty panel">
          <h3>No hay dietas todavia</h3>
          <p>No hay resultados para ese filtro o aun no has creado dietas.</p>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped src="../assets/styles/dietas.css"></style>
