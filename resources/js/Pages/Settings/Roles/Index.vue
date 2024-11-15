<template>

  <Head title="Roles" />
  <SettingsLayout>
    <div class="bg-white rounded shadow">
      <div class="flex items-center justify-between px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900">Roles</h3>
        <Link class="btn btn-primary" :href="route('roles.create')" as="button"
              v-if="hasAnyPermission('create-roles')">Add New Role</Link>
      </div>
      <div class="pb-2">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Users</th>
              <th class="w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="roles.length > 0">
              <tr v-for="role in roles" :key="role.id">
                <td>{{ role.name }}</td>
                <td>
                  <label class="badge badge-default">{{ role.users_count }}</label>
                </td>
                <td>
                  <div class="actions">
                    <a href="javascript:void(0)" @click="launchRoleViewModal(role)">
                      <Icon name="view" />
                    </a>
                    <template v-if="role.name !== 'admin'">
                      <Link :href="route('roles.edit', role.id)" v-if="hasAnyPermission('update-roles')">
                        <Icon name="edit" />
                      </Link>
                      <a class="danger" href="javascript:void(0)" @click="confirmDelete($event, role)"
                         v-if="hasAnyPermission('delete-roles')">
                        <Icon name="delete" />
                      </a>
                    </template>
                  </div>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="3">No record found!</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </SettingsLayout>
  <ShowRoleDetailModal />
</template>

<script setup>
import SettingsLayout from '@/Layouts/SettingsLayout'
import Icon from '@/Components/Common/Icon'
import ShowRoleDetailModal from '@/Pages/Settings/Roles/Modals/ShowRoleDetailModal'
import { inject } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import * as _ from 'lodash'

const emitter = inject('emitter')
const hasAnyPermission = inject('hasAnyPermission')

defineProps({
  roles: Array
})

const launchRoleViewModal = (role) => {
  emitter.emit('showRoleDetail', {
    role: _.cloneDeep(role)
  })
}

const confirmDelete = (evt, record) => {
  evt.preventDefault()
  evt.stopPropagation()
  swal.fire({
    title: "",
    html: "<h1 class='text-lg text-gray-800 mb-1'>Delete Role</h1><p class='text-base'>Are you sure want to delete this record?</p>",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: "Delete Record",
    customClass: {
      confirmButton: 'danger'
    }
  }).then((result) => {
    if (result.value) {
      Inertia.delete(route('roles.destroy', record.id), record, {
        onStart: () => { showWaitDialog() },
        onFinish: () => { hideWaitDialog() }
      })
    }
  })
}
</script>
