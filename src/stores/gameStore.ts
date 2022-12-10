import type { Game } from '@/types/GameTypes'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    game: null as Game | null
  }),
  getters: {},
  actions: {}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot))
}
