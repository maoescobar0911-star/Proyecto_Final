<template>
  <div class="container">
    <h2 class="page-title">Mis Dietas</h2>

    <!-- Estado de carga -->
    <div v-if="cargando" class="loading">
      <div class="spinner"></div>
      Cargando dietas...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="error">
      ❌ {{ error }}
    </div>

    <!-- Sin dietas -->
    <div v-else-if="dietas.length === 0" class="error">
      📭 No hay dietas disponibles. Crea una desde la base de datos.
    </div>

    <!-- Grid de dietas -->
    <div v-else class="dietas-grid">
      <div v-for="dieta in dietas" :key="dieta.id" class="dieta-card">
        <div class="card-header">
          <h2>{{ dieta.nombre }}</h2>
          <div class="usuario">👤 {{ dieta.usuario }}</div>
        </div>
        <div class="card-body">
          <div class="info-item">
            <span class="info-label">📅 Fecha:</span>
            <span class="info-value">{{ formatDate(dieta.fecha) }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">📝 Descripción:</span>
            <span class="info-value">{{ dieta.descripcion || 'Sin descripción' }}</span>
          </div>
          <div class="calorias-total">
            <div>🔥 Calorías totales</div>
            <div class="valor">{{ dieta.total_calorias }} kcal</div>
          </div>
          <div class="alimentos-titulo">
            🍎 Alimentos ({{ dieta.alimentos.length }})
          </div>
          <div v-for="alimento in dieta.alimentos" :key="alimento.nombre" class="alimento-item">
            <span class="alimento-nombre">{{ alimento.nombre }}</span>
            <span>{{ alimento.cantidad }}g</span>
            <span class="alimento-calorias">{{ Math.round(alimento.calorias) }} kcal</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div v-if="dietas.length > 0" class="stats">
      <div class="stat-card">
        <div class="stat-number">{{ dietas.length }}</div>
        <div class="stat-label">Dietas disponibles</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">{{ promedioCalorias }}</div>
        <div class="stat-label">Calorías promedio</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DietasView',
  data() {
    return {
      dietas: [],
      cargando: true,
      error: null
    }
  },
  computed: {
    promedioCalorias() {
      if (this.dietas.length === 0) return 0
      const total = this.dietas.reduce((sum, d) => sum + d.total_calorias, 0)
      return Math.round(total / this.dietas.length)
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    }
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:3000/api/dietas')
      this.dietas = response.data
      this.error = null
    } catch (err) {
      this.error = 'Error al cargar las dietas. ¿El servidor backend está corriendo?'
      console.error(err)
    } finally {
      this.cargando = false
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  color: white;
  text-align: center;
  margin: 30px 0;
  font-size: 2rem;
}

.dietas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.dieta-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  transition: transform 0.3s ease;
}

.dieta-card:hover {
  transform: translateY(-5px);
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
}

.card-header h2 {
  font-size: 1.4rem;
  margin-bottom: 5px;
}

.usuario {
  font-size: 0.9rem;
  opacity: 0.9;
}

.card-body {
  padding: 20px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.info-label {
  font-weight: 600;
  color: #555;
}

.info-value {
  color: #333;
}

.calorias-total {
  background: #e8f5e9;
  border-radius: 10px;
  padding: 12px;
  text-align: center;
  margin: 15px 0;
}

.valor {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4caf50;
}

.alimentos-titulo {
  font-weight: bold;
  margin: 15px 0 10px 0;
  color: #333;
  font-size: 1rem;
}

.alimento-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.alimento-nombre {
  font-weight: 500;
  color: #555;
}

.alimento-calorias {
  color: #ff6b6b;
  font-weight: bold;
}

.loading, .error {
  text-align: center;
  color: white;
  font-size: 1.2rem;
  padding: 50px;
  background: rgba(255,255,255,0.1);
  border-radius: 15px;
}

.error {
  background: rgba(255,0,0,0.2);
  color: #ffcccc;
}

.spinner {
  border: 3px solid rgba(255,255,255,0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.stat-card {
  background: white;
  border-radius: 15px;
  padding: 20px 30px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  min-width: 150px;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
}

.stat-label {
  color: #666;
  margin-top: 5px;
}
</style>