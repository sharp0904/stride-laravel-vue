<template>

  <Head title="Regions" />
  <SettingsLayout>
    <div class="bg-white rounded shadow">
      <div class="flex items-center justify-between px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900">Regions</h3>
        <Link class="btn btn-primary" :href="route('regions.create')" as="button"
              v-if="hasAnyPermission('create-regions')">Add New Region</Link>
      </div>
      <div class="pb-2">
        <SearchBar v-model="keyword" />
        <div class="overflow-hidden scrollbar-thin scrollbar-thumb-tc-primary scrollbar-track-gray-100">
          <table class="mb-1">
            <thead>
              <tr>
                <th>Region</th>
                <th class="w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="regions.data.length > 0">
                <tr v-for="region in regions.data" :key="region.id">
                  <td>{{ region.region_name }}</td>
                  <td>
                    <div class="actions">
                      <Link :href="route('regions.edit', region.id)" v-if="hasAnyPermission('update-regions')">
                        <Icon name="edit" />
                      </Link>
                      <a class="danger" href="javascript:void(0)" @click="confirmDelete($event, region)"
                         v-if="hasAnyPermission('delete-regions')">
                        <Icon name="delete" />
                      </a>
                    </div>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="2">No record found!</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <Pagination :links="regions.links" />
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
  regions: Object,
  filters: Object
})

const swal = inject('swal')
const hasAnyPermission = inject('hasAnyPermission')
const keyword = ref(props.filters.q)

watch(keyword, debounce(function (value) {
  Inertia.get(route('regions.index'), { q: value }, {
    preserveState: true,
    replace: true
  })
}, 300))

const confirmDelete = (evt, record) => {
  evt.preventDefault()
  evt.stopPropagation()
  swal.fire({
    title: "",
    html: "<h1 class='text-lg text-gray-800 mb-1'>Delete Region</h1><p class='text-base'>Are you sure want to delete this record?</p>",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: "Delete Record",
    customClass: {
      confirmButton: 'danger'
    }
  }).then((result) => {
    if (result.value) {
      Inertia.delete(route('regions.destroy', record.id), record, {
        onStart: () => { showWaitDialog() },
        onFinish: () => { hideWaitDialog() }
      })
    }
  })
}

</script>
