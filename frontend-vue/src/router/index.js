import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DietasView from '../views/DietasView.vue'
import LoginView from '../views/LoginView.vue'
import RegistroView from '../views/RegistroView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/dietas', name: 'dietas', component: DietasView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/registro', name: 'registro', component: RegistroView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router