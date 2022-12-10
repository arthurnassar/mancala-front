import { defineStore, acceptHMRUpdate } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { BEARER_TOKEN, IS_LOGGED_IN, USER } from '../types/AuthTypes'

import type { UserLogin, UserResponseData } from '../types/UserTypes'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: useLocalStorage(IS_LOGGED_IN, false as boolean),
    bearerToken: useLocalStorage(BEARER_TOKEN, null as null | number),
    user: {
      email: '',
      id: null
    } as UserResponseData
  }),
  getters: {
  },
  actions: {
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
