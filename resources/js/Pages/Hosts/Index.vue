<template>

  <Head title="Clients" />
  <AppLayout>
    <div class="bg-white rounded shadow">
      <div class="md:flex md:items-center md:justify-between px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900 mb-2 lg:mb-0 text-left">Clients</h3>
        <div class="flex items-center">
          <Link class="btn btn-primary px-3 md:px-4 mr-2" :href="route('properties.create')" as="button"
            v-if="hasAnyPermission('create-properties')">
          Add New Property
          </Link>
          <Link class="btn btn-primary px-3 md:px-4" :href="route('hosts.create')" as="button"
            v-if="hasAnyPermission('create-hosts')">Add New Client</Link>
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
                <th># of Properties</th>
                <th class="w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="hosts.length > 0">
                <tr v-for="host in hosts" :key="host.id">
                  <td>{{ `${host.first_name} ${host.last_name}` }}</td>
                  <td>{{ host.email }}</td>
                  <td>{{ host.phone_number }}</td>
                  <td>
                    <label class="badge badge-default cursor-pointer"
                           @click="launchViewPropertiesModal(host)">
                      {{ host.properties_count }}
                    </label>
                  </td>
                  <td>
                    <div class="actions">
                      <Link :href="route('hosts.show', host.id)">
                        <Icon name="view" />
                      </Link>
                      <Link :href="route('hosts.edit', host.id)" v-if="hasAnyPermission('update-properties')">
                      <Icon name="edit" />
                      </Link>
                      <a class="danger" href="javascript:void(0)" @click="confirmDelete($event, host)"
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
  <show-host-properties-modal></show-host-properties-modal>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout'
import Icon from '@/Components/Common/Icon'
import SearchBar from '@/Components/Common/SearchBar'
import {inject, onBeforeMount, ref, watch} from 'vue'
import { Inertia } from '@inertiajs/inertia'
import debounce from 'lodash/debounce'
import * as _ from 'lodash'
import ShowHostPropertiesModal from '@/Pages/Hosts/Modals/ShowHostPropertiesModal.vue'

const props = defineProps({
  hosts: Object,
  filters: Object
})

const data = ref(null)
const swal = inject('swal')
const emitter = inject('emitter')
const hasAnyPermission = inject('hasAnyPermission')
const keyword = ref(props.filters.q)

watch(keyword, debounce(function (value) {
  Inertia.get(route('hosts.index'), { q: value }, {
    preserveState: true,
    replace: true
  })
}, 300))

const confirmDelete = (evt, record) => {
  evt.preventDefault()
  evt.stopPropagation()
  swal.fire({
    title: "",
    html: "<h1 class='text-lg text-gray-800 mb-1'>Delete Host</h1><p class='text-base'>Are you sure want to delete this record?</p>",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: "Delete Record",
    customClass: {
      confirmButton: 'danger'
    }
  }).then((result) => {
    if (result.value) {
      Inertia.delete(route('hosts.destroy', record.id), record, {
        onStart: () => { showWaitDialog() },
        onFinish: () => { hideWaitDialog() }
      })
    }
  })
}

const launchViewPropertiesModal = (host, index) => {
  emitter.emit('showHostProperties', {
    host: _.cloneDeep(host),
    confirm: () => {
      host.properties_count -= 1
      props.hosts.data.splice(index, 1, host)
    }
  })
}

</script>
