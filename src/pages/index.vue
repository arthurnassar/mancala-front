<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()

const createGame = () => {
  router.push({ path: '/game', query: { pits: 8, pieces: 4, userId: 14530846465328962 } })

}
</script>

  
<template>
  <div class="home flex flex-col">
    <NavBar @@create-game="createGame" />
    <div class="flex flex-col justify-center items-center w-full grow">
      <GameInfo />
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
  background-image: url('public/assets/background-hero.png');
  background-repeat: no-repeat;
  background-position-y: bottom;
}
</style>