<template>
  <modal :show="show" @close="closeModal()">
    <template #title>
      {{ event ? 'Appointment Detail' : 'Add New Appointment' }}
    </template>
    <template #content>
      <form @submit.prevent="submit($event)">
        <div class="text-right px-6 py-4 bg-gray-100">
          <button class="btn btn-primary" type="button" @click="openAssignCleanerPopup()">Assign Cleaner</button>
        </div>
        <div class="px-6 py-4">
          <div class="mt-2">
            <label class="block font-medium text-sm text-gray-700" for="property_id">Property:</label>
            <vSelect id="property_id" v-model="form.property_id" :disabled="!isEditable" :options="properties"
                     :reduce="property => property.id" class="mt-1 block w-full" label="name"></vSelect>
            <InputError :message="errors?.property_id"/>
          </div>

          <div class="mt-2">
            <label class="block font-medium text-sm text-gray-700" for="cleaner_id">Assigned Cleaner:</label>
            <vSelect id="cleaner_id" v-model="form.cleaner_id" :disabled="!isEditable" :options="cleaners"
                     :reduce="cleaner => cleaner.id" class="mt-1 block w-full" label="name"></vSelect>
            <InputError :message="errors?.cleaner_id"/>
          </div>

          <div v-if="event">
            <div v-if="event.extendedProps.property" class="mt-2">
              <label class="block font-medium text-sm text-gray-700" for="property_id">Address:</label>
              {{ event.extendedProps.address }}
            </div>

            <div v-if="event.extendedProps.property" class="grid grid-cols-2 lg:gap-x-4">
              <div class="col-span-2 lg:col-span-1 mt-2">
                <label class="block font-medium text-sm text-gray-700">Number of Bedrooms:</label>
                {{ event.extendedProps.property.beds }}
              </div>

              <div class="col-span-2 lg:col-span-1 mt-2">
                <label class="block font-medium text-sm text-gray-700">Number of Bathrooms:</label>
                {{ event.extendedProps.property.baths }}
              </div>
            </div>

            <!-- <div v-if="event.extendedProps.property" class="grid grid-cols-2 lg:gap-x-4">
              <div class="col-span-2 lg:col-span-1 mt-2">
                <label class="block font-medium text-sm text-gray-700">Check Out Time:</label>
                {{ event.extendedProps.property.check_out_time }}
              </div>

              <div class="col-span-2 lg:col-span-1 mt-2">
                <label class="block font-medium text-sm text-gray-700">Check In Time:</label>
                {{ event.extendedProps.property.check_in_time }}
              </div>
            </div>

            <div v-if="event.extendedProps.property" class="mt-2">
              <label class="block font-medium text-sm text-gray-700" for="property_id">Next Check-in:</label>
              {{ formatDate(event.extendedProps.next_start) }}
            </div> -->
          </div>

            <!-- Remove Description part 07.18.2023 -->
<!--          <div class="mt-2">-->
<!--            <label class="block font-medium text-sm text-gray-700" for="description">Description:</label>-->
<!--            <VueTrix id="description" v-model="form.description" class="mt-1"/>-->
<!--            <InputError :message="errors?.description"/>-->
<!--          </div>-->

          <div class="grid grid-cols-2 lg:gap-x-4">
            <div class="col-span-2 lg:col-span-1 mt-2">
              <label class="block font-medium text-sm text-gray-700" for="start">Start:</label>
              <DateTimePicker id="start" v-model="form.start" :disabled="!isEditable" class="mt-1 block w-full"/>
              <InputError :message="errors?.start"/>
            </div>

            <!-- <div class="col-span-2 lg:col-span-1 mt-2">
              <label class="block font-medium text-sm text-gray-700" for="end">End:</label>
              <DateTimePicker id="end" v-model="form.end" :disabled="!isEditable" class="mt-1 block w-full"/>
              <InputError :message="errors?.end"/>
            </div> -->
          </div>
        </div>

        <div class="flex px-6 py-4 bg-gray-100 justify-between">
          <div v-if="event">
            <button class="btn btn-primary" type="button" @click="openPopup(event.extendedProps.property.notes)">Notes</button>
          </div>
          <div class="w-full justify-end flex gap-2">
            <template v-if="event && event.extendedProps.uid === null && event.extendedProps.completed_at === null">
              <button v-if="hasAnyPermission('delete-appointments')" :disabled="processing" class="btn btn-danger ml-2"
                      type="button"
                      @click="deleteAppointment()">Delete
              </button>
              <button v-if="hasAnyPermission('update-appointments') && event.extendedProps.started_at === null" :disabled="processing" class="btn btn-success ml-2"
                      type="button"
                      @click="markAppointmentCompleted()">Mark Completed
              </button>
            </template>
            <button
              v-if="event.extendedProps.started_at === null"
              class="btn bg-yellow-400 hover:bg-yellow-500" type="button" @click="start()">Start</button>
            <button
              v-if="event.extendedProps.started_at !== null && event.extendedProps.completed_at === null"
              class="btn btn-primary" type="button" @click="finish()">Finish</button>
            <button v-show="attachments.length > 0" class="btn btn-primary" type="button" @click="toggleShowRef()">{{ showRef ? 'Hide Ref.Photos' : 'Show Ref.Photos' }}</button>
            <!-- <button class="btn btn-primary" type="button" @click="openChecklistPopup()">Checklists</button> -->
            <button v-if="isEditable && hasAnyPermission('create-appointments')" :disabled="processing"
                    class="ml-2 btn btn-primary" type="submit">Save
            </button>
          </div>
        </div>
      </form>
      <div v-show="showRef && attachments.length > 0">
        <vueper-slides
          class="mb-2"
          ref="vueperslides1"
          :touchable="false"
          fade
          :autoplay="false"
          :bullets="false"
          @slide="$refs.vueperslides2.goToSlide($event.currentSlide.index, { emit: false })"
          fixed-height="400px">
          <vueper-slide
            v-for="(slide, i) in attachments"
            :key="i"
            :image="'/storage/' + slide.url">
          </vueper-slide>
        </vueper-slides>

        <vueper-slides
          class="no-shadow thumbnails mt-3"
          ref="vueperslides2"
          @slide="$refs.vueperslides1.goToSlide($event.currentSlide.index, { emit: false })"
          :visible-slides="attachments.length"
          fixed-height="75px"
          :bullets="false"
          :touchable="false"
          :gap="2.5"
          :arrows="false">
          <vueper-slide
            v-for="(slide, i) in attachments"
            :key="i"
            :image="'/storage/' + slide.url"
            @click.native="$refs.vueperslides2.goToSlide(i)">
          </vueper-slide>
        </vueper-slides>
      </div>
    </template>
  </modal>
</template>

<script setup>
import Modal from '@/Components/Common/Modal'
import { inject, onMounted, onUnmounted, reactive, ref } from 'vue'
import DateTimePicker from '@/Components/Common/DateTimePicker'
import InputError from '@/Components/Common/InputError'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import axios from 'axios'
import moment from 'moment'
import vSelect from 'vue-select'
import Swal from "sweetalert2";

const show = ref(false)
const showRef = ref(false)
const emitter = inject('emitter')
const hasAnyPermission = inject('hasAnyPermission')
const event = ref(null)
const properties = ref([])
const isEditable = ref(true)
const processing = ref(false)
const attachments = ref([])
const errors = ref({})
const refreshEventsHook = ref(() => {})
const cleaners = ref([])

const form = reactive({
  property_id: null,
  description: '',
  start: '',
  end: '',
  summary: '',
  cleaner_id: null,
})

const formatDate = (dateString) => {
  const date = new Date(dateString);
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

const closeModal = () => {
  show.value = false
}

const toggleShowRef = () => {
  showRef.value = !showRef.value;
}

const openPopup = (notes) => {
  Swal.fire({
    title: 'Notes',
    text: notes
  })
}

const openChecklistPopup = () => {
  emitter.emit('showChecklistsModal', {
    event: event
  })
}

const openAssignCleanerPopup = () => {
  emitter.emit('assignCleanerModal', {
    event: event
  })
}

const swal = inject('swal')
const deleteAppointment = () => {
  if (event.value && event.value.extendedProps.uid === null) {
    swal.fire({
      title: "",
      html: "<h1 class='text-lg text-gray-800 mb-1'>Delete Appointment</h1><p class='text-base'>Are you sure want to delete this record?</p>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Delete",
      customClass: {
        confirmButton: 'danger'
      }
    }).then((result) => {
      if (result.value) {
        showWaitDialog()
        axios.delete(route('appointments.destroy', event.value.id))
          .then(response => {
            hideWaitDialog()
            closeModal()
            refreshEventsHook.value()
            toast.fire({
              icon: 'success',
              title: response.data.message
            })
          }).catch(err => {
          hideWaitDialog()
          toast.fire({
            icon: 'error',
            title: err.response ? err.response.data.error : err
          })
        })
      }
    })
  }
}

const start = () => {
  showWaitDialog()
  axios.put(route('appointments.start-completed', event.value.id))
    .then(response => {
      hideWaitDialog()
      closeModal()
      refreshEventsHook.value()
      toast.fire({
        icon: 'success',
        title: response.data.message
      })
    }).catch(err => {
    hideWaitDialog()
    toast.fire({
      icon: 'error',
      title: err.response ? err.response.data.error : err
    })
  })
}

const finish = () => {
  if (event.value) {
    swal.fire({
      title: "",
      html: "<h1 class='text-lg text-gray-800 mb-1'>Appointment Finish</h1><p class='text-base'>Are you sure you want to finish?\n</p>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Yes",
      customClass: {
        confirmButton: 'success'
      }
    }).then((result) => {
      if (result.value) {
        showWaitDialog()
        axios.put(route('appointments.mark-completed', event.value.id))
          .then(response => {
            hideWaitDialog()

            if (response.data.warning) {
              toast.fire({
                icon: 'warning',
                title: response.data.warning
              })

              emitter.emit('showChecklistsModal', {
                event: event
              })
            } else {
              closeModal()
              refreshEventsHook.value()
              toast.fire({
                icon: 'success',
                title: response.data.message
              })
            }
          }).catch(err => {
          hideWaitDialog()
          toast.fire({
            icon: 'error',
            title: err.response ? err.response ? err.response.data.error : err : err
          })
        })
      }
    })
  }
}

const markAppointmentCompleted = () => {
  if (event.value && event.value.extendedProps.uid === null && isEditable.value) {
    swal.fire({
      title: "",
      html: "<h1 class='text-lg text-gray-800 mb-1'>Mark Appointment Completed</h1><p class='text-base'>Are you sure want to delete this record?</p>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Mark Completed",
      customClass: {
        confirmButton: 'success'
      }
    }).then((result) => {
      if (result.value) {
        showWaitDialog()
        axios.put(route('appointments.mark-completed', event.value.id))
          .then(response => {
            hideWaitDialog()
            closeModal()
            refreshEventsHook()
            toast.fire({
              icon: 'success',
              title: response.data.message
            })
          }).catch(err => {
          hideWaitDialog()
          toast.fire({
            icon: 'error',
            title: err.response ? err.response.data.error : err
          })
        })
      }
    })
  }
}

const submit = (evt) => {
  evt.preventDefault()
  if (event.value) {
    processing.value = true
    const payload = {...form}
    const start = typeof form.start === 'string' ? form.start.replace(/-/g, '/') : form.start
    payload.start = moment(new Date(start)).format('YYYY-MM-DD HH:mm')
    const end = typeof form.end === 'string' ? form.end.replace(/-/g, '/') : form.end
    payload.end = moment(new Date(end)).format('YYYY-MM-DD HH:mm')
    axios.put(route('appointments.update', event.value.id), payload)
      .then(response => {
        processing.value = false
        closeModal()
        refreshEventsHook()
        toast.fire({
          icon: 'success',
          title: response.data.message
        })
      }).catch(err => {
      processing.value = false
      errors.value = err.response ? err.response.data.error : errs
    })
  } else {
    processing.value = true
    const payload = {...form}
    payload.start = moment(new Date(form.start)).format('YYYY-MM-DD HH:mm')
    payload.end = moment(new Date(form.end)).format('YYYY-MM-DD HH:mm')
    axios.post(route('appointments.store'), payload)
      .then(response => {
        processing.value = false
        closeModal()
        refreshEventsHook()
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

const showModal = (args) => {
  event.value = args.event ? args.event : null
  properties.value = args.properties
  refreshEventsHook.value = args.refreshEvents;
  isEditable.value = false
  form.property_id = event.value ? event.value.extendedProps.property.id : ''
  form.description = event.value ? event.value.extendedProps.description : ''
  form.start = event.value ? new Date(event.value.extendedProps.start_time) : (args?.start ? args.start : '')
  form.end = event.value ? new Date(event.value.extendedProps.end_time) : ''
  form.summary = event.value ? event.value.extendedProps.summary : ''
  form.cleaner_id = event.value ? event.value.extendedProps.assigned_to : ''
  if (event.value) {
    attachments.value = event.value.extendedProps.property.attachments

    // As user can't edit event, it is not necessary
    // if (new Date(event.value.extendedProps.end_time).getTime() <= new Date().getTime() || event.value.extendedProps.completed_at !== null) {
    //   isEditable.value = false
    // }

    // Show modal only when event exists
    show.value = true
  }

  getAllCleaners()
}

const getAllCleaners = () => {
    axios.get(route('cleaner.getAllCleaners')).then(response => {
      cleaners.value = response.data
    }).catch(err => {
      console.log(err)
    })
  }

onMounted(() => {
  emitter.on('showEventModal', showModal)
})

onUnmounted(() => {
  emitter.off('showEventModal', showModal)
})

</script>
<style>
.thumbnails {
  margin: auto;
  max-width: 300px;
}

.thumbnails .vueperslide {
  box-sizing: border-box;
  border: 1px solid #fff;
  transition: 0.3s ease-in-out;
  opacity: 0.7;
  cursor: pointer;
}

.thumbnails .vueperslide--active {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  opacity: 1;
}
</style>
