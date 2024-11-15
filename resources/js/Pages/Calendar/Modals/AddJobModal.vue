<template>
    <modal :show="show" @close="closeModal()" :closeable="false">
      <template #title>
        <h3 class="text-lg font-medium capitalize text-gray-900">Add New Job</h3>
      </template>
      <template #content>
        <form @submit.prevent="submit">

          <div class="px-6 py-4">
            <div class="mt-2">
              <label class="block font-medium text-sm text-gray-700 required" for="property_id">Property:</label>
              <vSelect id="property_id" v-model="form.property_id" :options="properties"
                      :reduce="property => property.id" class="mt-1 block w-full" label="name"></vSelect>
              <span v-if="propertyError" class="text-red-500 text-sm mt-1">This field is required.</span>
              <InputError :message="errors?.property_id"/>
            </div>

            <div class="mt-2">
              <label class="block font-medium text-sm text-gray-700 required" for="cleaner_id">Assign Cleaner:</label>
              <vSelect id="cleaner_id" v-model="form.assigned_to" :options="cleaners"
                      :reduce="cleaner => cleaner.id" class="mt-1 block w-full" label="name"></vSelect>
              <span v-if="cleanerError" class="text-red-500 text-sm mt-1">This field is required.</span>
              <InputError :message="errors?.cleaner_id"/>
            </div>

            <div class="mt-2">
              <label class="block font-medium text-sm text-gray-700 required" for="end">Start Date</label>
              <DateTimePicker id="end" v-model="form.end" :auto-select="true"
                              format="yyyy-MM-dd HH:mm" class="mt-1 block w-full"/>
              <InputError :message="errors?.end"/>
            </div>
          
            <div class="px-6 py-4 mt-2 text-right bg-gray-100">
              <button :disabled="processing" class="mr-2 btn btn-primary" type="submit">Save</button>
              <button type="button" class="btn btn-default" @click="closeModal()">Close</button>
            </div>

          </div>
        </form>
        
        
      </template>
    </modal>
  </template>
  
  <script setup>
  import Modal from '@/Components/Common/Modal'
  import {ref, onMounted, onUnmounted, inject, reactive} from 'vue'
  import axios from 'axios'
  import vSelect from 'vue-select'
  import InputError from '@/Components/Common/InputError'
  import DateTimePicker from '@/Components/Common/DateTimePicker'
  import { Inertia } from '@inertiajs/inertia'
  import moment from 'moment'

  const props = defineProps({
    errors: Object,
    end: String
  })
  
  const processing = ref(false);
  const show = ref(false)
  const emitter = inject('emitter')
  const properties = ref([])
  const cleaners = ref([])
  const propertyError = ref(false)
  const cleanerError = ref(false)
  const end = ref(null)

  const form = reactive({
    property_id: null,
    start: null,
    assigned_to: null,
    description: null,
    end: null,
  })

  const closeModal = () => {
    show.value = false
  }

  const getAllProperties = () => {
    axios.get(route('properties.getAllProperties')).then(response => {
      properties.value = response.data
    }).catch(err => {
      console.log(err)
    })
  }
  
  const getAllCleaners = () => {
    axios.get(route('cleaner.getAllCleaners')).then(response => {
      cleaners.value = response.data
    }).catch(err => {
      console.log(err)
    })
  }
  
  const showModal = (event) => {
    getAllProperties()
    getAllCleaners()
    show.value = true
  }
  
  onMounted(() => {
    emitter.on('addNewJob', showModal)
  })
  
  onUnmounted(() => {
    emitter.off('addNewJob', showModal)
  })
  
  const submit = () => {
    if(form.property_id == null && form.assigned_to == null) {
      propertyError.value = true;
      cleanerError.value = true;
    } else if(form.property_id == null && form.assigned_to !== null) {
      propertyError.value = true;
      cleanerError.value = false;
    } else if(form.assigned_to == null && form.property_id !== null) {
      cleanerError.value = true;
      propertyError.value = false;
    } else if (form.property_id !== null && form.assigned_to !== null) {
      propertyError.value = false;
      cleanerError.value = false;
      processing.value = true
      form.description = 'N/A'
      form.start = moment(new Date()).format('YYYY-MM-DD HH:mm')
      form.end = form.end ? moment(form.end).format('YYYY-MM-DD HH:mm') : form.start
      axios.post(route('appointments.add-job'), form)
        .then(response => {
          processing.value = false
          closeModal()
          toast.fire({
            icon: 'success',
            title: response.data.message
          })
          window.location.href = '/calendar';
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
  