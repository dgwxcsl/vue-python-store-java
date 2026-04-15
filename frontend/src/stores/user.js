import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: (() => {
      const raw = localStorage.getItem('user')
      if (!raw || raw === 'null' || raw === 'undefined') return null
      try {
        return JSON.parse(raw)
      } catch {
        return null
      }
    })(),
    token: (() => {
      const raw = localStorage.getItem('token')
      if (!raw || raw === 'null' || raw === 'undefined') return ''
      return raw
    })()
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
    username: (state) => state.user?.username || ''
  },
  actions: {
    setLoginData(token, user) {
      this.token = token
      this.user = user
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})
