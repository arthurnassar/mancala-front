<template>
  <div class="login-card p-10 lg:p-28 h-full w-full">
    <p class="logo mb-3.5">Create Game</p>
    <p class="title mb-7">To create a new game insert the required data on the form below and press send.</p>
    <p class="title mb-7">You can also create a new game with the default values by clicking the Create Game button on
      the navbar</p>

    <form action="" class="mb-11" @submit.prevent="createGame">
      <div class="input mb-8">
        <label for="input-group-1" class="block mb-2 text-sm font-normal text-gray-900 dark:text-gray-300">Pits</label>
        <div class="relative">
          <input type="number" id="input-group-1" v-model="form.pits"
            class="bg-gray-50 border-none text-gray-900 placeholder-gray-400 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-2.5"
            placeholder="number of  per player" autocomplete="email">
        </div>
      </div>

      <div class="input mb-4">
        <label for="input-group-2"
          class="block mb-2 text-sm font-normal text-gray-900 dark:text-gray-300">Pieces</label>
        <div class="relative">
          <input type="number" id="input-group-2" v-model="form.pieces"
            class="bg-gray-50 border-none text-gray-900 placeholder-gray-400 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-2.5"
            placeholder="number of pieces per pit" autocomplete="current-password">
        </div>
      </div>

      <button class="w-full py-3 text-white rounded-md">
        Create Game
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router/auto';
import { useUserStore } from '@/stores/userStore';

const router = useRouter()
const userStore = useUserStore()

const form: { pits: number | null, pieces: number | null, id: number | null } = reactive({
  pits: null,
  pieces: null,
  id: userStore.user.id
})

const createGame = () => {
  router.push({ path: '/game', query: form })

}
</script>

<style scoped lang="scss">
.login-card {
  box-shadow: 0px 4px 70px 0px #0000001A;
  border-radius: 2.5rem;
  background: #FFFFFF4D;

  .logo {
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
    letter-spacing: 0em;
    text-align: left;
    color: #F25019;
  }

  .title {
    font-size: 38px;
    font-weight: 700;
    line-height: 46px;
    letter-spacing: 0em;
    text-align: left;

  }

  form {
    button {
      background: #F25019;
      font-size: 20px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0em;

    }
  }
}
</style>