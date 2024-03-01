import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/lib/initializeAuth'
import { useUserStore } from '@/stores'
import api from '@/api'
import * as ROUTES from '@/lib/definitions/routes/main'
import { clearAuthentication } from '@/lib/initializeAuth'
import { clearAccessToken } from '@/lib/initializeStorage'
import HomeView from '@/views/HomeView.vue'

// Products
import ProductsView from '@/views/ProductsView.vue'
import QuotesView from '@/views/products/QuotesView.vue'
import GiphiesView from '@/views/products/GiphiesView.vue'
import ImageToTextView from '@/views/products/ImageToTextView.vue'

// Other Public Routes
import PricingView from '@/views/PricingView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import ActivateView from '@/views/ActivateView.vue'

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
      path: ROUTES.HOME.path,
      name: ROUTES.HOME.name,
      component: HomeView
    },
    {
      path: ROUTES.PRODUCTS.path,
      name: ROUTES.PRODUCTS.name,
      component: ProductsView
    },
    {
      path: ROUTES.PRICING.path,
      name: ROUTES.PRICING.name,
      component: PricingView
    },
    {
      path: ROUTES.CONTACT.path,
      name: ROUTES.CONTACT.name,
      component: () => import('@/views/ContactView.vue')
    },
    {
      path: ROUTES.ABOUT.path,
      name: ROUTES.ABOUT.name,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    // Handle all unmatched routes with the NotFound component
    {
      path: ROUTES.NOT_FOUND.path,
      name: ROUTES.NOT_FOUND.name,
      component: () => import('@/views/NotFound.vue')
    },
    {
      path: ROUTES.REGISTER.path,
      name: ROUTES.REGISTER.name,
      component: RegisterView,
      meta: ROUTES.REGISTER.meta
    },
    {
      path: ROUTES.LOGIN.path,
      name: ROUTES.LOGIN.name,
      component: LoginView,
      meta: ROUTES.LOGIN.meta
    },
    {
      path: ROUTES.RESET_PASSWORD.path,
      name: ROUTES.RESET_PASSWORD.name,
      component: ResetPasswordView,
      meta: ROUTES.RESET_PASSWORD.meta
    },
    {
      path: ROUTES.ACTIVATE.path,
      name: ROUTES.ACTIVATE.name,
      component: ActivateView
    },
    // Products
    {
      path: ROUTES.QUOTES.path,
      name: ROUTES.QUOTES.name,
      component: QuotesView,
      meta: ROUTES.QUOTES.meta
    },
    {
      path: ROUTES.GIPHIES.path,
      name: ROUTES.GIPHIES.name,
      component: GiphiesView,
      meta: ROUTES.GIPHIES.meta
    },
    {
      path: ROUTES.IMAGE_TO_TEXT.path,
      name: ROUTES.IMAGE_TO_TEXT.name,
      component: ImageToTextView,
      meta: ROUTES.IMAGE_TO_TEXT.meta
    },
    // Dashboard
    {
      path: ROUTES.DASHBOARD.path,
      name: ROUTES.DASHBOARD.name,
      component: DashboardView,
      meta: ROUTES.DASHBOARD.meta
    },
    {
      path: ROUTES.API_KEY.path,
      name: ROUTES.API_KEY.name,
      component: ApiKeyView,
      meta: ROUTES.API_KEY.meta
    },
    {
      path: ROUTES.TEST_API.path,
      name: ROUTES.TEST_API.name,
      component: TestApiView,
      meta: ROUTES.TEST_API.meta
    },
    // Settings
    {
      path: ROUTES.SETTINGS.path,
      name: ROUTES.SETTINGS.name,
      component: ProfileView,
      meta: ROUTES.SETTINGS.meta
    },
    {
      path: ROUTES.PROFILE.path,
      name: ROUTES.PROFILE.name,
      component: ProfileView,
      meta: ROUTES.PROFILE.meta
    },
    {
      path: ROUTES.ACCOUNT.path,
      name: ROUTES.ACCOUNT.name,
      component: AccountView,
      meta: ROUTES.ACCOUNT.meta
    },
    {
      path: ROUTES.APPEARANCE.path,
      name: ROUTES.APPEARANCE.name,
      component: AppearanceView,
      meta: ROUTES.APPEARANCE.meta
    },
    {
      path: ROUTES.NOTIFICATIONS.path,
      name: ROUTES.NOTIFICATIONS.name,
      component: NotificationsView,
      meta: ROUTES.NOTIFICATIONS.meta
    },
    {
      path: ROUTES.DISPLAY.path,
      name: ROUTES.DISPLAY.name,
      component: DisplayView,
      meta: ROUTES.DISPLAY.meta
    }
  ]
})

// Add a beforeEach navigation guard
// On refresh, the beforeEach guard is not triggered
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // Fetch user data if user is authenticated
  if (isAuthenticated() && !userStore.isLoggedIn) {
    try {
      const userData = await api.user.getUser()
      userStore.setUser(userData)
    } catch (error) {
      console.error(error)

      // Logout
      clearAuthentication()
      clearAccessToken()

      // Redirect to the login page
      router.push(ROUTES.LOGIN.path)
    }
  }

  // if user is not authenticated and auth is required, redirect to /login route
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next(ROUTES.LOGIN.path)
  }

  // if user is authenticated and route is /login /reset-password or /register, redirect to /dashboard route
  else if (to.meta.authRoute && isAuthenticated()) {
    next(ROUTES.DASHBOARD.path)
  }

  // if user is authenticated but not activated, redirect to /activate route
  else if (to.meta.requiresAuth && isAuthenticated() && !userStore.isUserConfirmed) {
    next(ROUTES.ACTIVATE.path)
  }

  // if path is /settings then redirect to /settings/profile
  else if (to.path === ROUTES.SETTINGS.path) {
    next(ROUTES.PROFILE.path)
  } else {
    // User is authenticated or the route doesn't require authentication, proceed
    next()
  }
})

export default router
