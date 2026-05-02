<script setup>
import { computed, onMounted, ref } from 'vue'
import { buildLocalAdminResumen, fetchAdminResumen } from '../services/admin'
import { useSessionStore } from '../stores/session'

const sessionStore = useSessionStore()
const session = computed(() => sessionStore.user)
const usuarios = ref([])
const dietas = ref([])
const resumen = ref({
  total_usuarios: 0,
  total_dietas: 0,
  dietas_activas: 0,
  dietas_completadas: 0,
})
const sourceLabel = ref('Modo local')
const feedback = ref('Panel de administrador cargado.')

async function cargarResumen() {
  try {
    const data = await fetchAdminResumen()
    usuarios.value = data.usuarios
    dietas.value = data.dietas
    resumen.value = data.resumen
    sourceLabel.value = 'Conectado al backend'
    feedback.value = 'Resumen general del sistema cargado correctamente.'
  } catch {
    const data = buildLocalAdminResumen()
    usuarios.value = data.usuarios
    dietas.value = data.dietas
    resumen.value = data.resumen
    sourceLabel.value = 'Modo local'
    feedback.value = 'No se pudo cargar el backend, se muestra un resumen local.'
  }
}

onMounted(() => {
  cargarResumen()
})
</script>

<template>
  <section class="admin-view">
    <div class="admin-header panel">
      <div>
        <p class="eyebrow">Administrador</p>
        <h2>Panel general</h2>
        <p class="subtitle">
          {{ session ? `Sesion activa: ${session.nombre}` : 'Sin sesion activa.' }}
        </p>
        <p class="subtitle">{{ sourceLabel }}</p>
        <p class="feedback">{{ feedback }}</p>
      </div>

      <div class="stats">
        <div class="stat">
          <strong>{{ resumen.total_usuarios }}</strong>
          <span>Usuarios</span>
        </div>
        <div class="stat">
          <strong>{{ resumen.total_dietas }}</strong>
          <span>Dietas</span>
        </div>
        <div class="stat">
          <strong>{{ resumen.dietas_activas }}</strong>
          <span>Activas</span>
        </div>
        <div class="stat">
          <strong>{{ resumen.dietas_completadas }}</strong>
          <span>Completadas</span>
        </div>
      </div>
    </div>

    <section class="admin-highlight panel">
      <article class="highlight-card">
        <span class="highlight-label">Control general</span>
        <strong>{{ resumen.total_usuarios }}</strong>
        <p>usuarios registrados dentro del sistema</p>
      </article>
      <article class="highlight-card">
        <span class="highlight-label">Actividad</span>
        <strong>{{ resumen.dietas_activas }}</strong>
        <p>dietas activas en seguimiento</p>
      </article>
      <article class="highlight-card">
        <span class="highlight-label">Cierre</span>
        <strong>{{ resumen.dietas_completadas }}</strong>
        <p>dietas completadas por los usuarios</p>
      </article>
    </section>

    <div class="admin-grid">
      <section class="panel admin-section">
        <div class="section-head">
          <p class="filter-title">Usuarios</p>
          <h3>Lista de usuarios</h3>
        </div>

        <div v-if="usuarios.length" class="data-list">
          <article v-for="usuario in usuarios" :key="usuario.id" class="data-card">
            <div class="data-card-top">
              <div>
                <h4>{{ usuario.nombre }}</h4>
                <p>{{ usuario.email }}</p>
              </div>
              <span class="pill">{{ usuario.objetivo_personal || 'Sin definir' }}</span>
            </div>
            <small>Perfil registrado dentro del sistema principal.</small>
          </article>
        </div>
        <div v-else class="empty-state">
          <p>No hay usuarios cargados.</p>
        </div>
      </section>

      <section class="panel admin-section">
        <div class="section-head">
          <p class="filter-title">Dietas</p>
          <h3>Vista general</h3>
        </div>

        <div v-if="dietas.length" class="data-list">
          <article v-for="dieta in dietas" :key="dieta.id" class="data-card">
            <div class="data-card-top">
              <div>
                <h4>{{ dieta.nombre }}</h4>
                <p>{{ dieta.usuario || 'Usuario local' }}</p>
              </div>
              <span class="pill">{{ dieta.objetivo }}</span>
            </div>
            <small>{{ Number(dieta.total_calorias || 0) }} kcal registradas</small>
          </article>
        </div>
        <div v-else class="empty-state">
          <p>No hay dietas registradas.</p>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped src="../assets/styles/admin.css"></style>
