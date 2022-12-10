<template>
  <div @click="choosePit" class="relative w-full justify-center items-center" style="max-width: 200px;">
    <img class="w-full" src="/assets/nest.png" alt="" style="max-width: 200px;" />
    <img v-if="nest.pieces.length >= 1" class="egg z-10 top-1/2 left-1/2  w-20 absolute"
      :src="`/assets/${nest.pieces.length}-eggs.png`" alt="">
  </div>
</template>

<script setup lang="ts">
import { movePiece } from '@/services/GameService';
import { useGameStore } from '@/stores/gameStore';
import type { Game, Pit } from '@/types/GameTypes';

const gameStore = useGameStore()
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const props = defineProps<{
  nest: Pit
  gameId: number
  player: number
}>()
const choosePit = () => {
  const firstMoveAudio = new Audio('/assets/first-move.wav')
  firstMoveAudio.play()
  movePiece({
    gameId: props.gameId,
    player: props.player,
    pit: props.nest.pitNumber
  }).then(async (res) => {
    for (let game of res.data) {
      await sleep(1000)
      makeMove(game)
    };
  })

  const makeMove = (game: Game) => {
    const nextMovesAudio = new Audio('/assets/next-move.wav')
    nextMovesAudio.play().then(() => {
      gameStore.game = game
    })
    if (!!game.gameEnded && game.gameEnded !== 3) {
      const winAudio = new Audio('/assets/winner.wav')
      winAudio.play().then(() => {
        alert(`O vencedor é o Player ${endGame(game)}`)
      })
    } else if (!!game.gameEnded && game.gameEnded === 3) {
      const winAudio = new Audio('/assets/winner.wav')
      winAudio.play().then(() => {
        alert(`O jogo empatou`)
      })
    }
  }
}

const endGame = (game: Game): 1 | 2 | 3 => {
  if (game.p1Pit > game.p2Pit) return 1
  if (game.p2Pit > game.p1Pit) return 2

  return 3
}
</script>

<style scoped lang="scss">
.egg {
  transform: translate(-60%, -60%);
}
</style>