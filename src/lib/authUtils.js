import Cookies from 'js-cookie'
import { useUserStore } from '@/stores'

// Set authentication
export const setAuthentication = (userId) => {
  // Create a user object
  const user = {
    userId: userId
  }

  // Store the user object in session storage
  sessionStorage.setItem('user', JSON.stringify(user))

  // Store the user object in local storage
  localStorage.setItem('user', JSON.stringify(user))

  // Store the user object in cookies
  Cookies.set('user', JSON.stringify(user))

  // If you want to store userId separately in cookies, you can do it like this:
  // Cookies.set('userId', userId);
}

// Remove authentication
export const clearAuthentication = () => {
  // Clear user object from store
  const userStore = useUserStore()
  userStore.clearUser()

  // Clear session storage
  sessionStorage.removeItem('user')

  // Clear local storage
  localStorage.removeItem('user')

  // Clear the cookies
  Cookies.remove('user')

  // If you stored userId separately in cookies, you can clear it like this:
  // Cookies.remove('userId');
}

// Check authentication status
export const isAuthenticated = () => {
  // Check if user is authenticated (example: check session storage or cookies)
  const userString = sessionStorage.getItem('user') || localStorage.getItem('user')

  if (userString) {
    // Parse the user object from the stored string
    const user = JSON.parse(userString)

    // Extract userId from the user object
    const userId = user && user.userId

    return !!userId // Return true if authenticated, false otherwise
  }

  return false // Return false if user information is not found
}
