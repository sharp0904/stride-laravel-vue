<template>
    <AppLayout>
  
      <div class="grid grid-cols-6 gap-4">
  
        <div class="col-span-5 md:col-span-2 bg-white rounded shadow p-3">
          <ul class="aside-nav">
            <li>
              <Link :href="route('notification.new_job')" class="nav-item"
                :class="{ 'active': $page.component.startsWith('Notifications/NewJobNotification') }">
                New Job Added
              </Link>
            </li>
            <li>
              <Link :href="route('notification.client')" class="nav-item"
                :class="{ 'active': $page.component.startsWith('Notifications/ClientNotification') }">
                Job Completed - to Client
              </Link>
            </li>
            <li>
              <Link :href="route('notification.you')" class="nav-item"
                :class="{ 'active': $page.component.startsWith('Notifications/YourNotification') }">
                Job Completed - to You
              </Link>
            </li>
            <li>
              <Link :href="route('notification.reminder')" class="nav-item"
                    :class="{ 'active': $page.component.startsWith('Notifications/ReminderNotification') }">
                Job is 1 Day Away Reminder
              </Link>
            </li>
          </ul>
        </div>
  
        <div class="col-span-5 md:col-span-4">
          <slot />
        </div>
  
      </div>
    </AppLayout>
  </template>
  
  <script setup>
  import AppLayout from '@/Layouts/AppLayout'
  import {inject} from 'vue'
  
  const hasAnyPermission = inject('hasAnyPermission')
  </script>
  