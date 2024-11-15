<template>

    <Head title="Users List" />
    <AppLayout>
      <div class="bg-white rounded shadow">
        <div class="flex items-center justify-between px-6 py-3">
          <h3 class="text-lg font-medium text-gray-900">Users List</h3>
          <Link class="btn btn-primary" :href="route('users.create')" as="button"
                v-if="hasAnyPermission('create-users')">Add New User</Link>
        </div>
        <div class="pb-2">
          <SearchBar v-model="keyword" />
          <div class="overflow-hidden scrollbar-thin scrollbar-thumb-tc-primary scrollbar-track-gray-100">
            <table class="mb-1">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Acct#</th>
                  <th>Email</th>
                  <th>Phone number</th>
                  <th>Last Login Date</th>
                  <th>Monthly Base Rate</th>
                  <th>Registered Date</th>
                  <th>Canceled Date</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="users.data.length > 0">
                  <tr v-for="user in users.data" :key="user.id">
                    <td class="whitespace-normal">{{ user.name }}</td>
                    <td>{{ user.acct }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                    <td>{{ format(user.lastLoginDate) }}</td>
                    <td>{{ user.rate }}</td>
                    <td>{{ format(user.registerDate) }}</td>
                    <td>{{ format(user.cancelDate) }}</td>
                    <!-- <td>
                      <div class="actions">
                        <Link :href="route('users.show', user.id)" v-if="hasAnyPermission('view-users')">
                          <Icon name="view" />
                        </Link>
                        <template v-if="$page.props.user?.id !== user.id">
                          <Link :href="route('users.edit', user.id)" v-if="hasAnyPermission('update-users')">
                            <Icon name="edit" />
                          </Link>
                          <a class="danger" href="javascript:void(0)" @click="confirmDelete($event, user)"
                             v-if="hasAnyPermission('delete-users')">
                            <Icon name="delete" />
                          </a>
                        </template>
                      </div>
                    </td> -->
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="6">No record found!</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <Pagination :links="users.links" />
        </div>
      </div>
    </AppLayout>
  </template>
  
  <script setup>
  import AppLayout from '@/Layouts/AppLayout'
  import Pagination from '@/Components/Common/Pagination'
  import Icon from '@/Components/Common/Icon'
  import SearchBar from '@/Components/Common/SearchBar'
  import { inject, ref, watch } from 'vue'
  import { Inertia } from '@inertiajs/inertia'
  import debounce from 'lodash/debounce'
  
  const props = defineProps({
    users: Object,
    filters: Object
  })
  
  const format = (date) => {
    if(date != null) {
      const inputDate = new Date(date);

      const year = inputDate.getUTCFullYear();
      const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(inputDate.getUTCDate()).padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;

      return formattedDate;
    }
    
  }

  // const swal = inject('swal')
  const hasAnyPermission = inject('hasAnyPermission')
  const keyword = ref(props.filters.q)
  
  watch(keyword, debounce(function (value) {
    Inertia.get(route('users.list'), { q: value }, {
      preserveState: true,
      replace: true
    })
  }, 300))
  
  // const confirmDelete = (evt, record) => {
  //   evt.preventDefault()
  //   evt.stopPropagation()
  //   swal.fire({
  //     title: "",
  //     html: "<h1 class='text-lg text-gray-800 mb-1'>Delete User</h1><p class='text-base'>Are you sure want to delete this record?</p>",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: "Delete Record",
  //     customClass: {
  //       confirmButton: 'danger'
  //     }
  //   }).then((result) => {
  //     if (result.value) {
  //       Inertia.delete(route('users.destroy', record.id), record, {
  //         onStart: () => { showWaitDialog() },
  //         onFinish: () => { hideWaitDialog() }
  //       })
  //     }
  //   })
  // }
  
  </script>
  