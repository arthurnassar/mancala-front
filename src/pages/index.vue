<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
const router = useRouter()
const userStore = useUserStore()
const createDefaultGame = () => {
  router.push({ path: '/game', query: { pits: 8, pieces: 4, userId: userStore.user.sub } })

}
</script>

  
<template>
  <div class="home flex flex-col">
    <NavBar @@create-game="createDefaultGame" />
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
  background-image: url('/assets/background-hero.png');
  background-repeat: no-repeat;
  background-position-y: bottom;
}
</style>