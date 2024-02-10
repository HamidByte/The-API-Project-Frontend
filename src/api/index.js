import axios from 'axios'

// Set the `withCredentials` option to `true` to include credentials (cookies)
// axios.defaults.withCredentials = true

import { storeUserId } from '@/lib/authUtils'

export const api = {
  async loginUser(email, password) {
    try {
      const response = await axios.post(
        `http://localhost:3000/login`,
        {
          email,
          password
        },
        {
          // Set the `withCredentials` option to `true` to include credentials (cookies)
          withCredentials: true
        }
      )

      // Get user data from the response
      const userData = response.data

      // Store userId in sessionStorage and localStorage
      storeUserId(userData.uuid)

      return userData
    } catch (error) {
      // If the response has an error message, include it in the error object
      if (error.response && error.response.data && error.response.data.error) {
        throw error.response.data.error
      }
      // eslint-disable-next-line no-console
      // console.error('Error logging in:', error)
      throw new Error('An unexpected error occurred during login. Please try again later.')
    }
  },

  async registerUser(email, password) {
    try {
      const response = await axios.post(
        `http://localhost:3000/register`,
        {
          email,
          password
        },
        {
          // Set the `withCredentials` option to `true` to include credentials (cookies)
          withCredentials: true
        }
      )

      // Get user data from the response
      const userData = response.data

      // Store userId in sessionStorage and localStorage
      storeUserId(userData.uuid)

      return userData
    } catch (error) {
      // If the response has an error message, include it in the error object
      if (error.response && error.response.data && error.response.data.error) {
        throw error.response.data.error
      }
      // eslint-disable-next-line no-console
      // console.error('Error registering user:', error)
      throw new Error('An unexpected error occurred during registration. Please try again later.')
    }
  },

  async getUser() {
    try {
      const response = await axios.get(`http://localhost:3000/get-user`, {
        // Set the `withCredentials` option to `true` to include credentials (cookies)
        withCredentials: true
      })

      // Get user data from the response
      const userData = response.data

      return userData
    } catch (error) {
      // If the response has an error message, include it in the error object
      if (error.response && error.response.data && error.response.data.error) {
        throw error.response.data.error
      }
      // eslint-disable-next-line no-console
      // console.error('Error fetching user data:', error)
      throw new Error(
        'An unexpected error occurred during fetching user data. Please try again later.'
      )
    }
  }
}
