<template>
  <div class="flex justify-end px-6 border-t py-3">
    <div class="relative">
      <span class="text-gray-500 absolute left-2 top-2.5">
        <Icon name="search" />
      </span>
      <input class="form-input px-10" :value="modelValue" placeholder="Search..."
        @input="$emit('update:modelValue', $event.target.value)" ref="input">
      <span v-if="modelValue" class="cursor-pointer text-gray-500 absolute right-2 top-2.5" @click="clearSearch">
        <Icon name="close" />
      </span>
    </div>
  </div>
</template>

<script>
import Icon from '@/Components/Common/Icon'

export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  components: {
    Icon
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    clearSearch() {
      this.$emit('update:modelValue', '')
    }
  }
}
</script>