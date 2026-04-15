<template>
  <div>
    <!-- Barra de navegación -->
    <nav style="background: white; padding: 15px; text-align: center;">
      <router-link to="/" style="margin: 0 10px;">Inicio</router-link>
      <router-link to="/login" style="margin: 0 10px;">Login</router-link>
      <router-link to="/registro" style="margin: 0 10px;">Registro</router-link>
      <router-link to="/dietas" style="margin: 0 10px;">Dietas</router-link>
    </nav>

    <!-- Contenido de la página -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

router-view {
  display: block;
  padding: 20px;
  color: white;
  text-align: center;
}
</style>