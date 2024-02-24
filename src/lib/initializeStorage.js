import api from '@/api'
import { useUserStore } from '@/stores'

const tokenExpirationInSeconds = 30 * 24 * 60 * 60 // Set expiration time in seconds (30 days in this case)

export const initializeApiKey = async () => {
  const userStore = useUserStore()

  try {
    const apiKey = await api.apiKey.generateApiKey(tokenExpirationInSeconds)
    userStore.setApiKey(apiKey.apiKey.token)

    localStorage.setItem('token', JSON.stringify(apiKey.apiKey.token))
  } catch (error) {
    console.error(error)
    // toast({
    //   title: 'Uh oh! Something went wrong.',
    //   description: error,
    //   variant: 'destructive'
    // })
  }
}

export const setApiKey = async () => {
  const userStore = useUserStore()

  try {
    if (!userStore.apiKey || !getApiKey()) {
      const apiKey = await api.apiKey.getApiKey()

      userStore.setApiKey(apiKey.apiKey.token)

      localStorage.setItem('token', JSON.stringify(apiKey.apiKey.token))
    }
  } catch (error) {
    console.error(error)
  }
}

export const getApiKey = () => {
  const tokenString = localStorage.getItem('token')

  if (tokenString) {
    const token = JSON.parse(tokenString)

    return token
  }

  return null
}

export const clearApiKey = () => {
  const userStore = useUserStore()

  userStore.clearApiKey()

  localStorage.removeItem('token')
}
