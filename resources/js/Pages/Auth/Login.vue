<template>

  <Head title="Login" />
  <AuthLayout>
    <div>
      <form @submit.prevent="submit">
        <div>
          <label class="block font-medium text-sm text-gray-700" for="email">Email</label>
          <input id="email" type="email" class="form-input mt-1 block w-full" v-model="form.email" autofocus />
          <InputError :message="errors.email" />
        </div>

        <div class="mt-4">
          <div class="flex items-center justify-between">
            <label class="block font-medium text-sm text-gray-700" for="password">Password</label>
            <Link class="text-tc-primary hover:underline" :href="route('password.request')">Forgot Your Password?
            </Link>
          </div>
          <input id="password" type="password" class="form-input mt-1 block w-full" v-model="form.password"
            autocomplete="current-password" />
          <InputError :message="errors.password" />
        </div>

        <button class="mt-4 btn btn-primary w-full" :class="{ 'opacity-25': processing }" :disabled="processing"
          type="submit">
          Log in
        </button>
        <Link class="text-tc-primary hover:underline" :href="route('register.request')">
          <button class="mt-4 btn btn-primary w-full" :class="{ 'opacity-25': processing }" :disabled="processing"
            type="button">
            Register
          </button>
        </Link>
        
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
  email: null,
  password: null
})

const submit = () => {
  Inertia.post(route('login'), form, {
    onStart: () => { processing.value = true },
    onFinish: () => { processing.value = false }
  })
}

</script>
