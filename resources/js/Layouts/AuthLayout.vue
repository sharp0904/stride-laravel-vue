<template>
  <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
    <div class="w-full sm:max-w-sm mt-6 px-6 py-4 bg-white shadow overflow-hidden sm:rounded-lg">
      <img class="h-16 mx-auto mb-3" src="/assets/images/logo.png" alt="Enhance Vacation Cleaning" />
      <BannerFlash />
      <slot />
    </div>
  </div>
</template>

<script setup>
import BannerFlash from '@/Components/Common/BannerFlash'

defineProps({
  title: ''
})
</script>