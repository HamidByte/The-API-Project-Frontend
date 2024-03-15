import axios from 'axios'
import { useUserStore } from '@/stores'
import { getAccessToken } from '@/lib/initializeStorage'

import { BASE_URL_SERVER } from '@/config'

export const fetchPunjabVehicleByRegistration = async (regNo) => {
  try {
    const response = await axios.get(
      `${BASE_URL_SERVER}/api/v1/pakistan/punjab-vehicles?regNo=${regNo}`,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      }
    )

    const userStore = useUserStore()
    userStore.setUser({ creditCount: userStore.user.creditCount + 20 })

    return response.data
  } catch (error) {
    if (error.response?.data?.message) {
      if (!error.response.data.found) {
        const userStore = useUserStore()
        userStore.setUser({ creditCount: userStore.user.creditCount + 20 })
        throw error.response.data.message
      }
    }

    // If the response has an error message, include it in the error object
    if (error.response && error.response.data && error.response.data.error) {
      throw error.response.data.error
    }
    throw new Error(
      'An unexpected error occurred during fetching vehicles. Please try again later.'
    )
  }
}
