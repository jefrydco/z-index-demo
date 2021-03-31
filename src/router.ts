import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('./views/Index.vue') },
  { path: '/z-index', component: () => import('./views/ZIndexRegular.vue') },
  { path: '/z-index-visualize', component: () => import('./views/ZIndexVisualize.vue') },
  { path: '/keyframe-animation', component: () => import('./views/KeyframeAnimation.vue') },
  { path: '/transition', component: () => import('./views/Transition.vue') },
  { path: '/z-index-keyframe', component: () => import('./views/ZIndexKeyFrameAnimation.vue') },
  { path: '/state-machine', component: () => import('./views/StateMachine.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
