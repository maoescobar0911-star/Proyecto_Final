<template>
  <div class="login-container">
    <div class="login-card">
      <h2>🔐 Iniciar Sesión</h2>
      
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" placeholder="correo@ejemplo.com">
      </div>

      <div class="form-group">
        <label>Contraseña</label>
        <input type="password" v-model="password" placeholder="********">
      </div>

      <button @click="login" class="btn-login">Ingresar</button>

      <div v-if="mensaje" :class="['mensaje', error ? 'error' : 'success']">
        {{ mensaje }}
      </div>

      <p class="registro-link">
        ¿No tienes cuenta? <router-link to="/registro">Regístrate aquí</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      mensaje: '',
      error: false
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: this.email,
          password: this.password
        })
        
        if (response.data.token) {
          localStorage.setItem('token', response.data.token)
          this.mensaje = '✅ Login exitoso'
          this.error = false
          setTimeout(() => {
            this.$router.push('/dietas')
          }, 1500)
        } else {
          this.mensaje = response.data.msg || 'Error al iniciar sesión'
          this.error = true
        }
      } catch (error) {
        this.mensaje = error.response?.data?.msg || 'Error de conexión'
        this.error = true
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 25px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.login-card h2 {
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

.btn-login {
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

.btn-login:hover {
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

.registro-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.registro-link a {
  color: #667eea;
  text-decoration: none;
}

.registro-link a:hover {
  text-decoration: underline;
}
</style>