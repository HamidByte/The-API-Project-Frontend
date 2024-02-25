import axios from 'axios'
import { useUserStore } from '@/stores'
import { getAccessToken } from '@/lib/initializeStorage'

import { BASE_URL_SERVER } from '@/config'

export const getRandomQuotes = async (accessToken) => {
  try {
    const token = accessToken ? accessToken : getAccessToken()

    if (!token) {
      throw new Error('Invalid access token, please generate new API key.')
    }

    const response = await axios.get(`${BASE_URL_SERVER}/api/v1/quote/random`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const userStore = useUserStore()
    userStore.setUser({ creditCount: userStore.user.creditCount + 1 })

    return response.data
  } catch (error) {
    if (error.response?.data?.message) {
      throw error.response.data.message
    }
    throw new Error('An unexpected error occurred during fetching quotes. Please try again later.')
  }
}

export const searchQuotes = async (searchQuery) => {
  try {
    const response = await axios.get(`${BASE_URL_SERVER}/api/v1/quote/search?q=${searchQuery}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })

    const userStore = useUserStore()
    userStore.setUser({ creditCount: userStore.user.creditCount + 1 })

    return response.data
  } catch (error) {
    if (error.response?.data?.message) {
      throw error.response.data.message
    }
    throw new Error('An unexpected error occurred during fetching quotes. Please try again later.')
  }
}

export const getRandomQuoteById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL_SERVER}/api/v1/quote/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })

    const userStore = useUserStore()
    userStore.setUser({ creditCount: userStore.user.creditCount + 1 })

    return response.data
  } catch (error) {
    if (error.response?.data?.message) {
      throw error.response.data.message
    }
    throw new Error('An unexpected error occurred during fetching quotes. Please try again later.')
  }
}

export const getRandomQuotesByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL_SERVER}/api/v1/quote/category/${category}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })

    const userStore = useUserStore()
    userStore.setUser({ creditCount: userStore.user.creditCount + 1 })

    return response.data
  } catch (error) {
    if (error.response?.data?.message) {
      throw error.response.data.message
    }
    throw new Error('An unexpected error occurred during fetching quotes. Please try again later.')
  }
}

export const getRandomQuotesByAuthor = async (author) => {
  try {
    const response = await axios.get(`${BASE_URL_SERVER}/api/v1/quote/author/${author}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })

    const userStore = useUserStore()
    userStore.setUser({ creditCount: userStore.user.creditCount + 1 })

    return response.data
  } catch (error) {
    if (error.response?.data?.message) {
      throw error.response.data.message
    }
    throw new Error('An unexpected error occurred during fetching quotes. Please try again later.')
  }
}
