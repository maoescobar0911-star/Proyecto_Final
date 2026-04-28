import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistroView from '../views/RegistroView.vue'
import DietasView from '../views/DietasView.vue'
import AdminView from '../views/AdminView.vue'
import { getSession } from '../services/session'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/registro', name: 'registro', component: RegistroView },
  { path: '/dietas', name: 'dietas', component: DietasView, meta: { requiresAuth: true } },
  { path: '/admin', name: 'admin', component: AdminView, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/notas', redirect: '/dietas' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const session = getSession()

  if (to.meta.requiresAuth && !session) {
    return { path: '/login' }
  }

  if (to.meta.requiresAdmin && session?.rol !== 'admin') {
    return { path: '/dietas' }
  }

  if ((to.path === '/login' || to.path === '/registro') && session) {
    return { path: '/dietas' }
  }
})

export default router
