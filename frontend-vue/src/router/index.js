import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DietasView from '../views/DietasView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/dietas', name: 'dietas', component: DietasView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router