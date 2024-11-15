<template>

  <Head title="Add Region" />
  <SettingsLayout>
    <div class="bg-white rounded shadow">
      <div class="flex items-center justify-between px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900">Add New Region</h3>
        <Link class="btn btn-default" :href="route('regions.index')" as="button">Back</Link>
      </div>
      <div class="border-t">

        <form @submit.prevent="submit">

          <div class="max-w-lg mx-auto">
            <div class="px-6 py-4">
              <div class="mt-2">
                <label class="block font-medium text-sm text-gray-700 required" for="region_name">Geographical Region</label>
                <textarea id="region_name" rows="2" class="form-textarea mt-1 block w-full"
                  v-model="form.region_name"></textarea>
                <InputError :message="errors?.region_name" />
              </div>
            </div>

            <div class="px-6 pb-4 text-right">
              <button type="submit" class="ml-2 btn btn-primary" :disabled="processing">Save</button>
            </div>

          </div>
        </form>

      </div>
    </div>
  </SettingsLayout>
</template>

<script setup>
import SettingsLayout from '@/Layouts/SettingsLayout'
import InputError from '@/Components/Common/InputError'
import { reactive, ref } from 'vue'
import { Inertia } from '@inertiajs/inertia'

defineProps({
  errors: Object
})

const processing = ref(false)
const form = reactive({
  region_name: ''
})

const submit = () => {
  Inertia.post(route('regions.store'), form, {
    onStart: () => { processing.value = true },
    onFinish: () => { processing.value = false }
  })
}
</script>
