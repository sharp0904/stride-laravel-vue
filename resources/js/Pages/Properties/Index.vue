<template>

  <Head title="Properties" />
  <AppLayout>
    <div class="bg-white rounded shadow">
      <div class="flex items-center justify-between px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900 mb-2 lg:mb-0 text-left">Properties</h3>
        <div>
          <Link class="btn btn-primary mr-2" :href="route('properties.create')" as="button"
            v-if="hasAnyPermission('create-properties')">Add New Property</Link>
        </div>
      </div>
      <div class="pb-2">
        <SearchBar v-model="keyword" />
        <div class="overflow-hidden scrollbar-thin scrollbar-thumb-tc-primary scrollbar-track-gray-100">
          <table class="mb-1">
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Client</th>
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
                  <td>{{ `${property.host.first_name} ${property.host.last_name}` }}</td>
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
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout'
import Icon from '@/Components/Common/Icon'
import SearchBar from '@/Components/Common/SearchBar'
import { inject, ref, watch } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import debounce from 'lodash/debounce'

const props = defineProps({
  properties: Object,
  filters: Object
})

const swal = inject('swal')
const hasAnyPermission = inject('hasAnyPermission')
const keyword = ref(props.filters.q)

watch(keyword, debounce(function (value) {
  Inertia.get(route('properties.index'), { q: value }, {
    preserveState: true,
    replace: true
  })
}, 300))

const confirmDelete = (evt, record) => {
  evt.preventDefault()
  evt.stopPropagation()
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
      Inertia.delete(route('properties.destroy', record.id), record, {
        onStart: () => { showWaitDialog() },
        onFinish: () => { hideWaitDialog() }
      })
    }
  })
}

</script>
