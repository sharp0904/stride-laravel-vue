<template>
  <AppLayout>

    <div class="grid grid-cols-5 gap-4">

      <div class="col-span-5 md:col-span-1 bg-white rounded shadow p-3">
        <ul class="aside-nav">
          <li>
            <Link :href="route('profile')" class="nav-item"
              :class="{ 'active': $page.component.startsWith('Settings/Profile') }">Profile
            </Link>
          </li>
          <!-- <li>
            <Link :href="route('roles.index')" class="nav-item"
              :class="{ 'active': $page.component.startsWith('Settings/Roles') }"
                  v-if="hasAnyPermission(['view-roles', 'create-roles', 'update-roles', 'delete-roles'])">
              Roles
            </Link>
          </li> -->
          <li>
            <Link :href="route('regions.index')" class="nav-item"
              :class="{ 'active': $page.component.startsWith('Settings/Regions') }"
                  v-if="hasAnyPermission(['view-regions', 'create-regions', 'update-regions', 'delete-regions'])">
              Regions
            </Link>
          </li>
          <li>
            <Link :href="route('offices.index')" class="nav-item"
                  :class="{ 'active': $page.component.startsWith('Settings/Offices') }"
                  v-if="hasAnyPermission(['view-offices', 'create-offices', 'update-offices', 'delete-offices'])">
              Offices
            </Link>
          </li>
          <!-- <li>
            <Link :href="route('users.index')" class="nav-item"
              :class="{ 'active': $page.component.startsWith('Settings/Users') }"
                  v-if="hasAnyPermission(['view-users', 'create-users', 'update-users', 'delete-users'])">
                Users
            </Link>
          </li> -->
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
