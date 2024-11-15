<template>
  <Datepicker :modelValue="date" @update:modelValue="setDate" :minDate="new Date()" :format="format"
              :auto-apply="autoSelect" :clearable="true" />
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  props: {
    date: {
      type: String,
      required: false
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd HH:mm'
    },
    autoSelect: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Datepicker
  },
  setup(_, { emit }) {
    const setDate = (val) => {
      emit('update:modelValue', val)
    }

    return {
      setDate
    }
  }
}
</script>
