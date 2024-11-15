<template>
  <ModalLayout :show="show" :max-width="maxWidth" :closeable="closeable" @close="close">
    <div class="px-6 py-3 border-b border-gray-200">
      <div class="text-lg">
        <div class="flex items-center justify-between">
          <div>
            <slot name="title"></slot>
          </div>
          <button class="cursor-pointer text-gray-800 hover:text-gray-400" @click="close">
            <Icon name="close" />
          </button>
        </div>
      </div>
    </div>
    <slot name="content"></slot>
  </ModalLayout>
</template>

<script>
import ModalLayout from '@/Layouts/ModalLayout'
import Icon from '@/Components/Common/Icon'

export default {
  emits: ['close'],
  components: {
    ModalLayout,
    Icon,
  },
  props: {
    show: {
      default: false
    },
    maxWidth: {
      default: '2xl'
    },
    closeable: {
      default: true
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
  }
}
</script>