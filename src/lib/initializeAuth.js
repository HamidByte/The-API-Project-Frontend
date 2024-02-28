import Cookies from 'js-cookie'
import { useUserStore } from '@/stores'

export const setAuthentication = (userId) => {
  // Create a user object
  const user = {
    userId: userId
  }

  // Store the user object in localStorage
  localStorage.setItem('user', JSON.stringify(user))

  // Store the user object in cookies
  // Cookies.set('user', JSON.stringify(user))
}

export const isAuthenticated = () => {
  // Check if user is authenticated (example: check sessionStorage, localStorage or cookies)
  const userString = localStorage.getItem('user')
  const connectSidCookie = Cookies.get('connect.sid')

  if (userString && connectSidCookie) {
    // Parse the user object from the stored string
    const user = JSON.parse(userString)

    // Extract userId from the user object
    const userId = user && user.userId

    return !!userId // Return true if authenticated, false otherwise
  }

  clearAuthentication()

  return false // Return false if user information is not found
}

export const clearAuthentication = () => {
  // Clear user object from store
  const userStore = useUserStore()
  userStore.clearUser()

  // Clear local storage
  localStorage.removeItem('user')
  localStorage.removeItem('token')

  // Clear the cookies
  Cookies.remove('connect.sid')
}
