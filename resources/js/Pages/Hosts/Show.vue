<template>

  <Head title="Host Detail" />
  <AppLayout>
    <div class="bg-white rounded shadow">
      <div class="flex items-center justify-between px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900">Host Detail</h3>
        <Link class="btn btn-default" :href="route('hosts.index')" as="button">View All Hosts</Link>
      </div>
      <div class="border-t">
        <div class="max-w-3xl mx-auto">
          <div class="px-6 py-4">
            <div class="mt-2">
              <div class="flex items-center">
                <p class="w-64">First Name:</p>
                <p>{{ host.first_name }}</p>
              </div>
            </div>

            <div class="mt-2">
              <div class="flex items-center">
                <p class="w-64">Last Name:</p>
                <p>{{ host.last_name }}</p>
              </div>
            </div>

            <div class="mt-2">
              <div class="flex items-center">
                <p class="w-64">Email:</p>
                <p>{{ host.email }}</p>
              </div>
            </div>

            <div class="mt-2">
              <div class="flex items-center">
                <p class="w-64">Phone Number:</p>
                <p>{{ host.phone_number }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout'
import { inject } from "vue";

const hasAnyPermission = inject('hasAnyPermission')

const props = defineProps({
  errors: Object,
  host: Object
})
</script>
