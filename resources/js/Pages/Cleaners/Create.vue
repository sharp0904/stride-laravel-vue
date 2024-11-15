<template>

  <Head title="Add Cleaner" />
  <AppLayout>
    <div class="bg-white rounded shadow">
      <div class="flex items-center justify-between px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900">Add New Cleaner</h3>
        <Link class="btn btn-default" :href="route('cleaners.index')" as="button">Back</Link>
      </div>
      <div class="border-t">
        <div class="max-w-3xl mx-auto">
          <form @submit.prevent="submit">
            <div class="px-6 py-4">
              <div class="grid grid-cols-2 gap-0 lg:gap-4">
                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700 required" for="firstName">First Name</label>
                  <input id="firstName" type="text" class="form-input mt-1 block w-full" v-model="form.first_name" autofocus />
                  <InputError :message="errors?.first_name" />
                </div>

                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700 required" for="lastName">Last Name</label>
                  <input id="lastName" type="text" class="form-input mt-1 block w-full" v-model="form.last_name" />
                  <InputError :message="errors?.last_name" />
                </div>

                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700 required" for="email">Email</label>
                  <input id="email" type="email" class="form-input mt-1 block w-full" v-model="form.email" />
                  <InputError :message="errors?.email" />
                </div>

                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700 required" for="phone">Phone Number</label>
                  <input id="phone" type="text" class="form-input mt-1 block w-full" v-model="form.phone_number" />
                  <InputError :message="errors?.phone_number" />
                </div>

                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700 required"
                         for="office">Region</label>
                  <vSelect id="region" v-model="form.region_id" :options="regions" :reduce="region => region.id"
                           class="mt-1 block w-full" label="name" @update:modelValue="loadOffices"></vSelect>
                  <InputError :message="errors?.region_id"/>
                </div>

                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700 required"
                         for="office">Office</label>
                  <vSelect id="office" v-model="form.office_id" :options="offices" :reduce="office => office.id"
                           class="mt-1 block w-full" label="name"></vSelect>
                  <InputError :message="errors?.office_id"/>
                </div>
              </div>
            </div>
            <div class="px-6 pb-4 text-right">
              <button type="submit" class="ml-2 btn btn-primary" :disabled="processing">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout'
import InputError from '@/Components/Common/InputError'
import { reactive, ref } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import vSelect from 'vue-select'
import axios from 'axios'

defineProps({
  errors: Object,
  regions: Array
});

const processing = ref(false);
const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  region_id: null,
  office_id: null
});

const prevRegionId = ref(null);
const offices = ref([]);
const loadOffices = async () => {
  if (!form.region_id) return;

  const response = await axios.get(`/settings/offices/region/${form.region_id}`);
  offices.value = response.data;

  if (form.region_id != prevRegionId.value) {
    form.office_id = null;
    prevRegionId.value = form.region_id;
  }
}

const submit = () => {
  Inertia.post(route('cleaners.store'), form, {
    onStart: () => { processing.value = true },
    onFinish: () => { processing.value = false }
  })
}
</script>
