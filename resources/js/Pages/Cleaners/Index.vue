<template>

  <Head title="Cleaners" />
  <AppLayout>
    <div class="bg-white rounded shadow">
      <div class="md:flex md:items-center md:justify-between px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900 mb-2 lg:mb-0 text-left">Cleaners</h3>
        <div class="flex items-center">
          <Link class="btn btn-primary px-3 md:px-4" :href="route('cleaners.create')" as="button"
                v-if="hasAnyPermission('create-cleaners')">Add New Cleaner</Link>
        </div>
      </div>
      <div class="pb-2">
        <SearchBar v-model="keyword" />
        <div class="overflow-hidden scrollbar-thin scrollbar-thumb-tc-primary scrollbar-track-gray-100">
          <table class="mb-1">
            <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Region</th>
              <th>Office</th>
              <th># of Properties</th>
              <th class="w-24">Actions</th>
            </tr>
            </thead>
            <tbody>
            <template v-if="cleaners.length > 0">
              <tr v-for="cleaner in cleaners" :key="cleaner.id">
                <td>{{ `${cleaner.first_name} ${cleaner.last_name}` }}</td>
                <td>{{ cleaner.email }}</td>
                <td>{{ cleaner.phone_number }}</td>
                <td>{{ cleaner.region_name }}</td>
                <td>{{ cleaner.office_name }}</td>
                <td>
                  <label class="badge badge-default cursor-pointer"
                         @click="launchViewPropertiesModal(cleaner)">
                    {{ cleaner.property_number }}
                  </label>
                </td>
                <td>
                  <div class="actions">
                    <Link :href="route('cleaners.edit', cleaner.id)" v-if="hasAnyPermission('update-properties')">
                      <Icon name="edit" />
                    </Link>
                    <a class="danger" href="javascript:void(0)" @click="confirmDelete($event, cleaner)"
                       v-if="hasAnyPermission('delete-properties')">
                      <Icon name="delete" />
                    </a>
                  </div>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="4">No record found!</td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AppLayout>
  <show-cleaner-properties-modal></show-cleaner-properties-modal>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout'
import Icon from '@/Components/Common/Icon'
import SearchBar from '@/Components/Common/SearchBar'
import {inject, onBeforeMount, ref, watch} from 'vue'
import { Inertia } from '@inertiajs/inertia'
import debounce from 'lodash/debounce'
import * as _ from 'lodash'
import ShowCleanerPropertiesModal from '@/Pages/Cleaners/Modals/ShowCleanerPropertiesModal.vue'

const props = defineProps({
  cleaners: Object,
  filters: Object
})

const data = ref(null)
const swal = inject('swal')
const emitter = inject('emitter')
const hasAnyPermission = inject('hasAnyPermission')
const keyword = ref(props.filters.q)

watch(keyword, debounce(function (value) {
  Inertia.get(route('cleaners.index'), { q: value }, {
    preserveState: true,
    replace: true
  })
}, 300))

const confirmDelete = (evt, record) => {
  evt.preventDefault()
  evt.stopPropagation()
  swal.fire({
    title: "",
    html: "<h1 class='text-lg text-gray-800 mb-1'>Delete Cleaner</h1><p class='text-base'>Are you sure want to delete this record?</p>",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: "Delete Record",
    customClass: {
      confirmButton: 'danger'
    }
  }).then((result) => {
    if (result.value) {
      Inertia.delete(route('cleaners.destroy', record.id), record, {
        onStart: () => { showWaitDialog() },
        onFinish: () => { hideWaitDialog() }
      })
    }
  })
}

const launchViewPropertiesModal = (cleaner, index) => {
  emitter.emit('showCleanerProperties', {
    cleaner: _.cloneDeep(cleaner),
    confirm: () => {
      cleaner.properties_count -= 1
      props.cleaners.data.splice(index, 1, cleaner)
    }
  })
}

</script>
