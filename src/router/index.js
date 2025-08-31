// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView,
//     },
//     {
//       path: '/about',
//       name: 'about',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () => import('../views/AboutView.vue'),
//     },
//   ],
// })

// export default router

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/LoginHome.vue'
import Home from '@/pages/DefaultPage.vue'
import ModuleInfo from '@/pages/ModuleInfo.vue'
import ActionsModules from '@/pages/ActionsModules.vue'
import API_CONFIG from '@/config/api.js'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/module/:moduleName',
    name: 'ModuleInfo',
    component: ModuleInfo,
    meta: { requiresAuth: true },
  },
  {
    path: '/actions',
    name: 'ActionsModules',
    component: ActionsModules,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('authToken')
    if (!token) {
      return next('/login')
    }
    try {
      await API_CONFIG.get('/accounts/get_me/')
      next()
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      localStorage.removeItem('authToken')
      next('/login')
    }
  } else {
    next()
  }
})

export default router
