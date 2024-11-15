<template>
  <Navbar />
  <main class="max-w-7xl mx-auto py-3 px-2 sm:px-6 lg:px-8">
    <Banner />
    <slot />
  </main>
</template>

<script setup>
import Navbar from '@/Layouts/Partials/Navbar'
import Banner from '@/Components/Common/Banner'
</script>