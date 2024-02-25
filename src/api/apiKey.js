import axios from 'axios'

import { BASE_URL_SERVER } from '@/config'

export const generateApiKey = async (tokenExpirationInSeconds) => {
  try {
    const response = await axios.post(
      `${BASE_URL_SERVER}/generate`,
      {
        tokenExpiration: tokenExpirationInSeconds
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
      'An unexpected error occurred during generating API key. Please try again later.'
    )
  }
}

export const getAccessToken = async () => {
  try {
    const response = await axios.get(`${BASE_URL_SERVER}/api-key`, {
      withCredentials: true
    })

    return response.data
  } catch (error) {
    // If the response has an error message, include it in the error object
    if (error.response && error.response.data && error.response.data.error) {
      throw error.response.data.error
    }
    throw new Error('An unexpected error occurred during fetching API key. Please try again later.')
  }
}

export const deleteApiKey = async () => {
  try {
    const response = await axios.delete(`${BASE_URL_SERVER}/revoke`, {
      withCredentials: true
    })

    return response.data
  } catch (error) {
    // If the response has an error message, include it in the error object
    if (error.response && error.response.data && error.response.data.error) {
      throw error.response.data.error
    }
    throw new Error('An unexpected error occurred during deleting API key. Please try again later.')
  }
}
