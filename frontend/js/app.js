// API URL
const API_URL = 'http://localhost:3000/api/dietas';

// Cargar dietas al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarDietas();
});

async function cargarDietas() {
    const container = document.getElementById('dietas-container');
    const statsContainer = document.getElementById('stats');
    
    try {
        const response = await fetch(API_URL);
        const dietas = await response.json();
        
        if (dietas.length === 0) {
            container.innerHTML = '<div class="error">📭 No hay dietas disponibles. Crea una desde la base de datos.</div>';
            statsContainer.innerHTML = '';
            return;
        }
        
        // Mostrar estadísticas
        const totalCalorias = dietas.reduce((sum, d) => sum + d.total_calorias, 0);
        const promedioCalorias = Math.round(totalCalorias / dietas.length);
        
        statsContainer.innerHTML = `
            <div class="stat-card">
                <div class="stat-number">${dietas.length}</div>
                <div class="stat-label">Dietas disponibles</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${promedioCalorias}</div>
                <div class="stat-label">Calorías promedio</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${dietas[0]?.usuario || 'N/A'}</div>
                <div class="stat-label">Último usuario</div>
            </div>
        `;
        
        // Mostrar dietas
        container.innerHTML = dietas.map(dieta => `
            <div class="dieta-card">
                <div class="card-header">
                    <h2>${dieta.nombre}</h2>
                    <div class="usuario">👤 ${dieta.usuario}</div>
                </div>
                <div class="card-body">
                    <div class="info-item">
                        <span class="info-label">📅 Fecha:</span>
                        <span class="info-value">${new Date(dieta.fecha).toLocaleDateString()}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">📝 Descripción:</span>
                        <span class="info-value">${dieta.descripcion || 'Sin descripción'}</span>
                    </div>
                    <div class="calorias-total">
                        <div>🔥 Calorías totales</div>
                        <div class="valor">${dieta.total_calorias} kcal</div>
                    </div>
                    <div class="alimentos-titulo">🍎 Alimentos (${dieta.alimentos.length})</div>
                    ${dieta.alimentos.map(alimento => `
                        <div class="alimento-item">
                            <span class="alimento-nombre">${alimento.nombre}</span>
                            <span>${alimento.cantidad}g</span>
                            <span class="alimento-calorias">${Math.round(alimento.calorias)} kcal</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<div class="error">❌ Error al cargar las dietas. ¿El servidor está corriendo?</div>';
        statsContainer.innerHTML = '';
    }
}