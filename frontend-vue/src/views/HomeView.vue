<template>
  <div class="container">
    <header class="header">
      <h1>🍽️ Planificador de Dietas</h1>
      <p>Gestiona tus dietas de manera inteligente con Vue.js</p>
      <router-link to="/dietas" class="btn-iniciar">Ver Mis Dietas</router-link>
    </header>

    <div class="features">
      <div class="feature-card">
        <div class="icon">📋</div>
        <h3>Gestiona Dietas</h3>
        <p>Crea, edita y elimina tus dietas fácilmente</p>
      </div>
      <div class="feature-card">
        <div class="icon">🍎</div>
        <h3>Controla Calorías</h3>
        <p>Calcula automáticamente las calorías de tus comidas</p>
      </div>
      <div class="feature-card">
        <div class="icon">📊</div>
        <h3>Sigue tu Progreso</h3>
        <p>Visualiza estadísticas y mejora tus hábitos</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  color: white;
  padding: 60px 20px;
}

.header h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.header p {
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.btn-iniciar {
  display: inline-block;
  background: white;
  color: #667eea;
  padding: 12px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.3s;
}

.btn-iniciar:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  padding: 40px 20px;
}

.feature-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.feature-card h3 {
  color: #667eea;
  margin-bottom: 10px;
}

.feature-card p {
  color: #666;
}
</style>