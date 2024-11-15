<template>
  <div class="px-6 pt-3 pb-1 border-t flex justify-end">
    <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
      <Component :is="link.url ? 'Link' : 'span'" v-for="(link, index) in links" :key="index" :href="link.url"
        v-html="link.label"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
        :class="{
          'rounded-l-md': index === 0,
          'rounded-r-md': index === links.length - 1,
          'cursor-pointer hover:text-tc-primary': link.url,
          'z-10 border-tc-primary text-tc-primary': link.active
        }" />
    </nav>
  </div>
</template>

<script setup>
defineProps({
  links: Array
})

</script>