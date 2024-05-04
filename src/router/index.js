import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'actual-route-link',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/despesas',
      name: 'despesas',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DespesasView.vue')
    },
    {
      path: '/despesas/:id',
      name: 'despesas-info',
      component: () => import('../views/DespesaInfoView.vue')
    }
  ]
})

export default router
