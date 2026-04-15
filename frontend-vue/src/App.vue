<template>
  <div class="app-shell">
    <header class="topbar">
      <div>
        <p class="eyebrow">Proyecto final</p>
        <h1>Planeador de Notas</h1>
      </div>

      <nav class="nav">
        <router-link to="/">Inicio</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/registro">Registro</router-link>
        <router-link to="/notas">Mis notas</router-link>
      </nav>
    </header>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style>
:root {
  font-family: Arial, Helvetica, sans-serif;
  color: #1f2937;
  background:
    radial-gradient(circle at top, rgba(14, 165, 233, 0.25), transparent 30%),
    linear-gradient(135deg, #f8fafc 0%, #dbeafe 45%, #e0f2fe 100%);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

#app {
  min-height: 100vh;
}

.app-shell {
  width: min(1100px, calc(100% - 32px));
  margin: 0 auto;
  padding: 24px 0 40px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px 24px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
}

.topbar h1 {
  margin: 6px 0 0;
  font-size: clamp(1.6rem, 3vw, 2.4rem);
}

.eyebrow {
  margin: 0;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #0369a1;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.nav a {
  padding: 10px 14px;
  border-radius: 999px;
  background: #eff6ff;
  color: #1d4ed8;
  font-weight: 700;
}

.nav a.router-link-active {
  background: #0f172a;
  color: white;
}

.content {
  display: block;
}

.panel {
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
}

@media (max-width: 760px) {
  .app-shell {
    width: min(100% - 20px, 1100px);
    padding-top: 16px;
  }

  .topbar {
    flex-direction: column;
    align-items: stretch;
  }

  .nav {
    justify-content: center;
  }
}
</style>
