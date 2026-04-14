<template>
  <div class="container">
    <h2 class="page-title">Mis Dietas</h2>

    <!-- Stats -->
    <div class="stats">
      <div class="stat-card">
        <div class="stat-number">4</div>
        <div class="stat-label">Dietas disponibles</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">1,850</div>
        <div class="stat-label">Calorías promedio</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">12</div>
        <div class="stat-label">Alimentos registrados</div>
      </div>
    </div>

    <!-- Grid de dietas -->
    <div class="dietas-grid">
      <!-- Dieta 1 -->
      <div class="dieta-card">
        <div class="card-header">
          <h2>🔥 Dieta para bajar grasa</h2>
          <div class="usuario">👤 Juan Perez</div>
        </div>
        <div class="card-body">
          <div class="info-item">
            <span class="info-label">📅 Fecha:</span>
            <span class="info-value">15/04/2025</span>
          </div>
          <div class="info-item">
            <span class="info-label">📝 Descripción:</span>
            <span class="info-value">Comidas balanceadas para déficit calórico</span>
          </div>
          <div class="calorias-total">
            <div>🔥 Calorías totales</div>
            <div class="valor">1,800 kcal</div>
          </div>
          <div class="alimentos-titulo">🍎 Alimentos (4)</div>
          <div class="alimento-item">
            <span class="alimento-nombre">Pechuga de pollo</span>
            <span>200g</span>
            <span class="alimento-calorias">330 kcal</span>
          </div>
          <div class="alimento-item">
            <span class="alimento-nombre">Arroz blanco</span>
            <span>150g</span>
            <span class="alimento-calorias">195 kcal</span>
          </div>
          <div class="alimento-item">
            <span class="alimento-nombre">Huevo</span>
            <span>2 unidades</span>
            <span class="alimento-calorias">310 kcal</span>
          </div>
          <div class="alimento-item">
            <span class="alimento-nombre">Brócoli</span>
            <span>100g</span>
            <span class="alimento-calorias">55 kcal</span>
          </div>
        </div>
      </div>

      <!-- Dieta 2 -->
      <div class="dieta-card">
        <div class="card-header">
          <h2>💪 Dieta para ganar masa muscular</h2>
          <div class="usuario">👤 Juan Perez</div>
        </div>
        <div class="card-body">
          <div class="info-item">
            <span class="info-label">📅 Fecha:</span>
            <span class="info-value">10/04/2025</span>
          </div>
          <div class="info-item">
            <span class="info-label">📝 Descripción:</span>
            <span class="info-value">Alta en proteínas para ganar músculo</span>
          </div>
          <div class="calorias-total">
            <div>🔥 Calorías totales</div>
            <div class="valor">2,400 kcal</div>
          </div>
          <div class="alimentos-titulo">🍎 Alimentos (4)</div>
          <div class="alimento-item">
            <span class="alimento-nombre">Salmón</span>
            <span>200g</span>
            <span class="alimento-calorias">416 kcal</span>
          </div>
          <div class="alimento-item">
            <span class="alimento-nombre">Pasta integral</span>
            <span>200g</span>
            <span class="alimento-calorias">310 kcal</span>
          </div>
          <div class="alimento-item">
            <span class="alimento-nombre">Aguacate</span>
            <span>100g</span>
            <span class="alimento-calorias">160 kcal</span>
          </div>
          <div class="alimento-item">
            <span class="alimento-nombre">Quinoa</span>
            <span>150g</span>
            <span class="alimento-calorias">180 kcal</span>
          </div>
        </div>
      </div>

      <!-- Dieta 3 -->
      <div class="dieta-card">
        <div class="card-header">
          <h2>🌱 Dieta vegetariana</h2>
          <div class="usuario">👤 Maria Lopez</div>
        </div>
        <div class="card-body">
          <div class="info-item">
            <span class="info-label">📅 Fecha:</span>
            <span class="info-value">05/04/2025</span>
          </div>
          <div class="info-item">
            <span class="info-label">📝 Descripción:</span>
            <span class="info-value">Sin carne, alta en vegetales</span>
          </div>
          <div class="calorias-total">
            <div>🔥 Calorías totales</div>
            <div class="valor">1,650 kcal</div>
          </div>
          <div class="alimentos-titulo">🍎 Alimentos (4)</div>
          <div class="alimento-item">
            <span class="alimento-nombre">Tofu</span>
            <span>150g</span>
            <span class="alimento-calorias">145 kcal</span>
          </div>
          <div class="alimento-item">
            <span class="alimento-nombre">Lentejas</span>
            <span>200g</span>
            <span class="alimento-calorias">230 kcal</span>
          </div>
          <div class="alimento-item">
            <span class="alimento-nombre">Quinoa</span>
            <span>150g</span>
            <span class="alimento-calorias">180 kcal</span>
          </div>
          <div class="alimento-item">
            <span class="alimento-nombre">Espinacas</span>
            <span>100g</span>
            <span class="alimento-calorias">23 kcal</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DietasView'
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

.stats {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
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

.dietas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
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
</style>