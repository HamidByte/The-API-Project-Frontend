import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    apiKey: null
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    isUserConfirmed: (state) => state.user.isConfirmed
  },
  actions: {
    setUser(user) {
      this.user = { ...this.user, ...user }
    },
    clearUser() {
      this.user = null
    },
    setApiKey(token) {
      this.apiKey = token
    },
    clearApiKey() {
      this.apiKey = null
    }
  }
})
