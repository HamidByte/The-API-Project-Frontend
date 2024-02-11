import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/lib/authUtils'
import * as ROUTES from '@/lib/definitions/routes/main'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

// Dashboard
import DashboardView from '@/views/dashboard/DashboardView.vue'
import ApiKeyView from '@/views/dashboard/ApiKeyView.vue'
import TestApiView from '@/views/dashboard/TestApiView.vue'

// Settings
import ProfileView from '@/views/settings/ProfileView.vue'
import AccountView from '@/views/settings//AccountView.vue'
import AppearanceView from '@/views/settings//AppearanceView.vue'
import NotificationsView from '@/views/settings//NotificationsView.vue'
import DisplayView from '@/views/settings//DisplayView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.home.path,
      name: ROUTES.home.name,
      component: HomeView
    },
    {
      path: ROUTES.login.path,
      name: ROUTES.login.name,
      component: LoginView,
      meta: { hideNavigation: true },
      beforeEnter: (to, from, next) => {
        // Check if the user is already authenticated
        if (isAuthenticated()) {
          // User is already authenticated, redirect to dashboard route
          next(ROUTES.dashboard.path)
        } else {
          // User is not authenticated, allow access to the login route
          next()
        }
      }
    },
    {
      path: ROUTES.register.path,
      name: ROUTES.register.name,
      component: RegisterView,
      meta: { hideNavigation: true },
      beforeEnter: (to, from, next) => {
        // Check if the user is already authenticated
        if (isAuthenticated()) {
          // User is already authenticated, redirect to dashboard route
          next(ROUTES.dashboard.path)
        } else {
          // User is not authenticated, allow access to the register route
          next()
        }
      }
    },
    {
      path: ROUTES.activate.path,
      name: ROUTES.activate.name,
      component: () => import('@/views/ActivateView.vue')
    },
    {
      path: ROUTES.dashboard.path,
      name: ROUTES.dashboard.name,
      component: DashboardView,
      beforeEnter: (to, from, next) => {
        // Check if the user is authenticated
        if (isAuthenticated()) {
          // User is authenticated, allow access to the dashboard route
          next()
        } else {
          // User is not authenticated, redirect to login route
          next(ROUTES.login.path) // Redirect to the login route
        }
      }
    },
    {
      path: ROUTES.apiKey.path,
      name: ROUTES.apiKey.name,
      component: ApiKeyView,
      beforeEnter: (to, from, next) => {
        // Check if the user is authenticated
        if (isAuthenticated()) {
          // User is authenticated, allow access to the dashboard route
          next()
        } else {
          // User is not authenticated, redirect to login route
          next(ROUTES.login.path) // Redirect to the login route
        }
      }
    },
    {
      path: ROUTES.testApi.path,
      name: ROUTES.testApi.name,
      component: TestApiView,
      beforeEnter: (to, from, next) => {
        // Check if the user is authenticated
        if (isAuthenticated()) {
          // User is authenticated, allow access to the dashboard route
          next()
        } else {
          // User is not authenticated, redirect to login route
          next(ROUTES.login.path) // Redirect to the login route
        }
      }
    },
    {
      path: ROUTES.contact.path,
      name: ROUTES.contact.name,
      component: () => import('../views/ContactView.vue')
    },
    {
      path: ROUTES.about.path,
      name: ROUTES.about.name,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: ROUTES.settings.path,
      name: ROUTES.settings.name,
      component: ProfileView,
      beforeEnter: (to, from, next) => {
        // Check if the user is authenticated
        if (isAuthenticated()) {
          // User is authenticated, redirect to /settings/profile
          next(ROUTES.profile.path)
        } else {
          // User is not authenticated, redirect to login route
          next(ROUTES.login.path)
        }
      }
    },
    {
      path: ROUTES.profile.path,
      name: ROUTES.profile.name,
      component: ProfileView,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next()
        } else {
          next(ROUTES.login.path)
        }
      }
    },
    {
      path: ROUTES.account.path,
      name: ROUTES.account.name,
      component: AccountView,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next()
        } else {
          next(ROUTES.login.path)
        }
      }
    },
    {
      path: ROUTES.appearance.path,
      name: ROUTES.appearance.name,
      component: AppearanceView,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next()
        } else {
          next(ROUTES.login.path)
        }
      }
    },
    {
      path: ROUTES.notifications.path,
      name: ROUTES.notifications.name,
      component: NotificationsView,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next()
        } else {
          next(ROUTES.login.path)
        }
      }
    },
    {
      path: ROUTES.display.path,
      name: ROUTES.display.name,
      component: DisplayView,
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next()
        } else {
          next(ROUTES.login.path)
        }
      }
    }
  ]
})

export default router
