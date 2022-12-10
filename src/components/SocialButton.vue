<template>
  <div class="social-btn flex items-center justify-center bg-white py-3.5 rounded-full mx-2 cursor-pointer">
    <img :src="socialIcon" alt="icone de midia social">
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  socialType: 'facebook' | 'github' | 'google'
}>()
const socialIcon = computed(() => {
  return (
    props.socialType === 'facebook' ? '/assets/icon_fb.png' : props.socialType === 'github' ? '/assets/icon_github.png' : '/assets/icon_google.png'
  )
})
</script>

<style scoped lang="scss">

</style>