<template>
  <section class="hero panel">
    <div class="hero-copy">
      <p class="tag">Avance funcional</p>
      <h2>Organiza ideas, pendientes y recordatorios en un solo lugar.</h2>
      <p class="lead">
        Esta version de demostracion te permite registrar usuarios de prueba e
        interactuar con notas guardadas en el navegador para mostrar el flujo principal.
      </p>

      <div class="actions">
        <router-link class="primary" to="/notas">Ver planeador</router-link>
        <router-link class="secondary" to="/registro">Crear usuario demo</router-link>
      </div>
    </div>

    <div class="summary">
      <div class="summary-card">
        <strong>Notas rapidas</strong>
        <span>Crea tarjetas con prioridad y categoria.</span>
      </div>
      <div class="summary-card">
        <strong>Guardado local</strong>
        <span>Los datos permanecen aunque recargues la pagina.</span>
      </div>
      <div class="summary-card">
        <strong>Lista para crecer</strong>
        <span>Luego puedes conectar MySQL sin rehacer la interfaz.</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 24px;
  padding: 32px;
}

.tag {
  margin: 0 0 10px;
  color: #0284c7;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

h2 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.08;
  color: #0f172a;
}

.lead {
  margin: 18px 0 0;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #334155;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.primary,
.secondary {
  padding: 12px 18px;
  border-radius: 14px;
  font-weight: 700;
}

.primary {
  background: #0f172a;
  color: white;
}

.secondary {
  background: #dbeafe;
  color: #1d4ed8;
}

.summary {
  display: grid;
  gap: 14px;
}

.summary-card {
  display: grid;
  gap: 6px;
  padding: 18px;
  border-radius: 18px;
  background: linear-gradient(180deg, #f8fafc 0%, #eff6ff 100%);
  border: 1px solid #dbeafe;
}

.summary-card strong {
  color: #0f172a;
  font-size: 1.05rem;
}

.summary-card span {
  color: #475569;
  line-height: 1.5;
}

@media (max-width: 760px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 24px;
  }
}
</style>
