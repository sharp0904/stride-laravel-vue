<template>

  <Head title="Profile" />
  <SettingsLayout>
    <div class="bg-white rounded shadow mb-4">
      <div class="flex items-center justify-between px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900">Profile</h3>
      </div>
      <div class="border-t">

        <form @submit.prevent="submit">

          <div class="max-w-lg mx-auto">
            <div class="px-6 py-4">

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
                <input type="email" class="form-textarea mt-1 block w-full" :value="user?.email" readonly />
              </div>
            </div>

            <div class="px-6 pb-4 text-right">
              <button type="submit" class="ml-2 btn btn-primary" :disabled="processing">Save</button>
            </div>

          </div>
        </form>

        <div class="text-center px-6 pb-4">
          <button type="button" class="btn btn-danger" @click="deleteAccount">Delete Account</button>
        </div>

      </div>
    </div>

    <UpdatePassword />
  </SettingsLayout>
</template>

<script setup>
import SettingsLayout from '@/Layouts/SettingsLayout'
import InputError from '@/Components/Common/InputError'
import UpdatePassword from '@/Pages/Settings/Profile/UpdatePassword'
import { reactive, ref } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import { usePage } from '@inertiajs/inertia-vue3'

defineProps({
  errors: Object
})

const processing = ref(false)
const user = ref(usePage().props.value.user)

const form = reactive({
  first_name: user.value.first_name,
  last_name: user.value.last_name
})

const deleteAccount = () => {
  swal.fire({
    title: "",
    html: "<h1 class='text-lg text-gray-800 mb-1'>Delete User</h1><p class='text-base'>Are you sure want to delete this record?</p>",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: "Delete Record",
    customClass: {
      confirmButton: 'danger'
    }
  }).then((result) => {
    if (result.value) {
      Inertia.delete(route('users.destroy', user.value.id), {
        onStart: () => { showWaitDialog() },
        onFinish: () => { hideWaitDialog() }
      })
    }
  })
}

const submit = () => {
  Inertia.put(route('update-profile'), form, {
    onStart: () => { processing.value = true },
    onFinish: () => { processing.value = false }
  })
}

</script>
