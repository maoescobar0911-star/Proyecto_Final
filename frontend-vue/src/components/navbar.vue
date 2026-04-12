<template>
  <nav class="navbar">
    <div class="nav-container">
      <h1 class="logo">🍽️ NutriApp</h1>
      <div class="nav-links">
        <router-link to="/">Inicio</router-link>
        <router-link to="/dietas">Mis Dietas</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 1rem 0;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  color: #667eea;
  font-size: 1.5rem;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #666;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #667eea;
}

.nav-links a.router-link-active {
  color: #667eea;
  font-weight: bold;
}
</style>