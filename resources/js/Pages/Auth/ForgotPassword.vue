<template>

  <Head title="Forgot Password" />
  <AuthLayout>
    <div>
      <form @submit.prevent="submit">
        <div>
          <label class="block font-medium text-sm text-gray-700" for="email">Email</label>
          <input id="email" type="email" class="form-input mt-1 block w-full" v-model="form.email" autofocus />
          <InputError :message="errors.email" />
        </div>

        <button class="mt-4 btn btn-primary w-full" :class="{ 'opacity-25': processing }" :disabled="processing"
          type="submit">
          Send Password Reset Link
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
  email: null
})

const submit = () => {
  Inertia.post(route('password.email'), form, {
    onStart: () => { processing.value = true },
    onFinish: () => {
      processing.value = false
      form.email = ''
    }
  })
}

</script>

