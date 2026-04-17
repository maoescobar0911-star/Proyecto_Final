<script setup>
const avances = [
  'Registro e inicio de sesion',
  'CRUD de dietas',
  'Conexion con backend y MySQL',
  'Modo local de respaldo para la demo',
]
</script>

<template>
  <section class="home-layout">
    <section class="hero panel">
      <div class="hero-copy">
        <p class="tag">Avance del proyecto</p>
        <h2>Planeador de dietas con un estilo simple, claro y listo para mostrar en clase.</h2>
        <p class="lead">
          Este proyecto busca organizar planes alimenticios de forma sencilla. En esta
          entrega ya se puede registrar usuarios, iniciar sesion y administrar dietas
          con una interfaz agradable y facil de explicar.
        </p>

        <div class="actions">
          <router-link class="primary" to="/dietas">Ir al panel</router-link>
          <router-link class="secondary" to="/registro">Crear usuario</router-link>
        </div>
      </div>

      <div class="hero-note">
        <div class="note-card">
          <p class="note-label">Entrega actual</p>
          <p class="note-text">
            Ya hay flujo funcional entre vistas, panel de dietas y conexion con backend.
          </p>
        </div>
      </div>
    </section>

    <section class="board panel">
      <div>
        <p class="mini-title">Lo que ya se puede mostrar</p>
        <h3>Avances implementados</h3>
      </div>

      <div class="checklist">
        <div v-for="item in avances" :key="item" class="check-item">
          <span class="dot"></span>
          <span>{{ item }}</span>
        </div>
      </div>

      <p class="teacher-note">
        Esta version esta pensada para presentar avance funcional, no solo una maqueta.
      </p>
    </section>
  </section>
</template>

<style scoped>
.home-layout {
  display: grid;
  gap: 20px;
}

.hero {
  display: grid;
  grid-template-columns: 1.5fr 0.9fr;
  gap: 24px;
  padding: 34px;
  background:
    radial-gradient(circle at right top, rgba(251, 146, 60, 0.15), transparent 35%),
    rgba(255, 255, 255, 0.9);
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
  font-size: clamp(2rem, 4vw, 3.25rem);
  line-height: 1.1;
  color: #7c2d12;
}

.lead {
  margin: 18px 0 0;
  max-width: 58ch;
  font-size: 1.05rem;
  line-height: 1.85;
  color: #44403c;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 26px;
}

.primary,
.secondary {
  padding: 12px 18px;
  border-radius: 14px;
  font-weight: 700;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.primary:hover,
.secondary:hover {
  transform: translateY(-1px);
}

.primary {
  background: #7c2d12;
  color: white;
  box-shadow: 0 10px 24px rgba(124, 45, 18, 0.18);
}

.secondary {
  background: #fff1e6;
  color: #9a3412;
  border: 1px solid #fed7aa;
}

.hero-note {
  display: flex;
  align-items: center;
}

.note-card {
  width: 100%;
  padding: 22px;
  border-radius: 22px;
  background: linear-gradient(180deg, #fffaf5 0%, #fff1e6 100%);
  border: 1px solid #fed7aa;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.note-label {
  margin: 0 0 10px;
  color: #c2410c;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.note-text {
  margin: 0;
  color: #57534e;
  line-height: 1.75;
}

.board {
  padding: 26px;
  background:
    linear-gradient(180deg, rgba(255, 250, 245, 0.98), rgba(255, 255, 255, 0.96)),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 31px,
      rgba(217, 119, 6, 0.06) 31px,
      rgba(217, 119, 6, 0.06) 32px
    );
}

.mini-title {
  margin: 0 0 6px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #c2410c;
  font-weight: 700;
  font-size: 0.85rem;
}

h3 {
  margin: 0;
  color: #7c2d12;
  font-size: 1.55rem;
}

.checklist {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #44403c;
  font-weight: 600;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #ea580c;
  flex: 0 0 auto;
}

.teacher-note {
  margin: 20px 0 0;
  color: #78716c;
  line-height: 1.7;
}

@media (max-width: 760px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 24px;
  }

  .board {
    padding: 22px;
  }
}
</style>
