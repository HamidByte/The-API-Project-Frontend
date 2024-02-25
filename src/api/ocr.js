import axios from 'axios'
import { useUserStore } from '@/stores'
import { getAccessToken } from '@/lib/initializeStorage'

import { BASE_URL_SERVER } from '@/config'

export const fetchImageToText = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL_SERVER}/api/v1/ocr/image-to-text`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getAccessToken()}`
      }
    })

    const userStore = useUserStore()
    userStore.setUser({ creditCount: userStore.user.creditCount + 10 })

    return response.data
  } catch (error) {
    // If the response has an error message, include it in the error object
    if (error.response && error.response.data && error.response.data.error) {
      throw error.response.data.error
    }
    throw new Error(
      'An unexpected error occurred during fetching image to text. Please try again later.'
    )
  }
}
