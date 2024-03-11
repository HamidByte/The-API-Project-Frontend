import api from '@/api'
import { useUserStore } from '@/stores'

const tokenExpirationInSeconds = 12 * 30 * 24 * 60 * 60 // Set expiration time in seconds (1 year in this case)

export const initializeAccessToken = async () => {
  const userStore = useUserStore()

  try {
    const result = await api.accessToken.generateApiKey(tokenExpirationInSeconds)
    userStore.setApiKey(result.token)

    localStorage.setItem('token', JSON.stringify(result.token))
  } catch (error) {
    console.error(error)
    // toast({
    //   title: 'Uh oh! Something went wrong.',
    //   description: error,
    //   variant: 'destructive'
    // })
  }
}

export const setAccessToken = (token) => {
  const userStore = useUserStore()

  userStore.setApiKey(token)

  localStorage.setItem('token', JSON.stringify(token))
}

export const updateAccessToken = async () => {
  const userStore = useUserStore()

  try {
    if (!userStore.apiKey || !getAccessToken()) {
      const result = await api.accessToken.getAccessToken()

      setAccessToken(result.token)
    }
  } catch (error) {
    console.error(error)
  }
}

export const getAccessToken = () => {
  const tokenString = localStorage.getItem('token')

  if (tokenString) {
    const token = JSON.parse(tokenString)

    return token
  }

  return null
}

export const clearAccessToken = () => {
  const userStore = useUserStore()

  userStore.clearApiKey()

  localStorage.removeItem('token')
}
