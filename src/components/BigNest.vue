<template>
  <div class="relative w-full justify-center items-center">
    <img class="" src="/assets/big_nest.png" alt="" />
    <img class="absolute z-10 top-0 left-0" v-if="nest?.length !== 0" src="/assets/hero-image.png" alt="">
    <p class="absolute right-0 bottom-0 text-white bg-black rounded-full text-center"
      style="line-height: 30px; width: 30px; height: 30px;"> {{
    nest?.length
      }} </p>
  </div>
</template>

<script setup lang="ts">
import type { Piece } from '@/types/GameTypes';

const props = defineProps<{
  nest: Piece[] | undefined
}>()
</script>

<style scoped lang="scss">

</style>