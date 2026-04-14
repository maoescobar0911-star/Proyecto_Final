<template>
  <div class="registro-container">
    <div class="registro-card">
      <h2>📝 Registro de Usuario</h2>
      
      <div class="form-group">
        <label>Nombre</label>
        <input type="text" v-model="nombre" placeholder="Tu nombre">
      </div>

      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" placeholder="correo@ejemplo.com">
      </div>

      <div class="form-group">
        <label>Contraseña</label>
        <input type="password" v-model="password" placeholder="********">
      </div>

      <button @click="registrar" class="btn-registro">Registrarse</button>

      <div v-if="mensaje" :class="['mensaje', error ? 'error' : 'success']">
        {{ mensaje }}
      </div>

      <p class="login-link">
        ¿Ya tienes cuenta? <router-link to="/login">Inicia sesión aquí</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegistroView',
  data() {
    return {
      nombre: '',
      email: '',
      password: '',
      mensaje: '',
      error: false
    }
  },
  methods: {
    async registrar() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', {
          nombre: this.nombre,
          email: this.email,
          password: this.password
        })
        
        this.mensaje = response.data.msg || '✅ Usuario registrado exitosamente'
        this.error = false
        
        setTimeout(() => {
          this.$router.push('/login')
        }, 1500)
      } catch (error) {
        this.mensaje = error.response?.data?.msg || 'Error al registrar usuario'
        this.error = true
      }
    }
  }
}
</script>

<style scoped>
.registro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.registro-card {
  background: white;
  border-radius: 25px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.registro-card h2 {
  text-align: center;
  color: #667eea;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.btn-registro {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s;
}

.btn-registro:hover {
  transform: translateY(-2px);
}

.mensaje {
  margin-top: 20px;
  padding: 12px;
  border-radius: 10px;
  text-align: center;
}

.success {
  background: #d4edda;
  color: #155724;
}

.error {
  background: #f8d7da;
  color: #721c24;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.login-link a {
  color: #667eea;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>