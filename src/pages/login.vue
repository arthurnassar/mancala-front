<script setup lang="ts">


</script>

<template>
  <div class="login-page grid grid-cols-12 !bg-contain">
    <div
      class="login-page--left md:min-w-[641px] z-10 col-span-12 lg:col-span-5 flex items-center py-5 md:py-28 pr-5 lg:pr-0 pl-5 md:pl-28">
      <LoginCard />
    </div>
    <div
      class="login-page--right col-span-12 md:flex absolute lg:relative lg:col-span-7 flex justify-center items-center">
      <img src="public/assets/hero-image.png" class="h-full lg:h-3/4" alt="Hero image">
    </div>

  </div>
</template>

<style scoped lang="scss">
.login-page {
  background: #FEDCC5;
  min-height: 100vh;
  background-image: url('public/assets/background-hero.png');
  background-repeat: no-repeat;
  background-position-y: bottom;


}
</style>

<route lang="json">
{
  "meta": {
    "requiresAuth": false
  }
}
</route>