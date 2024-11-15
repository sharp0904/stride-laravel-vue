<template>

  <Head title="Add Role"/>
  <SettingsLayout>
    <div class="bg-white rounded shadow">
      <div class="flex items-center justify-between px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900">Add Role</h3>
        <Link :href="route('roles.index')" as="button" class="btn btn-default">Back</Link>
      </div>
      <div class="border-t">
        <form @submit.prevent="submit">
          <div class="px-6 py-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2 lg:col-span-1">
                <div class="mt-2">
                  <label class="block font-medium text-sm text-gray-700 required" for="name">Role Name</label>
                  <input id="name" v-model="form.name" autofocus class="form-input mt-1 block w-full" type="text"/>
                  <InputError :message="errors?.name"/>
                </div>
              </div>
            </div>

            <h2 class="font-semibold text-gray-800 mt-3">Permissions</h2>
            <p class="mb-3 text-sm text-red-700">Please select at least one permission</p>

            <label class="inline-flex items-center mb-2 mr-3">
              <CheckBox v-model="toggleAll" class="form-checkbox"/>
              <span class="inline-block	ml-2">Select/De-select All</span>
            </label>

            <template v-for="pg in Object.keys(permissionsList)" :key="pg">
              <h2 class="mb-2">
                <label class="inline-flex items-center mr-3">
                  <CheckBox v-model="permissionGps[pg].selected" :checked="permissionGps[pg].selected" :name="pg"
                            class="form-checkbox" @change="toggle(pg)"/>
                  <span class="inline-block	ml-2 uppercase text-sm font-semibold text-gray-500">{{ pg }}</span>
                </label>
              </h2>
              <label v-for="permission in permissionsList[pg]" class="inline-flex items-center mb-2 mr-3">
                <CheckBox v-model="permission.active" :checked="permission.active" :name="permission.name"
                          class="form-checkbox"/>
                <span class="inline-block	ml-2 capitalize">{{ permission.name }}</span>
              </label>
            </template>

            <InputError :message="errors?.permissions"/>

          </div>
          <div class="px-6 pb-4 text-right">
            <button :disabled="processing" class="ml-2 btn btn-primary" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  </SettingsLayout>
</template>

<script setup>
import SettingsLayout from '@/Layouts/SettingsLayout'
import InputError from '@/Components/Common/InputError'
import CheckBox from '@/Components/Common/CheckBox'
import {reactive, ref, watch, onMounted} from 'vue'
import {Inertia} from '@inertiajs/inertia'
import * as _ from 'lodash'

const props = defineProps({
  errors: Object,
  permissions: Array
})

const processing = ref(false)
const toggleAll = ref(false)
const permissionsList = ref({})
const permissionGps = ref({})

const form = reactive({
  name: '',
  permissions: []
})

watch(() => toggleAll.value, (newVal) => {
  Object.keys(permissionsList.value).forEach(key => {
    permissionsList.value[key] = permissionsList.value[key].map(p => {
      return {
        ...p,
        active: newVal
      };
    })
  })
})

const toggle = (pg) => {
  const val = permissionGps.value[pg].selected
  permissionsList.value[pg] = permissionsList.value[pg].map((p) => {
    return {
      ...p,
      active: val
    }
  })
}

watch(() => _.cloneDeep(permissionsList.value), (newVal, oldVal) => {
  const permissions = []
  Object.keys(newVal).forEach(pg => {
    newVal[pg].forEach(permission => {
      if (permission.active) {
        permissions.push(permission.id)
      }
    })
  })
  form.permissions = permissions
})

const submit = () => {
  Inertia.post(route('roles.store'), form, {
    onStart: () => {
      processing.value = true
    },
    onFinish: () => {
      processing.value = false
    }
  })
}

onMounted(() => {
  const permissions = {}
  props.permissions.forEach(permission => {
    if (!permissions[permission.group]) {
      permissions[permission.group] = []
      permissionGps.value[permission.group] = []
      permissionGps.value[permission.group].push({
        selected: false
      })
    }
    permissions[permission.group].push({
      id: permission.id,
      name: permission.name.replace(/[-_]/g, ' '),
      active: false
    })
  })
  permissionsList.value = permissions
})

</script>
