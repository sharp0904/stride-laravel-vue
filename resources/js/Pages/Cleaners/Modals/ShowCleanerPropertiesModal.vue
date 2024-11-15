<template>
  <modal :show="show" @close="closeModal()" :closeable="false" max-width="3xl">
    <template #title>
      <h3 class="text-lg font-medium capitalize text-gray-900" v-if="cleaner">{{ `${cleaner.first_name} ${cleaner.last_name}` }}'s Properties</h3>
    </template>
    <template #content>
      <div class="px-6 py-4">
        <div class="overflow-hidden scrollbar-thin scrollbar-thumb-tc-primary scrollbar-track-gray-100">
          <table class="mb-1 table-sm">
            <thead>
            <tr>
              <th>Account Number</th>
              <th>Primary Cleaner</th>
              <th>Secondary Cleaner</th>
              <th>Office</th>
              <th>Name</th>
              <th>Address</th>
              <th class="w-24">Actions</th>
            </tr>
            </thead>
            <tbody>
            <template v-if="properties.length > 0">
              <tr v-for="property in properties" :key="property.id">
                <td>{{ property.property_number }}</td>
                <td>{{ property.primary_cleaner }}</td>
                <td>{{ property.secondary_cleaner }}</td>
                <td>{{ property.office.name }}</td>
                <td>{{ property.name }}</td>
                <td>
                  <p>{{ property.address }}</p>
                  <p>{{ `${property.zip_code}, ${property.city}, ${property.state}` }}</p>
                  <p>{{ property.country }}</p>
                </td>
                <td>
                  <div class="actions">
                    <Link :href="route('properties.show', property.id)">
                      <Icon name="view" />
                    </Link>
                    <Link :href="route('properties.edit', property.id)" v-if="hasAnyPermission('update-properties')">
                      <Icon name="edit" />
                    </Link>
                    <a class="danger" href="javascript:void(0)" @click="confirmDelete($event, property)"
                       v-if="hasAnyPermission('delete-properties')">
                      <Icon name="delete" />
                    </a>
                  </div>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="6">No record found!</td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="px-6 py-4 bg-gray-100 text-right">
        <button type="button" class="btn btn-default" @click="closeModal()">Close</button>
      </div>
    </template>
  </modal>
</template>

<script setup>
import Modal from '@/Components/Common/Modal'
import {ref, onMounted, onUnmounted, inject, reactive} from 'vue'
import Icon from '@/Components/Common/Icon.vue'
import axios from 'axios'

const show = ref(false)
const emitter = inject('emitter')
const hasAnyPermission = inject('hasAnyPermission')
const cleaner = ref(null)
const properties = ref([])

const state = reactive({
  confirmHook: () => {}
})

const closeModal = () => {
  show.value = false
}

const fetchCleanerProperties = () => {
  axios.get(route('properties.index', {cleaner: cleaner.value.id})).then(response => {
    properties.value = response.data.properties
  }).catch(err => {
    console.log(err)
  })
}

const confirmDelete = (evt, record) => {
  evt.preventDefault()
  evt.stopPropagation()
  const index = properties.value.indexOf(record)
  swal.fire({
    title: "",
    html: "<h1 class='text-lg text-gray-800 mb-1'>Delete Property</h1><p class='text-base'>Are you sure want to delete this record?</p>",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: "Delete Record",
    customClass: {
      confirmButton: 'danger'
    }
  }).then((result) => {
    if (result.value) {
      showWaitDialog()
      axios.delete(route('properties.destroy', record.id))
        .then(response => {
          hideWaitDialog()
          if (index !== -1) {
            properties.value.splice(index, 1)
          }
          toast.fire({
            icon: 'success',
            title: response.data.message
          })
          state.confirmHook()
        }).catch(err => {
        console.log(err)
        hideWaitDialog()
        toast.fire({
          icon: 'error',
          title: err.response.data.error
        })
      })
    }
  })
}

const showModal = (args) => {
  cleaner.value = args?.cleaner ? args.cleaner : null
  state.confirmHook = args.confirm
  fetchCleanerProperties()
  // Show modal
  show.value = true
}

onMounted(() => {
  emitter.on('showCleanerProperties', showModal)
})


onUnmounted(() => {
  emitter.off('showCleanerProperties', showModal)
})

</script>
