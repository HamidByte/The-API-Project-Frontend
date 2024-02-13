import axios from 'axios'

// Set the `withCredentials` option to `true` to include credentials (cookies)
// axios.defaults.withCredentials = true

import { setAuthentication } from '@/lib/authUtils'
import { BASE_URL_SERVER } from '@/config'

export const api = {
  async loginUser(email, password) {
    try {
      const response = await axios.post(
        `${BASE_URL_SERVER}/login`,
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
      setAuthentication(userData.uuid)

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
        `${BASE_URL_SERVER}/register`,
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
      setAuthentication(userData.uuid)

      return userData
    } catch (error) {
      // If the response has an error message, include it in the error object
      if (error.response && error.response.data && error.response.data.error) {
        throw error.response.data.error
      }
      throw new Error('An unexpected error occurred during registration. Please try again later.')
    }
  },

  async activateUser(token) {
    try {
      const response = await axios.get(
        `${BASE_URL_SERVER}/activate`,
        { params: { token } },
        {
          withCredentials: true
        }
      )

      return response.data
    } catch (error) {
      // If the response has an error message, include it in the error object
      if (error.response && error.response.data && error.response.data.error) {
        throw error.response.data.error
      }
      throw new Error(
        'An unexpected error occurred during user activation. Please try again later.'
      )
    }
  },

  async resendActivation(email) {
    try {
      const response = await axios.post(
        `${BASE_URL_SERVER}/resend-activation`,
        {
          email
        },
        {
          withCredentials: true
        }
      )

      return response.data
    } catch (error) {
      // If the response has an error message, include it in the error object
      if (error.response && error.response.data && error.response.data.error) {
        throw error.response.data.error
      }
      throw new Error(
        'An unexpected error occurred during sending activation email. Please try again later.'
      )
    }
  },

  async getUser() {
    try {
      const response = await axios.get(`${BASE_URL_SERVER}/get-user`, {
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
      throw new Error(
        'An unexpected error occurred during fetching user data. Please try again later.'
      )
    }
  },

  async getIsUserActive() {
    try {
      const response = await axios.get(`${BASE_URL_SERVER}/is-user-active`, {
        // Set the `withCredentials` option to `true` to include credentials (cookies)
        withCredentials: true
      })

      const result = response.data

      return result
    } catch (error) {
      // If the response has an error message, include it in the error object
      if (error.response && error.response.data && error.response.data.error) {
        throw error.response.data.error
      }
      throw new Error(
        'An unexpected error occurred during fetching user activation status. Please try again later.'
      )
    }
  },

  async generateApiKey(tokenExpirationInSeconds) {
    try {
      const response = await axios.post(
        `${BASE_URL_SERVER}/generate`,
        {
          tokenExpiration: tokenExpirationInSeconds
        },
        {
          // Set the `withCredentials` option to `true` to include credentials (cookies)
          withCredentials: true
        }
      )

      const apiKey = response.data

      return apiKey
    } catch (error) {
      // If the response has an error message, include it in the error object
      if (error.response && error.response.data && error.response.data.error) {
        throw error.response.data.error
      }
      throw new Error(
        'An unexpected error occurred during generating API key. Please try again later.'
      )
    }
  },

  async getApiKey() {
    try {
      const response = await axios.get(`${BASE_URL_SERVER}/api-key`, {
        // Set the `withCredentials` option to `true` to include credentials (cookies)
        withCredentials: true
      })

      const apiKey = response.data

      return apiKey
    } catch (error) {
      // If the response has an error message, include it in the error object
      if (error.response && error.response.data && error.response.data.error) {
        throw error.response.data.error
      }
      throw new Error(
        'An unexpected error occurred during fetching API key. Please try again later.'
      )
    }
  },

  async deleteApiKey() {
    try {
      const response = await axios.delete(`${BASE_URL_SERVER}/revoke`, {
        // Set the `withCredentials` option to `true` to include credentials (cookies)
        withCredentials: true
      })

      const result = response.data

      return result
    } catch (error) {
      // If the response has an error message, include it in the error object
      if (error.response && error.response.data && error.response.data.error) {
        throw error.response.data.error
      }
      throw new Error(
        'An unexpected error occurred during deleting API key. Please try again later.'
      )
    }
  }
}
