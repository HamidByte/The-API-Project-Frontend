import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'

// Assuming you have a function to check authentication status, e.g., isAuthenticated()
const isAuthenticated = () => {
  // Check if user is authenticated (example: check session storage or cookies)
  const userId = sessionStorage.getItem('userId')
  return !!userId // Return true if authenticated, false otherwise
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { hideNavigation: true },
      beforeEnter: (to, from, next) => {
        // Check if the user is already authenticated
        if (isAuthenticated()) {
          // User is already authenticated, redirect to dashboard or another route
          next('/dashboard') // Redirect to the dashboard route
        } else {
          // User is not authenticated, allow access to the login route
          next()
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { hideNavigation: true },
      beforeEnter: (to, from, next) => {
        // Check if the user is already authenticated
        if (isAuthenticated()) {
          // User is already authenticated, redirect to dashboard or another route
          next('/dashboard') // Redirect to the dashboard route
        } else {
          // User is not authenticated, allow access to the register route
          next()
        }
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      beforeEnter: (to, from, next) => {
        // Check if the user is authenticated
        if (isAuthenticated()) {
          // User is authenticated, allow access to the route
          next()
        } else {
          // User is not authenticated, redirect to login or another route
          next('/login') // Redirect to the login route
        }
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
