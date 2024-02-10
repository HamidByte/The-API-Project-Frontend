import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/lib/authUtils'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'

// Settings
import ProfileView from '@/views/ProfileView.vue'
import AccountView from '@/views/AccountView.vue'
import AppearanceView from '@/views/AppearanceView.vue'
import NotificationsView from '@/views/NotificationsView.vue'
import DisplayView from '@/views/DisplayView.vue'

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
          // User is already authenticated, redirect to dashboard route
          next('/dashboard')
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
          // User is already authenticated, redirect to dashboard route
          next('/dashboard')
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
          // User is authenticated, allow access to the dashboard route
          next()
        } else {
          // User is not authenticated, redirect to login route
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
    },
    {
      path: '/settings',
      name: 'settings',
      component: ProfileView,
      beforeEnter: (to, from, next) => {
        // Check if the user is authenticated
        if (isAuthenticated()) {
          // User is authenticated, redirect to /settings/profile
          next('/settings/profile')
        } else {
          // User is not authenticated, redirect to login route
          next('/login')
        }
      }
    },
    {
      path: '/settings/profile',
      name: 'profile',
      component: ProfileView,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/settings/account',
      name: 'account',
      component: AccountView,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/settings/appearance',
      name: 'appearance',
      component: AppearanceView,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/settings/notifications',
      name: 'notifications',
      component: NotificationsView,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/settings/display',
      name: 'display',
      component: DisplayView,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next()
        } else {
          next('/login')
        }
      }
    }
  ]
})

export default router
