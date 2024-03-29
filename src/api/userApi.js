import axios from 'axios'

// Set the `withCredentials` option to `true` to include credentials (cookies)
// axios.defaults.withCredentials = true

import { setAuthentication } from '@/lib/initializeAuth'

import { updateAccessToken } from '@/lib/initializeStorage'
import { initializeAccessToken } from '@/lib/initializeStorage'
import { BASE_URL_SERVER } from '@/config'

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL_SERVER}/register`,
      {
        email,
        password
      },
      {
        withCredentials: true
      }
    )

    // Store userId in localStorage
    setAuthentication(response.data.uuid)
    // Generate API key and store token in localStorage
    await initializeAccessToken()

    return response.data
  } catch (error) {
    // If the response has an error message, include it in the error object
    if (error.response && error.response.data && error.response.data.error) {
      throw error.response.data.error
    }
    throw new Error('An unexpected error occurred during registration. Please try again later.')
  }
}

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${BASE_URL_SERVER}/login`,
      {
        email,
        password
      },
      {
        withCredentials: true
      }
    )

    // Store userId in localStorage
    setAuthentication(response.data.uuid)
    // Store token in localStorage
    await updateAccessToken()

    return response.data
  } catch (error) {
    // If the response has an error message, include it in the error object
    if (error.response && error.response.data && error.response.data.error) {
      throw error.response.data.error
    }
    // eslint-disable-next-line no-console
    // console.error('Error logging in:', error)
    throw new Error('An unexpected error occurred during login. Please try again later.')
  }
}

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL_SERVER}/forgot-password`, {
      email
    })

    return response.data
  } catch (error) {
    // If the response has an error message, include it in the error object
    if (error.response && error.response.data && error.response.data.error) {
      throw error.response.data.error
    }
    // eslint-disable-next-line no-console
    // console.error('Error logging in:', error)
    throw new Error('An unexpected error occurred in forgot password. Please try again later.')
  }
}

export const resetPassword = async (password, token) => {
  try {
    const response = await axios.post(`${BASE_URL_SERVER}/reset-password/${token}`, {
      password
    })

    return response.data
  } catch (error) {
    // If the response has an error message, include it in the error object
    if (error.response && error.response.data && error.response.data.error) {
      throw error.response.data.error
    }
    // eslint-disable-next-line no-console
    // console.error('Error logging in:', error)
    throw new Error('An unexpected error occurred in reset password. Please try again later.')
  }
}

export const activateUser = async (userActivationCode) => {
  try {
    const response = await axios.get(`${BASE_URL_SERVER}/activate`, {
      params: { code: userActivationCode },
      withCredentials: true
    })

    return response.data
  } catch (error) {
    // If the response has an error message, include it in the error object
    if (error.response && error.response.data && error.response.data.error) {
      throw error.response.data.error
    }
    throw new Error('An unexpected error occurred during user activation. Please try again later.')
  }
}

export const resendActivation = async (email) => {
  try {
    const response = await axios.post(
      `${BASE_URL_SERVER}/resend-activation`,
      {
        email: email
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
}

export const getUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL_SERVER}/get-user`, {
      withCredentials: true
    })

    return response.data
  } catch (error) {
    // If the response has an error message, include it in the error object
    if (error.response && error.response.data && error.response.data.error) {
      throw error.response.data.error
    }
    throw new Error(
      'An unexpected error occurred during fetching user data. Please try again later.'
    )
  }
}

export const logoutUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL_SERVER}/logout`, {
      withCredentials: true
    })

    if (response.status === 200) {
      return response.data
    } else {
      console.error('Unexpected status during logout:', response.status)
      throw new Error('Logout failed: An unexpected status during logout')
    }
  } catch (error) {
    // If the response has an error message, include it in the error object
    if (error.response && error.response.data && error.response.data.error) {
      throw error.response.data.error
    }
    throw new Error('An unexpected error occurred during logout. Please try again later.')
  }
}
