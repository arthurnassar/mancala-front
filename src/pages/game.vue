<script setup lang="ts">
import { createGame } from '@/services/GameService';
import { useGameStore } from '@/stores/gameStore';
import type { Game } from '@/types/GameTypes';
import { promiseTimeout } from '@vueuse/shared';
import { useRoute } from 'vue-router';

const route = JSON.stringify(useRoute())
const gameStore = useGameStore()

onMounted(() => {
  console.log(route)
  createGame(JSON.parse(route).query).then(res => {
    gameStore.game = res.data
  })
})

const p1holes = computed(() => {
  const holes = (gameStore.game?.pitCount ?? 0) / 2
  const pits = gameStore.game?.pits.filter((item, index) => {
    return index < holes
  })

  return pits
})

const p2holes = computed(() => {
  const holes = (gameStore.game?.pitCount ?? 0) / 2
  const pits = gameStore.game?.pits.filter((item, index) => {
    return index >= holes
  })

  return pits
})
</script>

  
<template>
  <div class="home flex flex-col">
    <NavBar />
    <div class="flex flex-col justify-center items-center w-full grow">
      <img v-if="gameStore.game?.turn" class="mb-10" :src="`/assets/player-${gameStore.game?.turn}.png`"
        alt="Player turn">
      <div class="flex game-board justify-center items-center w-full">
        <div class="flex w-32 md:w-64">
          <BigNest :nest="gameStore.game?.p2Pit" />
        </div>
        <div class="container w-full">
          <div class="row flex-row-reverse flex no-wrap justify-evenly">
            <SmallNest v-for="hole in p2holes" :key="hole.pitNumber" :player="2" :gameId="gameStore.game?.id ?? 0"
              :nest="hole" />
          </div>
          <div class="row flex no-wrap justify-evenly">
            <SmallNest v-for="hole in p1holes" :key="hole.pitNumber" :player="1" :gameId="gameStore.game?.id ?? 0"
              :nest="hole" />

          </div>
        </div>
        <div class="flex w-32 md:w-64">
          <BigNest :nest="gameStore.game?.p1Pit" />
        </div>
      </div>
    </div>
  </div>
</template>
  
<route lang="json">
{
  "meta": {
    "requiresAuth": true
  }
}
</route>

<style scoped lang="scss">
.home {
  background: #FEDCC5;
  min-height: 100vh;
  background-image: url('/assets/background-hero.png');
  background-repeat: no-repeat;
  background-position-y: bottom;
}
</style>