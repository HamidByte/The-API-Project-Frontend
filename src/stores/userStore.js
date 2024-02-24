import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isUserActive: false,
    apiKey: null
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    isUserActivated: (state) => state.user.isConfirmed
  },
  actions: {
    setUser(user) {
      this.user = { ...this.user, ...user }
    },
    clearUser() {
      this.user = null
    },
    setIsUserActive(value) {
      this.isUserActive = value
    },
    setApiKey(token) {
      this.apiKey = token
    },
    clearApiKey() {
      this.apiKey = null
    }
  }
})
