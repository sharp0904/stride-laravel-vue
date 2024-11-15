<template>

    <Head title="Register" />
    <AuthLayout>
      <div>
        <form @submit.prevent="submit">
          <div>
            <label class="block font-medium text-sm text-gray-700" for="first_name">First Name</label>
            <input id="first_name" type="text" class="form-input mt-1 block w-full" v-model="form.first_name" autofocus />
            <InputError :message="errors.first_name" />
          </div>

          <div>
            <label class="block font-medium text-sm text-gray-700" for="last_name">Last Name</label>
            <input id="last_name" type="text" class="form-input mt-1 block w-full" v-model="form.last_name" autofocus />
            <InputError :message="errors.last_name" />
          </div>

          <div>
            <label class="block font-medium text-sm text-gray-700" for="phone">Phone Number</label>
            <input id="phone" type="text" class="form-input mt-1 block w-full" v-model="form.phone" autofocus />
            <InputError :message="errors.phone" />
          </div>

          <div>
            <label class="block font-medium text-sm text-gray-700" for="email">Email</label>
            <input id="email" type="email" class="form-input mt-1 block w-full" v-model="form.email" autofocus />
            <InputError :message="errors.email" />
          </div>
  
          <div class="mt-4">
            <div class="flex items-center justify-between">
              <label class="block font-medium text-sm text-gray-700" for="password">Password</label>
            </div>
            <input id="password" type="password" class="form-input mt-1 block w-full" v-model="form.password"
              autocomplete="current-password" />
            <InputError :message="errors.password" />
          </div>
  
          <button class="mt-4 btn btn-primary w-full" :class="{ 'opacity-25': processing }" :disabled="processing"
            type="submit">
            Register
          </button>
        </form>
      </div>
    </AuthLayout>
  </template>
  
  <script setup>
  import AuthLayout from '@/Layouts/AuthLayout'
  import { reactive, ref } from 'vue'
  import { Inertia } from '@inertiajs/inertia'
  import InputError from '@/Components/Common/InputError'
  
  defineProps({
    errors: Object
  })
  
  const processing = ref(false)
  
  const form = reactive({
    first_name: null,
    last_name: null,
    phone: null,
    email: null,
    password: null
  })
  
  const submit = () => {
    Inertia.post(route('register'), form, {
      onStart: () => { processing.value = true },
      onFinish: () => { processing.value = false }
    })
  }
  
  </script>
  