import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('./views/Index.vue') },
  { path: '/z-index', component: () => import('./views/ZIndexRegular.vue') },
  { path: '/z-index-visualize', component: () => import('./views/ZIndexVisualize.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
