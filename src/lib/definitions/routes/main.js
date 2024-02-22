export const home = { path: '/', name: 'home' }
export const products = { path: '/products', name: 'products' }
export const quotes = { path: '/quotes', name: 'quotes' }
export const giphies = { path: '/giphies', name: 'giphies' }
export const imageToText = { path: '/image-to-text', name: 'imageToText' }
export const pricing = { path: '/pricing', name: 'pricing' }
export const about = { path: '/about', name: 'about' }
export const contact = { path: '/contact', name: 'contact' }
export const notfound = { path: '/:pathMatch(.*)*', name: 'not_found' }

export const login = {
  path: '/login',
  name: 'login',
  meta: { hideNavigation: true, authRoute: true }
}
export const register = {
  path: '/register',
  name: 'register',
  meta: { hideNavigation: true, authRoute: true }
}
export const activate = {
  path: '/activate',
  name: 'activate'
  // meta: { requiresAuth: true }
}

// Dashboard
export const dashboard = {
  path: '/dashboard',
  name: 'dashboard',
  meta: { requiresAuth: true }
}
export const apiKey = {
  path: '/api-key',
  name: 'apiKey',
  meta: { requiresAuth: true }
}
export const testApi = {
  path: '/test-api',
  name: 'testApi',
  meta: { requiresAuth: true }
}

// Settings
export const settings = {
  path: '/settings',
  name: 'settings',
  meta: { requiresAuth: true }
}
export const profile = {
  path: '/settings/profile',
  name: 'profile',
  meta: { requiresAuth: true }
}
export const account = {
  path: '/settings/account',
  name: 'account',
  meta: { requiresAuth: true }
}
export const appearance = {
  path: '/settings/appearance',
  name: 'appearance',
  meta: { requiresAuth: true }
}
export const notifications = {
  path: '/settings/notifications',
  name: 'notifications',
  meta: { requiresAuth: true }
}
export const display = {
  path: '/settings/display',
  name: 'display',
  meta: { requiresAuth: true }
}
