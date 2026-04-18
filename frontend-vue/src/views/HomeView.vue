<template>
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
</template>
<style scoped src="../assets/styles/home.css"></style>
