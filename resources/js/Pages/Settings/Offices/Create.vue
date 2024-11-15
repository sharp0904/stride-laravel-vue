<template>

  <Head title="Add Office"/>
  <SettingsLayout>
    <div class="bg-white rounded shadow">
      <div class="flex items-center justify-between px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900">Add New Office</h3>
        <Link :href="route('offices.index')" as="button" class="btn btn-default">Back</Link>
      </div>
      <div class="border-t">

        <form @submit.prevent="submit">
          <div class="px-6 py-4">
            <div class="grid grid-cols-2 lg:gap-x-4">
              <div class="col-span-2 lg:col-span-1 mt-2">
                <label class="block font-medium text-sm text-gray-700 required" for="region">Region</label>
                <vSelect id="region" v-model="form.region_id" :options="regions" :reduce="region => region.id"
                         class="mt-1 block w-full" label="name"></vSelect>
                <InputError :message="errors?.region_id"/>
              </div>

              <div class="col-span-2 lg:col-span-1 mt-2">
                <label class="block font-medium text-sm text-gray-700 required" for="name">Name</label>
                <input id="name" v-model="form.name" autofocus class="form-input mt-1 block w-full" type="text"/>
                <InputError :message="errors?.name"/>
              </div>

              <div class="col-span-2 lg:col-span-1 mt-2">
                <label class="block font-medium text-sm text-gray-700 required" for="email">Email</label>
                <input id="email" v-model="form.email" class="form-input mt-1 block w-full" type="email"/>
                <InputError :message="errors?.email"/>
              </div>

              <div class="col-span-2 lg:col-span-1 mt-2">
                <label class="block font-medium text-sm text-gray-700 required" for="phone">Phone Number</label>
                <input id="phone" v-model="form.phone_number" class="form-input mt-1 block w-full" type="text"/>
                <InputError :message="errors?.phone_number"/>
              </div>
            </div>

            <h2 class="font-semibold text-gray-800 mt-3 mb-1 uppercase">Address</h2>

            <div class="grid grid-cols-2 lg:gap-x-4">
              <div class="col-span-2 lg:col-span-1 mt-2">
                <label class="block font-medium text-sm text-gray-700 required" for="address_line_1">Address Line
                  1</label>
                <textarea id="address_line_1" v-model="form.address_line_1" class="form-textarea mt-1 block w-full"
                          rows="2"></textarea>
                <InputError :message="errors?.address_line_1"/>
              </div>

              <div class="col-span-2 lg:col-span-1 mt-2">
                <label class="block font-medium text-sm text-gray-700" for="address_line_2">Address Line 2</label>
                <textarea id="address_line_2" v-model="form.address_line_2" class="form-textarea mt-1 block w-full"
                          rows="2"></textarea>
                <InputError :message="errors?.address_line_2"/>
              </div>

              <div class="col-span-2 lg:col-span-1 mt-2">
                <label class="block font-medium text-sm text-gray-700 required" for="zip_code">Zip Code</label>
                <input id="zip_code" v-model="form.zip_code" class="form-input mt-1 block w-full" type="text"/>
                <InputError :message="errors?.zip_code"/>
              </div>

              <div class="col-span-2 lg:col-span-1 mt-2">
                <label class="block font-medium text-sm text-gray-700 required" for="phone">City</label>
                <input id="city" v-model="form.city" class="form-input mt-1 block w-full" type="text"/>
                <InputError :message="errors?.city"/>
              </div>

              <div class="col-span-2 lg:col-span-1 mt-2">
                <label class="block font-medium text-sm text-gray-700 required" for="state">State</label>
                <input id="state" v-model="form.state" class="form-input mt-1 block w-full" type="text"/>
                <InputError :message="errors?.state"/>
              </div>

              <div class="col-span-2 lg:col-span-1 mt-2">
                <label class="block font-medium text-sm text-gray-700 required" for="country">Country</label>
                <vSelect id="country" v-model="form.country" :options="countries" :reduce="country => country.country_name"
                         class="mt-1 block w-full" label="country_name"></vSelect>
                <InputError :message="errors?.country"/>
              </div>
            </div>
          </div>

          <div class="px-6 pb-4 text-right">
            <button :disabled="processing" class="ml-2 btn btn-primary" type="submit">Save</button>
          </div>
        </form>

      </div>
    </div>
  </SettingsLayout>
</template>

<script setup>
import SettingsLayout from '@/Layouts/SettingsLayout'
import InputError from '@/Components/Common/InputError'
import {reactive, ref} from 'vue'
import {Inertia} from '@inertiajs/inertia'
import vSelect from 'vue-select'

defineProps({
  errors: Object,
  countries: Array,
  regions: Array,
})

const processing = ref(false)
const form = reactive({
  region_id: null,
  name: '',
  email: '',
  phone_number: '',
  address_line_1: '',
  address_line_2: '',
  zip_code: '',
  city: '',
  state: '',
  country: null
})

const submit = () => {
  Inertia.post(route('offices.store'), form, {
    onStart: () => {
      processing.value = true
    },
    onFinish: () => {
      processing.value = false
    }
  })
}
</script>
