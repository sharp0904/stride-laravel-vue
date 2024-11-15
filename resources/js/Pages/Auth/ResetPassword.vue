<template>

  <Head title="Reset Password" />
  <AuthLayout>
    <div>
      <form @submit.prevent="submit">

        <div>
          <label class="block font-medium text-sm text-gray-700" for="password">Email</label>
          <input id="email" type="email" class="form-input mt-1 block w-full" v-model="form.email" autofocus />
          <InputError :message="errors.email" />
        </div>

        <div class="mt-2">
          <label class="block font-medium text-sm text-gray-700" for="password">New Password</label>
          <input id="password" type="password" class="form-input mt-1 block w-full" v-model="form.password" />
          <InputError :message="errors.password" />
        </div>

        <div class="mt-2">
          <label class="block font-medium text-sm text-gray-700" for="password_confirmation">Confirm Password</label>
          <input id="password_confirmation" type="password" class="form-input mt-1 block w-full"
            v-model="form.password_confirmation" />
          <InputError :message="errors.password_confirmation" />
        </div>

        <button class="mt-4 btn btn-primary w-full" :class="{ 'opacity-25': processing }" :disabled="processing"
          type="submit">
          Reset Password
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

const props = defineProps({
  errors: Object,
  token: String
})

const processing = ref(false)

const form = reactive({
  token: props.token,
  email: '',
  password: null,
  password_confirmation: null
})

const submit = () => {
  Inertia.post(route('password.update'), form, {
    onStart: () => { processing.value = true },
    onFinish: () => { processing.value = false }
  })
}

</script>

