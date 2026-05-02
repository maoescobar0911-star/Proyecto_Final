<template>
  <section class="hero panel">
    <div class="hero-copy">
      <p class="tag">Avance del proyecto</p>
      <h2>Un panel de dietas hecho para mostrar progreso, orden y seguimiento real.</h2>
      <p class="lead">
        Esta aplicacion organiza dietas, perfil nutricional, recomendaciones y
        seguimiento de peso dentro de una misma experiencia. La idea es presentar
        un avance funcional que se sienta mas cercano a un sistema completo.
      </p>

      <div class="actions">
        <router-link class="primary" to="/dietas">Ir al panel</router-link>
        <router-link class="secondary" to="/registro">Crear usuario</router-link>
      </div>

      <div class="hero-metrics">
        <article class="metric-card">
          <span>Acceso</span>
          <strong>Login y registro</strong>
        </article>
        <article class="metric-card">
          <span>Control</span>
          <strong>Dietas y progreso</strong>
        </article>
        <article class="metric-card">
          <span>Gestion</span>
          <strong>Vista admin</strong>
        </article>
      </div>
    </div>

    <div class="hero-note">
      <div class="note-card note-card-main">
        <p class="note-label">Entrega actual</p>
        <p class="note-text">
          Ya hay flujo funcional entre vistas, panel de dietas, perfil nutricional,
          seguimiento de peso y conexion con backend.
        </p>
      </div>

      <div class="note-card">
        <p class="note-label">Modulos visibles</p>
        <p class="note-text">
          Usuario, dietas, peso ideal, IMC, recomendacion automatica y administracion.
        </p>
      </div>
    </div>
  </section>
</template>
<style scoped src="../assets/styles/home.css"></style>
