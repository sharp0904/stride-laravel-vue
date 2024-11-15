<template>
    <modal :show="show" @close="closeModal()" :closeable="false">
      <template #title>
        <h3 class="text-lg font-medium capitalize text-gray-900">Assign to Cleaner</h3>
      </template>
      <template #content>
        <form @submit.prevent="submit">

          <div class="px-6 py-4">
            <div class="mt-2">
              <label class="block font-medium text-sm text-gray-700 required" for="cleaner_id">Assign Cleaner:</label>
              <vSelect id="cleaner_id" v-model="form.assigned_to" :options="cleaners"
                      :reduce="cleaner => cleaner.id" class="mt-1 block w-full" label="name"></vSelect>
              <span v-if="cleanerError" class="text-red-500 text-sm mt-1">This field is required.</span>
              <InputError :message="errors?.cleaner_id"/>
            </div>
          
            <div class="mt-2 text-right">
              <button :disabled="processing" class="ml-2 btn btn-primary" type="submit">Save</button>
            </div>
            
          </div>
        </form>
        <div class="px-6 py-4 bg-gray-100 text-right">
          <button type="button" class="btn btn-default" @click="closeModal()">Close</button>
        </div>
        
      </template>
    </modal>
  </template>
  
  <script setup>
  import Modal from '@/Components/Common/Modal'
  import {ref, onMounted, onUnmounted, inject, reactive} from 'vue'
  import axios from 'axios'
  import vSelect from 'vue-select'
  import InputError from '@/Components/Common/InputError'
  import moment from 'moment'
import { WindowScrollController } from '@fullcalendar/core'

  defineProps({
    errors: Object,
  })
  
  const processing = ref(false);
  const show = ref(false)
  const emitter = inject('emitter')
  const cleaners = ref([])
  const cleanerError = ref(false)
  const event = ref(null);

  const form = reactive({
    assigned_to: null,
  })

  const closeModal = () => {
    show.value = false
  }

  const getAllCleaners = () => {
    axios.get(route('cleaner.getAllCleaners')).then(response => {
      cleaners.value = response.data
    }).catch(err => {
      console.log(err)
    })
  }
  
  const showModal = (args) => {
    event.value = args.event || null
    getAllCleaners()
    show.value = true
  }
  
  onMounted(() => {
    emitter.on('assignCleanerModal', showModal)
  })
  
  onUnmounted(() => {
    emitter.off('assignCleanerModal', showModal)
  })
  
  const submit = () => {
    if(form.assigned_to == null) {
      cleanerError.value = true;
    }
    else {
      cleanerError.value = false;
      const payload = {...form}
      payload.id = event.value.value.id;
      processing.value = true
      axios.post(route('appointments.assign-cleaner'), payload)
        .then(response => {
          processing.value = false
          closeModal()
          window.location.href = '/calendar';
          toast.fire({
            icon: 'success',
            title: response.data.message
          })
        }).catch(err => {
        processing.value = false
        if (err.response.status === 422) {
          errors.value = err.response ? err.response.data.error : errs
        } else {
          toast.fire({
            icon: 'error',
            title: err.response ? err.response.data.error : err
          })
        }
      })
    }
    
  }
  
  </script>
  