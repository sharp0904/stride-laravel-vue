<template>

  <Head title="Update User" />
  <SettingsLayout>
    <div class="bg-white rounded shadow">
      <div class="flex items-center justify-between px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900">Update User</h3>
        <Link class="btn btn-default" :href="route('users.index')" as="button">Back</Link>
      </div>
      <div class="border-t">

        <form @submit.prevent="submit">

          <div class="max-w-lg mx-auto">
            <div class="px-6 py-4">
              <div class="mt-2">
                <label class="block font-medium text-sm text-gray-700 required" for="role">Role</label>
                <vSelect id="role" :options="roles" label="name" class="mt-1 block w-full"
                  v-model="form.role" :reduce="role => role.id"></vSelect>
                <InputError :message="errors?.role" />
              </div>

              <div v-if="isRegion" class="mt-2">
                <label class="block font-medium text-sm text-gray-700 required" for="regions">Regions</label>
                <vSelect id="regions" v-model="form.region_id" :options="regions" :reduce="region => region.id" class="mt-1 block w-full"
                         label="name"></vSelect>
                <InputError :message="errors?.regions"/>
              </div>

              <div v-if="isOffice" class="mt-2">
                <label class="block font-medium text-sm text-gray-700 required" for="office_id">Office</label>
                <vSelect id="office_id" v-model="form.office_id" :options="offices" :reduce="office => office.id"
                         class="mt-1 block w-full" label="name"></vSelect>
                <InputError :message="errors?.office_id"/>
              </div>

              <div class="mt-2">
                <label class="block font-medium text-sm text-gray-700 required" for="first_name">First Name</label>
                <input type="text" id="first_name" class="form-textarea mt-1 block w-full" v-model="form.first_name" />
                <InputError :message="errors?.first_name" />
              </div>

              <div class="mt-2">
                <label class="block font-medium text-sm text-gray-700 required" for="last_name">Last Name</label>
                <input type="text" id="last_name" class="form-textarea mt-1 block w-full" v-model="form.last_name" />
                <InputError :message="errors?.last_name" />
              </div>

              <div class="mt-2">
                <label class="block font-medium text-sm text-gray-700 required" for="email">Email</label>
                <input type="email" id="email" class="form-textarea mt-1 block w-full" v-model="form.email" />
                <InputError :message="errors?.email" />
              </div>
            </div>

            <div class="px-6 pb-4 text-right">
              <button type="submit" class="ml-2 btn btn-primary" :disabled="processing">Save</button>
            </div>

          </div>
        </form>

      </div>
    </div>
  </SettingsLayout>
</template>

<script setup>
import SettingsLayout from '@/Layouts/SettingsLayout'
import InputError from '@/Components/Common/InputError'
import {onMounted, reactive, ref, watch} from 'vue'
import { Inertia } from '@inertiajs/inertia'
import vSelect from 'vue-select'
import find from "lodash/find"

const props = defineProps({
  errors: Object,
  selectedUser: Object,
  roles: Array,
  regions: Array
})

const processing = ref(false)
const offices = ref([])
const isOffice = ref(false)
const isRegion = ref(false)
const form = reactive({
  role: props.selectedUser.role,
  office_id: props.selectedUser.office_id,
  region_id: props.selectedUser.region_id,
  first_name: props.selectedUser.first_name,
  last_name: props.selectedUser.last_name,
  email: props.selectedUser.email
})

watch(() => form.role, (val) => {
  const role = find(props.roles, {id: val})
  if (role) {
    if (role.permissions.indexOf('only-assigned-offices') !== -1
      || role.permissions.indexOf('only-assigned-regions') !== -1) {
      isRegion.value = true
    }
    isOffice.value = role.permissions.indexOf('only-assigned-offices') !== -1
  }
})

watch(() => form.region_id, (val) => {
  const region = find(props.regions, { id: val })
  if (region) {
    offices.value = region.offices
  }
})

const submit = () => {
  if (!isRegion.value) {
    form.region_id = null
    form.office_id = null
  }
  if (!isOffice.value) {
    form.office_id = null
  }
  Inertia.put(route('users.update', props.selectedUser.id), form, {
    onStart: () => { processing.value = true },
    onFinish: () => { processing.value = false }
  })
}

onMounted(() => {
  if (props.selectedUser.region_id) {
    isRegion.value = true
    const region = find(props.regions, { id: props.selectedUser.region_id})
    if (region) {
      offices.value = region.offices
    }
  }
  if (props.selectedUser.office_id) {
    isOffice.value = true
  }
})
</script>
