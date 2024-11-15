<template>
  <modal :show="show" @close="closeModal()">
    <template #title>
      <h3 class="text-lg font-medium text-gray-900">Role Detail</h3>
    </template>
    <template #content>
      <div class="px-6 py-4">
        <template v-if="role">
          <p class="mb-3"><span class="font-medium">Role Name:</span> {{ role.name }}</p>
          <div class="border-b border-gray-100" />
          <h3 class="text-lg font-medium text-gray-900 py-3">Permissions</h3>
          <div>
            <template v-for="permissionGroup in Object.keys(role.permissions)" :key="permissionGroup">
              <h2 class="uppercase text-sm font-semibold mb-2 text-gray-600">{{ permissionGroup }}</h2>
              <div class="flex flex-wrap space-x-2">
                <span class="badge badge-default mb-2" v-for="permission in role.permissions[permissionGroup]"
                  :key="permission.id">
                  {{ permission.name }}
                </span>
              </div>
            </template>
          </div>
        </template>
      </div>
      <div class="px-6 py-4 bg-gray-100 text-right">
        <button type="button" class="btn btn-default" @click="closeModal()">Close</button>
      </div>
    </template>
  </modal>
</template>

<script setup>
import Modal from '@/Components/Common/Modal'
import { ref, onMounted, onUnmounted, inject } from 'vue'

const show = ref(false)
const emitter = inject('emitter')
const role = ref(null)

const closeModal = () => {
  show.value = false
}

const showModal = (args) => {
  role.value = args?.role ? args.role : null
  const permissions = {}
  if (role.value && role.value.permissions) {
    role.value.permissions.forEach(permission => {
      if (!permissions[permission.group]) {
        permissions[permission.group] = []
      }
      permissions[permission.group].push({
        name: permission.name.replace(/[-_]/g, ' ')
      })
    })
  }
  role.value.permissions = permissions
  // Show modal
  show.value = true
}

onMounted(() => {
  emitter.on('showRoleDetail', showModal)
})


onUnmounted(() => {
  emitter.off('showRoleDetail', showModal)
})

</script>