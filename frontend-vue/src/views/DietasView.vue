<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import {
  createDieta,
  fetchDietas,
  removeDieta,
  updateDieta,
} from '../services/dietas'
import {
  createRegistroPeso,
  fetchProgreso,
  removeRegistroPeso,
} from '../services/progreso'
import {
  getLocalDietas,
  getLocalProgreso,
  getSession,
  saveLocalDietas,
  saveLocalProgreso,
} from '../services/session'

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

const dietas = ref(getLocalDietas())
const progreso = ref(getLocalProgreso())
const session = getSession()
const sourceLabel = ref('Modo demostracion local')
const feedback = ref('')
const filterObjetivo = ref('Todos')
const pesoIdeal = computed(() => {
  if (session?.peso_ideal) {
    return Number(session.peso_ideal).toFixed(1)
  }

  const altura = Number(session?.altura)

  if (!altura || altura < 1 || altura > 2.5) {
    return null
  }

  return (22 * altura * altura).toFixed(1)
})
const imc = computed(() => {
  if (session?.imc) {
    return Number(session.imc).toFixed(1)
  }

  const altura = Number(session?.altura)
  const pesoActual = Number(session?.peso_actual)

  if (!altura || !pesoActual || altura < 1 || altura > 2.5) {
    return null
  }

  return (pesoActual / (altura * altura)).toFixed(1)
})
const clasificacionImc = computed(() => {
  if (session?.clasificacion_imc) {
    return session.clasificacion_imc
  }

  const valor = Number(imc.value)

  if (!valor) {
    return null
  }

  if (valor < 18.5) {
    return 'Bajo peso'
  }

  if (valor < 25) {
    return 'Peso saludable'
  }

  if (valor < 30) {
    return 'Sobrepeso'
  }

  return 'Obesidad'
})
const recomendacion = computed(() => {
  if (session?.recomendacion) {
    return session.recomendacion
  }

  if (session?.objetivo_personal === 'Bajar peso') {
    return 'Te conviene un plan con control calorico y seguimiento semanal.'
  }

  if (session?.objetivo_personal === 'Ganar masa') {
    return 'Te conviene aumentar calorias y proteina de forma progresiva.'
  }

  return 'Tu meta puede centrarse en mantener un equilibrio alimenticio.'
})
const progresoForm = reactive({
  peso: Number(session?.peso_actual || 70),
  fecha: new Date().toISOString().slice(0, 10),
  nota: '',
})
const ultimoRegistro = computed(() => progreso.value[0] || null)
const variacionPeso = computed(() => {
  if (progreso.value.length < 2) {
    return null
  }

  const actual = Number(progreso.value[0].peso)
  const anterior = Number(progreso.value[1].peso)

  return (actual - anterior).toFixed(1)
})

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
  saveLocalDietas(dietas.value)
}

function guardarProgresoLocal() {
  saveLocalProgreso(progreso.value)
}

async function cargarDietas() {
  if (!session?.id) {
    dietas.value = getLocalDietas()
    sourceLabel.value = 'Modo demostracion local'
    feedback.value = 'Estas trabajando en modo local para que la demo no se detenga.'
    return
  }

  try {
    const data = await fetchDietas(session.id)
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
    dietas.value = getLocalDietas()
    sourceLabel.value = 'Modo demostracion local'
    feedback.value = 'No se pudo conectar al backend, pero la app sigue funcionando en modo local.'
  }
}

async function cargarProgreso() {
  if (!session?.id) {
    progreso.value = getLocalProgreso()
    return
  }

  try {
    const data = await fetchProgreso(session.id)
    progreso.value = data.map((registro) => ({
      id: registro.id,
      peso: Number(registro.peso),
      nota: registro.nota || '',
      fecha: registro.fecha_registro,
    }))
    guardarProgresoLocal()
  } catch {
    progreso.value = getLocalProgreso()
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
      const data = await createDieta({
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
      await updateDieta(dieta.id, {
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
      await updateDieta(dieta.id, {
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
      await removeDieta(dieta.id)
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

async function guardarSeguimiento() {
  if (!progresoForm.peso || !progresoForm.fecha) {
    feedback.value = 'Completa peso y fecha para guardar el seguimiento.'
    return
  }

  const nuevoRegistro = {
    id: Date.now(),
    peso: Number(progresoForm.peso),
    fecha: progresoForm.fecha,
    nota: progresoForm.nota.trim(),
  }

  if (session?.id) {
    try {
      const data = await createRegistroPeso({
        usuario_id: session.id,
        peso: nuevoRegistro.peso,
        nota: nuevoRegistro.nota,
        fecha_registro: nuevoRegistro.fecha,
      })
      nuevoRegistro.id = data.id
      feedback.value = 'Seguimiento de peso guardado en el backend.'
    } catch {
      feedback.value = 'Seguimiento guardado solo en modo local.'
    }
  } else {
    feedback.value = 'Seguimiento guardado en modo demo local.'
  }

  progreso.value.unshift(nuevoRegistro)
  progreso.value.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
  guardarProgresoLocal()
  progresoForm.peso = Number(session?.peso_actual || nuevoRegistro.peso)
  progresoForm.fecha = new Date().toISOString().slice(0, 10)
  progresoForm.nota = ''
}

async function eliminarSeguimiento(id) {
  const anterior = [...progreso.value]
  progreso.value = progreso.value.filter((registro) => registro.id !== id)

  if (session?.id) {
    try {
      await removeRegistroPeso(id)
      feedback.value = 'Registro de peso eliminado correctamente.'
    } catch {
      progreso.value = anterior
      feedback.value = 'No se pudo eliminar el registro en el backend.'
      return
    }
  } else {
    feedback.value = 'Registro eliminado en modo demo local.'
  }

  guardarProgresoLocal()
}

onMounted(() => {
  cargarDietas()
  cargarProgreso()
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
        <p v-if="session?.altura && pesoIdeal" class="subtitle">
          Altura: {{ session.altura }} m | Peso ideal estimado: {{ pesoIdeal }} kg
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

    <section v-if="session" class="tracking-grid">
      <form class="panel tracking-form" @submit.prevent="guardarSeguimiento">
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
            <button class="danger" type="button" @click="eliminarSeguimiento(registro.id)">
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
