<template>
  <div>
    <input :id="id" type="hidden" name="content" :value="modelValue">
    <trix-editor :input="id"></trix-editor>
  </div>
</template>

<script>
import Trix from 'trix'
import 'trix/dist/trix.css'

export default {
  props: ["id", "modelValue"],
  emits: ['update:modelValue'],
  methods: {
    setTextToTrix(e) {
      this.$emit("update:modelValue", document.getElementById(this.id).value);
    }
  },
  mounted() {
    document.getElementById(this.id).value = this.modelValue
    document.addEventListener("trix-change", this.setTextToTrix);
  },
  beforeUnmount: function () {
    document.removeEventListener("trix-change", this.setTextToTrix);
  }
};
</script>
