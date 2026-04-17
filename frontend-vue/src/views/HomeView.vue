<script setup>
const integrantes = [
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
        <h2>Planeador de dietas hecho como proyecto estudiantil, pensado para mostrar progreso real.</h2>
        <p class="lead">
          La idea del sistema es ayudar a registrar planes alimenticios de forma sencilla.
          En esta entrega ya se puede iniciar sesion, crear dietas, editarlas y guardarlas
          usando el backend cuando esta disponible.
        </p>

        <div class="actions">
          <router-link class="primary" to="/dietas">Ir al panel</router-link>
          <router-link class="secondary" to="/registro">Crear usuario</router-link>
        </div>
      </div>

      <div class="summary">
        <div class="summary-card">
          <strong>Objetivo del avance</strong>
          <span>Mostrar que el proyecto ya tiene flujo funcional y estructura de aplicacion completa.</span>
        </div>
        <div class="summary-card">
          <strong>Tecnologias</strong>
          <span>Vue, Node, Express, MySQL y almacenamiento local para respaldo durante la exposicion.</span>
        </div>
        <div class="summary-card">
          <strong>Estado actual</strong>
          <span>Listo para registro, login, creacion, edicion y eliminacion de dietas.</span>
        </div>
      </div>
    </section>

    <section class="board panel">
      <div>
        <p class="mini-title">Lo que ya se puede mostrar</p>
        <h3>Avances implementados</h3>
      </div>

      <div class="checklist">
        <div v-for="item in integrantes" :key="item" class="check-item">
          <span class="dot"></span>
          <span>{{ item }}</span>
        </div>
      </div>

      <p class="teacher-note">
        Esta version esta pensada para presentar avance funcional, no solo maquetas de interfaz.
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
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1.08;
  color: #7c2d12;
}

.lead {
  margin: 18px 0 0;
  font-size: 1.05rem;
  line-height: 1.8;
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
  line-height: 1.6;
}

.board {
  padding: 26px;
  background:
    linear-gradient(180deg, rgba(255, 247, 237, 0.95), rgba(255, 255, 255, 0.96)),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 31px,
      rgba(217, 119, 6, 0.08) 31px,
      rgba(217, 119, 6, 0.08) 32px
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
  font-size: 1.6rem;
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
