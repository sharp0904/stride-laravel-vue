<template>

  <Head title="Offices" />
  <SettingsLayout>
    <div class="bg-white rounded shadow">
      <div class="flex items-center justify-between px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900">Offices</h3>
        <Link class="btn btn-primary" :href="route('offices.create')" as="button"
              v-if="hasAnyPermission('create-offices')">Add New Office</Link>
      </div>
      <div class="pb-2">
        <SearchBar v-model="keyword" />
        <div class="overflow-hidden scrollbar-thin scrollbar-thumb-tc-primary scrollbar-track-gray-100">
          <table class="mb-1">
            <thead>
              <tr>
                <th>Region</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th class="w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="offices.data.length > 0">
                <tr v-for="office in offices.data" :key="office.id">
                  <td class="whitespace-normal">{{ office.region.region_name }}</td>
                  <td class="whitespace-normal">{{ office.name }}</td>
                  <td>{{ office.email }}</td>
                  <td>{{ office.phone_number }}</td>
                  <td>
                    <p>{{ office.address_line_1 }}</p>
                    <p>{{ `${office.zip_code}, ${office.city}, ${office.state}` }}</p>
                    <p>{{ office.country }}</p>
                  </td>
                  <td>
                    <div class="actions">
                      <Link :href="route('offices.edit', office.id)" v-if="hasAnyPermission('update-offices')">
                        <Icon name="edit" />
                      </Link>
                      <a class="danger" href="javascript:void(0)" @click="confirmDelete($event, office)"
                         v-if="hasAnyPermission('delete-offices')">
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
        <Pagination :links="offices.links" />
      </div>
    </div>
  </SettingsLayout>
</template>

<script setup>
import SettingsLayout from '@/Layouts/SettingsLayout'
import Pagination from '@/Components/Common/Pagination'
import Icon from '@/Components/Common/Icon'
import SearchBar from '@/Components/Common/SearchBar'
import { inject, ref, watch } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import debounce from 'lodash/debounce'

const props = defineProps({
  offices: Object,
  filters: Object
})

const swal = inject('swal')
const hasAnyPermission = inject('hasAnyPermission')
const keyword = ref(props.filters.q)

watch(keyword, debounce(function (value) {
  Inertia.get(route('offices.index'), { q: value }, {
    preserveState: true,
    replace: true
  })
}, 300))

const confirmDelete = (evt, record) => {
  evt.preventDefault()
  evt.stopPropagation()
  swal.fire({
    title: "",
    html: "<h1 class='text-lg text-gray-800 mb-1'>Delete Office</h1><p class='text-base'>Are you sure want to delete this record?</p>",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: "Delete Record",
    customClass: {
      confirmButton: 'danger'
    }
  }).then((result) => {
    if (result.value) {
      Inertia.delete(route('offices.destroy', record.id), record, {
        onStart: () => { showWaitDialog() },
        onFinish: () => { hideWaitDialog() }
      })
    }
  })
}

</script>
