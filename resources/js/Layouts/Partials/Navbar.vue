<template>
  <nav class="bg-gray-100 shadow">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button type="button" @click="toggeBurgerMenu()"
            class="inline-flex items-center justify-center p-2 rounded-md text-tc-primary focus:outline-none"
            aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg v-show="!isBurgerMenu" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-show="isBurgerMenu" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <img class="h-12 w-auto" src="/assets/images/logo.png" alt="Enhance">
          </div>
          <div class="hidden sm:block sm:ml-6 md:flex md:items-center">
            <div class="flex items-center md:space-x-2 lg:space-x-4">
              <!-- <Link :href="route('dashboard')" class="hover:text-tc-primary px-3 py-2 rounded-md font-medium"
                :class="[$page.component === 'Dashboard' ? 'text-tc-primary' : 'text-gray-600']">Dashboard</Link> -->

              <Link :href="route('calendar')"
                :class="[$page.component.startsWith('Calendar') ? 'text-tc-primary' : 'text-gray-600']"
                class="hover:text-tc-primary px-3 py-2 rounded-md font-medium"
                v-if="hasAnyPermission(['view-appointments', 'create-appointments', 'update-appointments', 'delete-appointments'])">
                Calendar
              </Link>

              <Link :href="route('hosts.index')" class="hover:text-tc-primary px-3 py-2 rounded-md font-medium"
                :class="[$page.component.startsWith('Hosts') ? 'text-tc-primary' : 'text-gray-600']"
                v-if="hasAnyPermission(['view-hosts', 'create-hosts', 'update-hosts', 'delete-hosts'])">Clients</Link>

              <Link :href="route('properties.index')" class="hover:text-tc-primary px-3 py-2 rounded-md font-medium"
                :class="[$page.component.startsWith('Properties') ? 'text-tc-primary' : 'text-gray-600']"
                v-if="hasAnyPermission(['view-properties', 'create-properties', 'update-properties', 'delete-properties'])">
                Properties
              </Link>

              <Link :href="route('cleaners.index')" class="hover:text-tc-primary px-3 py-2 rounded-md font-medium"
                    :class="[$page.component.startsWith('Cleaners') ? 'text-tc-primary' : 'text-gray-600']"
                    v-if="hasAnyPermission(['view-cleaners', 'create-cleaners', 'update-cleaners', 'delete-cleaners'])">
                Employees
              </Link>

              <Link :href="route('users.list')" class="hover:text-tc-primary px-3 py-2 rounded-md font-medium"
                    :class="[$page.component.startsWith('UsersList') ? 'text-tc-primary' : 'text-gray-600']"
                    v-if="hasAnyPermission(['view-users', 'create-users', 'update-users', 'delete-users'])">
                Users
              </Link>

              <Link :href="route('notification.new_job')" class="hover:text-tc-primary px-3 py-2 rounded-md font-medium"
                    :class="[$page.component.startsWith('Notifications') ? 'text-tc-primary' : 'text-gray-600']">
                Notifications
              </Link>

            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

          <Dropdown align="right" width="48">
            <template #trigger>
              <button class="flex items-center">
                <img class="h-8 w-8 text-sm border-2 border-tc-primary-light rounded-full object-cover"
                  :src="$page.props.user.photo_url" :alt="$page.props.user.first_name" />
                <span class="sr-only">Open user menu</span>
                <span class="hidden md:block ml-3 text-gray-600">
                  {{ `${$page.props.user.first_name} ${$page.props.user.last_name}` }}
                </span>
                <span class="ml-3 text-gray-600">
                  <Icon name="chevron-down" classes="w-4 h-4" />
                </span>
              </button>
            </template>

            <template #content>
              <Link :href="route('profile')" class="block px-4 py-2 text-sm text-gray-700" role="menuitem"
                tabindex="-1">Your Profile
              </Link>
              <Link :href="route('profile')" class="block px-4 py-2 text-sm text-gray-700" role="menuitem"
                tabindex="-1">Settings</Link>
              <Link :href="route('logout')" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1"
                method="post" as="button">Sign out</Link>
            </template>
          </Dropdown>

        </div>
      </div>
    </div>

    <div v-show="isBurgerMenu" class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">

        <!-- <Link :href="route('dashboard')"
          :class="[$page.component.startsWith('Dashboard') ? 'bg-tc-primary text-white' : 'text-gray-600']"
          class="block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link> -->

        <Link :href="route('calendar')" class="block px-3 py-2 rounded-md text-base font-medium"
          :class="[$page.component.startsWith('Calendar') ? 'bg-tc-primary text-white' : 'text-gray-600']"
          v-if="hasAnyPermission(['view-appointments', 'create-appointments', 'update-appointments', 'delete-appointments'])">
          Calendar
        </Link>

        <Link :href="route('hosts.index')"
          :class="[$page.component.startsWith('Hosts') ? 'bg-tc-primary text-white' : 'text-gray-600']"
          class="text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
          v-if="hasAnyPermission(['view-hosts', 'create-hosts', 'update-hosts', 'delete-hosts'])">Clients
        </Link>

        <Link :href="route('properties.index')"
          :class="[$page.component.startsWith('Properties') ? 'bg-tc-primary text-white' : 'text-gray-600']"
          class="text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
          v-if="hasAnyPermission(['view-properties', 'create-properties', 'update-properties', 'delete-properties'])">
          Properties
        </Link>

        <Link :href="route('cleaners.index')"
              :class="[$page.component.startsWith('Cleaners') ? 'bg-tc-primary text-white' : 'text-gray-600']"
              class="text-gray-600 block px-3 py-2 rounded-md text-base font-medium"
              v-if="hasAnyPermission(['view-cleaners', 'create-cleaners', 'update-cleaners', 'delete-cleaners'])">
          Employees
        </Link>

        <Link :href="route('users.list')" class="hover:text-tc-primary px-3 py-2 rounded-md font-medium"
              :class="[$page.component.startsWith('UsersList') ? 'text-tc-primary' : 'text-gray-600']"
              v-if="hasAnyPermission(['view-users', 'create-users', 'update-users', 'delete-users'])">
          Users
        </Link>
        <Link :href="route('notification.new_job')" class="hover:text-tc-primary px-3 py-2 rounded-md font-medium"
              :class="[$page.component.startsWith('Notifications') ? 'text-tc-primary' : 'text-gray-600']">
          Notifications
        </Link>

      </div>
    </div>
  </nav>
</template>

<script setup>
import {inject, ref} from 'vue'
import Dropdown from '@/Components/Common/Dropdown'
import Icon from '@/Components/Common/Icon'

const hasAnyPermission = inject('hasAnyPermission')
const isBurgerMenu = ref(false)

const toggeBurgerMenu = () => {
  isBurgerMenu.value = !isBurgerMenu.value
}

</script>
