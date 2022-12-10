<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { ref } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router/auto';

const emit = defineEmits<{
  (e: '@create-game'): void
}>()
const userStore = useUserStore()

const show = ref<boolean>(false)
const logOff = () => {
  localStorage.clear()
  userStore.$reset()
}

const openAndCloseBurguer = (): void => { show.value = !show.value }
onBeforeRouteUpdate((to, from, next) => {
  console.log('oi')
  next()
})

</script>


<template>
  <div class="w-full top-0 sticky bg-white z-10 shadow-xl">
    <div id="navbar" class="navbar">
      <nav class="relative px-4 py-4 flex justify-between items-center">
        <p class="logo mb-3.5">Mancala</p>
        <div class="order-last lg:hidden">
          <button @click="openAndCloseBurguer" class="navbar-burger flex items-center text-blue-600 p-3">
            <svg class="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul v-if="userStore.isLoggedIn"
          class="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
          <li class="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
          <li>
            <router-link @click.prevent="emit('@create-game')" id="eventosRouter"
              class="text-sm text-gray-400 hover:text-gray-500" to="/">
              Create Game</router-link>
          </li>
          <li class="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-4 h-4 current-fill"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </li>
        </ul>
        <router-link id="loginRouter" v-if="!userStore.isLoggedIn"
          class="hidden sign lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
          to="/login">Sign In or Register</router-link>
        <button @click="logOff" id="logoff" v-else
          class="hidden sign lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
          to="/login">LOG OUT</button>
      </nav>
      <div v-if="show" class="navbar-menu relative z-50">
        <div @click="openAndCloseBurguer" class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
        <nav
          class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div class="flex items-center mb-8">
            <p class="logo mb-3.5 flex grow">Mancala</p>
            <button @click="openAndCloseBurguer" class="navbar-close">
              <svg class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li class="mb-1">
                <router-link @click.prevent="emit('@create-game')"
                  class="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  to="/">Create Game</router-link>
                <router-link id="loginRouter" v-if="!userStore.isLoggedIn"
                  class="sign lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
                  to="/login">Sign In or Register</router-link>
                <button @click="logOff" id="logoff" v-else style="background-color: #FEDCC5;"
                  class="sign lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
                  to="/login">LOG OUT</button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$color: red;

nav {
  background: #FEDCC5;
  color: white;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  color: #F25019;
}

.router-link-active:not(.sign) {
  font-weight: bold;

  &:hover {
    color: rgb(37 99 235);
  }

}
</style>