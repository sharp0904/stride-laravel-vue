<template>
  <div class="bg-white rounded shadow">
    <div class="flex items-center justify-between px-6 py-3">
      <h3 class="text-lg font-medium text-gray-900">Update Password</h3>
    </div>
    <div class="border-t">

      <form @submit.prevent="submit">

        <div class="max-w-lg mx-auto">
          <div class="px-6 py-4">

            <div class="mt-2">
              <label class="block font-medium text-sm text-gray-700 required" for="current_password">Current Password</label>
              <input type="password" id="current_password" class="form-textarea mt-1 block w-full"
                v-model="form.current_password" />
              <InputError :message="errors?.current_password" />
            </div>

            <div class="mt-2">
              <label class="block font-medium text-sm text-gray-700 required" for="password">New Password</label>
              <input type="password" id="password" class="form-textarea mt-1 block w-full" v-model="form.password" />
              <InputError :message="errors?.password" />
            </div>

            <div class="mt-2">
              <label class="block font-medium text-sm text-gray-700 required" for="password_confirmation">Confirm
                Password</label>
              <input type="password" id="password_confirmation" class="form-textarea mt-1 block w-full"
                v-model="form.password_confirmation" />
              <InputError :message="errors?.password_confirmation" />
            </div>
          </div>

          <div class="px-6 pb-4 text-right">
            <button type="submit" class="ml-2 btn btn-primary" :disabled="processing">Save</button>
          </div>

        </div>
      </form>
    </div>
  </div>

</template>

<script setup>
import InputError from '@/Components/Common/InputError'
import { reactive, ref } from 'vue'
import { Inertia } from '@inertiajs/inertia'

const errors = ref(null)
const processing = ref(false)

const form = reactive({
  current_password: '',
  password: '',
  password_confirmation: ''
})

const clearForm = () => {
  form.current_password = ''
  form.password = ''
  form.password_confirmation = ''
}

const submit = () => {
  Inertia.put(route('update-password'), form, {
    preserveScroll: true,
    onStart: () => { processing.value = true },
    onFinish: () => {
      processing.value = false
      clearForm()
    },
    onError: (err) => {
      errors.value = err
    }
  })
}

</script>
