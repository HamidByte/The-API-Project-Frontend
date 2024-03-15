export const HOME = { path: '/', name: 'home' }
export const PRODUCTS = { path: '/products', name: 'products' }
export const PRICING = { path: '/pricing', name: 'pricing' }
export const API = {
  path: 'https://documenter.getpostman.com/view/11546737/2sA2r55Rev',
  name: 'api'
}
export const CONTACT = { path: '/contact', name: 'contact' }
export const ABOUT = { path: '/about', name: 'about' }
export const NOT_FOUND = { path: '/:pathMatch(.*)*', name: 'not_found' }

export const REGISTER = {
  path: '/register',
  name: 'register',
  meta: { hideNavigation: true, authRoute: true }
}
export const LOGIN = {
  path: '/login',
  name: 'login',
  meta: { hideNavigation: true, authRoute: true }
}
export const RESET_PASSWORD = {
  path: '/reset-password/:token',
  name: 'resetPassword',
  meta: { hideNavigation: true, authRoute: true }
}
export const ACTIVATE = {
  path: '/activate',
  name: 'activate'
}

// Dashboard
export const DASHBOARD = {
  path: '/dashboard',
  name: 'dashboard',
  meta: { requiresAuth: true }
}
export const API_KEY = {
  path: '/api-key',
  name: 'apiKey',
  meta: { requiresAuth: true }
}
export const TEST_API = {
  path: '/test-api',
  name: 'testApi',
  meta: { requiresAuth: true }
}

// Settings
export const SETTINGS = {
  path: '/settings',
  name: 'settings',
  meta: { requiresAuth: true }
}
export const PROFILE = {
  path: '/settings/profile',
  name: 'profile',
  meta: { requiresAuth: true }
}
export const ACCOUNT = {
  path: '/settings/account',
  name: 'account',
  meta: { requiresAuth: true }
}
export const APPEARANCE = {
  path: '/settings/appearance',
  name: 'appearance',
  meta: { requiresAuth: true }
}
export const NOTIFICATIONS = {
  path: '/settings/notifications',
  name: 'notifications',
  meta: { requiresAuth: true }
}
export const DISPLAY = {
  path: '/settings/display',
  name: 'display',
  meta: { requiresAuth: true }
}

// Products
export const QUOTES = {
  path: '/quotes',
  name: 'quotes',
  meta: { requiresAuth: true }
}
export const GIPHIES = {
  path: '/giphies',
  name: 'giphies',
  meta: { requiresAuth: true }
}
export const IMAGE_TO_TEXT = {
  path: '/image-to-text',
  name: 'imageToText',
  meta: { requiresAuth: true }
}
export const PUNJAB_VEHICLES = {
  path: '/pakistan/punjab-vehicles',
  name: 'punjabVehicles',
  meta: { requiresAuth: true }
}
