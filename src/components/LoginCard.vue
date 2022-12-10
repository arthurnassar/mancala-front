<template>
  <div class="login-card p-10 lg:p-28 h-full w-full">
    <p class="logo mb-3.5">Mancala</p>
    <p class="title mb-7">{{ isLogin ? 'Login' : 'Create Account' }}</p>

    <form action="" class="mb-11" @submit.prevent="loginOrRegister">
      <div class="input mb-8">
        <label for="input-group-1" class="block mb-2 text-sm font-normal text-gray-900 dark:text-gray-300">Email</label>
        <div class="relative">
          <input type="email" id="input-group-1" v-model="form.email"
            class="bg-gray-50 border-none text-gray-900 placeholder-gray-400 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-2.5"
            placeholder="username@gmail.com" autocomplete="email">
        </div>
      </div>

      <div class="input mb-4">
        <label for="input-group-2"
          class="block mb-2 text-sm font-normal text-gray-900 dark:text-gray-300">Password</label>
        <div class="relative">
          <input type="password" id="input-group-2" v-model="form.password"
            class="bg-gray-50 border-none text-gray-900 placeholder-gray-400 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-2.5"
            placeholder="password" autocomplete="current-password">
        </div>
      </div>

      <a class="text-xs decoration-none mb-10 block" href="#">Forgot password?</a>

      <button class="w-full py-3 text-white rounded-md">
        {{ isLogin ? 'Sign in' : 'Sign Up' }}
      </button>
    </form>

    <p class="text-sm text-center decoration-none mb-4 block">or continue with</p>

    <div class="grid grid-cols-3 mb-8">
      <SocialButton social-type="google" />
      <SocialButton social-type="github" />
      <SocialButton social-type="facebook" />
    </div>

    <p v-if="isLogin" @click="isLogin = !isLogin" class="text-sm text-center decoration-none mb-4 block">Dont have an
      account yet?
      <span class="font-medium cursor-pointer">Register for
        free</span>
    </p>
    <p v-else @click="isLogin = !isLogin" class="text-sm text-center decoration-none mb-4 block">Already have an
      account?
      <span class="font-medium cursor-pointer">Click here to log in</span>
    </p>

  </div>
</template>

<script setup lang="ts">
import { getAuth } from '@/services/AuthService';
import { createUser } from '@/services/UserService';
import type { CreateUserData } from '@/types/UserTypes';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router/auto';

const router = useRouter()

const isLogin: Ref<boolean> = ref(true)
const form: CreateUserData = reactive({
  email: '',
  password: ''
})

const loginOrRegister = () => {
  if (isLogin.value) {
    getAuth(form).then(res => {
      router.push('/')
    })
    return
  }

  createUser(form).then(res => {
    // TODO CREATE A TOAST WITH THE MESSAGE
    alert('User creation was successful you can now do login')
  })

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