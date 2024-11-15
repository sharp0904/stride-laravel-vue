<template>

  <Head title="User Detail"/>
  <SettingsLayout>
    <div class="bg-white rounded shadow">
      <div class="flex items-center justify-between px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900">User Detail</h3>
        <Link :href="route('users.index')" as="button" class="btn btn-default">Back</Link>
      </div>
      <div class="pb-2 border-t px-6 py-4">
        <div class="grid grid-cols-2 lg:gap-x-4">

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-48">First Name:</p>
              <p>{{ selectedUser.first_name }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-48">Last Name:</p>
              <p>{{ selectedUser.last_name }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-48">Email:</p>
              <p>{{ selectedUser.email }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center" v-if="selectedUser.office">
              <p class="w-48">Office:</p>
              <p>{{ selectedUser.office.name }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center" v-if="selectedUser.region">
              <p class="w-48">Region:</p>
              <p>{{ selectedUser.region.region_name }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-48">Roles:</p>
              <label v-for="role in selectedUser.roles" :key="role.name" class="badge badge-default mr-1">
                {{ role.name }}
              </label>
            </div>
          </div>

        </div>
      </div>
    </div>
  </SettingsLayout>
</template>

<script setup>
import SettingsLayout from '@/Layouts/SettingsLayout'

defineProps({
  selectedUser: Object
})
</script>
