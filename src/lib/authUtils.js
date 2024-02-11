// Set authentication
export const storeUserId = (userId) => {
  // Store userId in session storage
  sessionStorage.setItem('userId', JSON.stringify(userId))

  // Store userId in local storage
  localStorage.setItem('userId', JSON.stringify(userId))

  // Store userId in cookies (optional)
  //   document.cookie = `userId=${JSON.stringify(userId)}; path=/`
}

// Check authentication status
export const isAuthenticated = () => {
  // Check if user is authenticated (example: check session storage or cookies)
  const userId = sessionStorage.getItem('userId') || localStorage.getItem('userId')
  return !!userId // Return true if authenticated, false otherwise
}

// Remove authentication
export const clearUserId = () => {
  // Remove userId from session storage
  sessionStorage.removeItem('userId')

  // Remove userId from local storage
  localStorage.removeItem('userId')

  // Optionally, you can also clear the cookies if you stored userId in cookies
  //   document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}