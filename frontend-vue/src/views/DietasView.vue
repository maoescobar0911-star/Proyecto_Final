<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import DietasHeader from '../components/DietasHeader.vue'
import PerfilNutricional from '../components/PerfilNutricional.vue'
import SeguimientoPeso from '../components/SeguimientoPeso.vue'
import DietaEditor from '../components/DietaEditor.vue'
import ListaDietas from '../components/ListaDietas.vue'
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
  saveLocalDietas,
  saveLocalProgreso,
} from '../services/session'
import { useSessionStore } from '../stores/session'

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
const sessionStore = useSessionStore()
const session = computed(() => sessionStore.user)
const sourceLabel = ref('Modo demostracion local')
const feedback = ref('')
const filterObjetivo = ref('Todos')

const pesoIdeal = computed(() => {
  if (session.value?.peso_ideal) {
    return Number(session.value.peso_ideal).toFixed(1)
  }

  const altura = Number(session.value?.altura)

  if (!altura || altura < 1 || altura > 2.5) {
    return null
  }

  return (22 * altura * altura).toFixed(1)
})

const imc = computed(() => {
  if (session.value?.imc) {
    return Number(session.value.imc).toFixed(1)
  }

  const altura = Number(session.value?.altura)
  const pesoActual = Number(session.value?.peso_actual)

  if (!altura || !pesoActual || altura < 1 || altura > 2.5) {
    return null
  }

  return (pesoActual / (altura * altura)).toFixed(1)
})

const clasificacionImc = computed(() => {
  if (session.value?.clasificacion_imc) {
    return session.value.clasificacion_imc
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
  if (session.value?.recomendacion) {
    return session.value.recomendacion
  }

  if (session.value?.objetivo_personal === 'Bajar peso') {
    return 'Te conviene un plan con control calorico y seguimiento semanal.'
  }

  if (session.value?.objetivo_personal === 'Ganar masa') {
    return 'Te conviene aumentar calorias y proteina de forma progresiva.'
  }

  return 'Tu meta puede centrarse en mantener un equilibrio alimenticio.'
})

const progresoForm = reactive({
  peso: Number(session.value?.peso_actual || 70),
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
  if (!session.value?.id) {
    dietas.value = getLocalDietas()
    sourceLabel.value = 'Modo demostracion local'
    feedback.value = 'Estas trabajando en modo local para que la demo no se detenga.'
    return
  }

  try {
    const data = await fetchDietas(session.value.id)
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
  if (!session.value?.id) {
    progreso.value = getLocalProgreso()
    return
  }

  try {
    const data = await fetchProgreso(session.value.id)
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

  if (session.value?.id) {
    try {
      const data = await createDieta({
        usuario_id: session.value.id,
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
  if (!session.value?.id) {
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

  if (session.value?.id && Number.isInteger(dieta.id)) {
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

  if (session.value?.id && Number.isInteger(dieta.id)) {
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
  if (!session.value?.id) {
    feedback.value = 'Cambios guardados en modo demo local.'
  }
  cancelarEdicion()
}

async function eliminarDieta(id) {
  const dieta = dietas.value.find((item) => item.id === id)
  dietas.value = dietas.value.filter((item) => item.id !== id)

  if (session.value?.id && dieta && Number.isInteger(dieta.id)) {
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
  if (!session.value?.id) {
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

  if (session.value?.id) {
    try {
      const data = await createRegistroPeso({
        usuario_id: session.value.id,
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
  progresoForm.peso = Number(session.value?.peso_actual || nuevoRegistro.peso)
  progresoForm.fecha = new Date().toISOString().slice(0, 10)
  progresoForm.nota = ''
}

async function eliminarSeguimiento(id) {
  const anterior = [...progreso.value]
  progreso.value = progreso.value.filter((registro) => registro.id !== id)

  if (session.value?.id) {
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
  sessionStore.hydrate()
  cargarDietas()
  cargarProgreso()
})
</script>

<template>
  <section class="planner">
    <DietasHeader
      :session="session"
      :source-label="sourceLabel"
      :feedback="feedback"
      :dietas-length="dietas.length"
      :total-activas="totalActivas"
      :promedio-calorias="promedioCalorias"
      :peso-ideal="pesoIdeal"
    />

    <PerfilNutricional
      :session="session"
      :peso-ideal="pesoIdeal"
      :imc="imc"
      :clasificacion-imc="clasificacionImc"
      :recomendacion="recomendacion"
    />

    <SeguimientoPeso
      :session="session"
      :progreso-form="progresoForm"
      :ultimo-registro="ultimoRegistro"
      :variacion-peso="variacionPeso"
      :progreso="progreso"
      @save="guardarSeguimiento"
      @delete="eliminarSeguimiento"
    />

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
      <DietaEditor :form="form" @submit="crearDieta" />

      <ListaDietas
        :dietas="dietasFiltradas"
        :editing-id="editingId"
        :edit-form="editForm"
        @edit-start="iniciarEdicion"
        @edit-save="guardarEdicion"
        @edit-cancel="cancelarEdicion"
        @toggle="alternarEstado"
        @delete="eliminarDieta"
      />
    </div>
  </section>
</template>
<style scoped src="../assets/styles/dietas.css"></style>
