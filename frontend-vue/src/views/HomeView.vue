<template>
  <section class="hero panel">
    <div class="hero-copy">
      <p class="tag">Avance funcional</p>
      <h2>Organiza tus planes alimenticios y muestra un flujo real para la exposicion.</h2>
      <p class="lead">
        Esta version te permite registrar usuarios, iniciar sesion y administrar dietas
        con objetivo y calorias, usando MySQL cuando el backend esta disponible.
      </p>

      <div class="actions">
        <router-link class="primary" to="/dietas">Ver dietas</router-link>
        <router-link class="secondary" to="/registro">Crear usuario demo</router-link>
      </div>
    </div>

    <div class="summary">
      <div class="summary-card">
        <strong>Planes por objetivo</strong>
        <span>Definicion, mantenimiento o volumen en una sola vista.</span>
      </div>
      <div class="summary-card">
        <strong>Con backend o sin backend</strong>
        <span>La app usa la API si esta activa y sigue viva con modo local si no.</span>
      </div>
      <div class="summary-card">
        <strong>Lista para presentar</strong>
        <span>Tienes registro, login y CRUD de dietas con una interfaz clara.</span>
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
  color: #c2410c;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

h2 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.08;
  color: #7c2d12;
}

.lead {
  margin: 18px 0 0;
  font-size: 1.05rem;
  line-height: 1.7;
  color: #44403c;
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
  background: #7c2d12;
  color: white;
}

.secondary {
  background: #ffedd5;
  color: #9a3412;
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
  background: linear-gradient(180deg, #fff7ed 0%, #fef3c7 100%);
  border: 1px solid #fed7aa;
}

.summary-card strong {
  color: #7c2d12;
  font-size: 1.05rem;
}

.summary-card span {
  color: #57534e;
  line-height: 1.5;
}

@media (max-width: 760px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 24px;
  }
}
</style>
