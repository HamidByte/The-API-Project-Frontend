import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isUserActive: false
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    isUserActivated: (state) => !!state.user.isActive
  },
  actions: {
    setUser(user) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
    setIsUserActive(isActive) {
      this.isUserActive = isActive
    }
  }
})
