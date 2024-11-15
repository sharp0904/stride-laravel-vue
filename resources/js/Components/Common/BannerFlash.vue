<template>
  <div>
    <div id="banner-flash" class="rounded"
      :class="{ 'bg-tc-primary-dark': style === 'success', 'bg-red-700': style === 'danger' }" v-if="show && message">
      <div class="max-w-screen-xl mx-auto py-4 px-3 lg:px-4 mb-3">
        <p class="font-medium text-sm text-white">
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    }
  },
  computed: {
    style() {
      return this.$page.props.flash?.bannerStyle || 'success'
    },
    message() {
      return this.$page.props.flash?.banner || ''
    },
    timestamp() {
      return this.$page.props.flash?.timestamp || (new Date()).getTime()
    }
  },
  watch: {
    style() {
      this.show = true
    },
    message() {
      this.show = true
    },
    timestamp() {
      this.show = true
    }
  },
  updated() {
    setTimeout(() => {
      this.show = false
    }, 5000)
  }
}
</script>