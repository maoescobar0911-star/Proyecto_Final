import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistroView from '../views/RegistroView.vue'
import DietasView from '../views/DietasView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/registro', name: 'registro', component: RegistroView },
  { path: '/notas', name: 'notas', component: DietasView },
  { path: '/dietas', redirect: '/notas' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
