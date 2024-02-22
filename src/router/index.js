import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/lib/authUtils'
import { useUserStore } from '@/stores'
import { api } from '@/api'
import * as ROUTES from '@/lib/definitions/routes/main'
import HomeView from '@/views/HomeView.vue'

// Products
import ProductsView from '@/views/ProductsView.vue'
import QuotesView from '@/views/products/QuotesView.vue'
import GiphiesView from '@/views/products/GiphiesView.vue'
import ImageToTextView from '@/views/products/ImageToTextView.vue'

// Other Public Routes
import PricingView from '@/views/PricingView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
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
      path: ROUTES.home.path,
      name: ROUTES.home.name,
      component: HomeView
    },
    {
      path: ROUTES.products.path,
      name: ROUTES.products.name,
      component: ProductsView
    },
    {
      path: ROUTES.quotes.path,
      name: ROUTES.quotes.name,
      component: QuotesView
    },
    {
      path: ROUTES.giphies.path,
      name: ROUTES.giphies.name,
      component: GiphiesView
    },
    {
      path: ROUTES.imageToText.path,
      name: ROUTES.imageToText.name,
      component: ImageToTextView
    },
    {
      path: ROUTES.pricing.path,
      name: ROUTES.pricing.name,
      component: PricingView
    },
    {
      path: ROUTES.about.path,
      name: ROUTES.about.name,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: ROUTES.contact.path,
      name: ROUTES.contact.name,
      component: () => import('@/views/ContactView.vue')
    },
    // Handle all unmatched routes with the NotFound component
    {
      path: ROUTES.notfound.path,
      name: ROUTES.notfound.name,
      component: () => import('@/views/NotFound.vue')
    },
    {
      path: ROUTES.login.path,
      name: ROUTES.login.name,
      component: LoginView,
      meta: ROUTES.login.meta
    },
    {
      path: ROUTES.register.path,
      name: ROUTES.register.name,
      component: RegisterView,
      meta: ROUTES.register.meta
    },
    {
      path: ROUTES.activate.path,
      name: ROUTES.activate.name,
      component: ActivateView
    },
    {
      path: ROUTES.dashboard.path,
      name: ROUTES.dashboard.name,
      component: DashboardView,
      meta: ROUTES.dashboard.meta
    },
    {
      path: ROUTES.apiKey.path,
      name: ROUTES.apiKey.name,
      component: ApiKeyView,
      meta: ROUTES.apiKey.meta
    },
    {
      path: ROUTES.testApi.path,
      name: ROUTES.testApi.name,
      component: TestApiView,
      meta: ROUTES.testApi.meta
    },
    {
      path: ROUTES.settings.path,
      name: ROUTES.settings.name,
      component: ProfileView,
      meta: ROUTES.settings.meta
    },
    {
      path: ROUTES.profile.path,
      name: ROUTES.profile.name,
      component: ProfileView,
      meta: ROUTES.profile.meta
    },
    {
      path: ROUTES.account.path,
      name: ROUTES.account.name,
      component: AccountView,
      meta: ROUTES.account.meta
    },
    {
      path: ROUTES.appearance.path,
      name: ROUTES.appearance.name,
      component: AppearanceView,
      meta: ROUTES.appearance.meta
    },
    {
      path: ROUTES.notifications.path,
      name: ROUTES.notifications.name,
      component: NotificationsView,
      meta: ROUTES.notifications.meta
    },
    {
      path: ROUTES.display.path,
      name: ROUTES.display.name,
      component: DisplayView,
      meta: ROUTES.display.meta
    }
  ]
})

// Add a beforeEach navigation guard
// On refresh, the beforeEach guard is not triggered
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // Fetch user data if user is authenticated and auth is required
  if (to.meta.requiresAuth && !userStore.isLoggedIn && isAuthenticated()) {
    try {
      const userData = await api.getUser()
      userStore.setUser(userData)
    } catch (error) {
      console.error(error)
    }
  }

  // if user is not authenticated and auth is required, redirect to /login route
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next(ROUTES.login.path)
  }

  // if user is authenticated and route is /login or /register, redirect to /login route
  else if (to.meta.authRoute && isAuthenticated()) {
    next(ROUTES.dashboard.path)
  }

  // if user is authenticated but not activated, redirect to /activate route
  else if (to.meta.requiresAuth && isAuthenticated() && !userStore.isUserActivated) {
    next(ROUTES.activate.path)
  }

  // if path is /settings then redirect to /settings/profile
  else if (to.path === ROUTES.settings.path) {
    next(ROUTES.profile.path)
  } else {
    // User is authenticated or the route doesn't require authentication, proceed
    next()
  }
})

export default router
