<template>
  <input type="radio" :value="value" v-model="proxyChecked" :checked="proxyChecked"
    class="rounded-full border-gray-300 text-tc-primary shadow-sm focus:border-tc-primary">
</template>

<script>
export default {
  emits: ['update:checked'],

  props: {
    checked: {
      type: [Boolean, String],
      default: false,
    },
    value: {
      default: null,
    },
  },

  computed: {
    proxyChecked: {
      get() {
        return this.checked === this.value;
      },

      set(val) {
        this.$emit("update:checked", val);
      },
    },
  }
}
</script>
