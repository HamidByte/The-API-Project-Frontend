import axios from 'axios'
import { useUserStore } from '@/stores'

import { BASE_URL_SERVER } from '@/config'

export const getRandomQuote = async (authToken) => {
  try {
    if (!authToken) {
      throw new Error('Missing authToken.')
    }

    const response = await axios.get(`${BASE_URL_SERVER}/api/v1/quote/random`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })

    const userStore = useUserStore()
    userStore.setUser({ creditCount: userStore.user.creditCount + 1 })

    return response.data
  } catch (error) {
    // If the response has an error message, include it in the error object
    if (error.response && error.response.data && error.response.data.error) {
      throw error.response.data.error
    }
    throw new Error(
      'An unexpected error occurred during fetching random quote. Please try again later.'
    )
  }
}
