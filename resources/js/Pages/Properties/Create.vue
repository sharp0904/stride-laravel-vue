<template>

  <Head title="Add Property"/>
  <AppLayout>
    <div class="bg-white rounded shadow">
      <div class="flex items-center justify-between px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900">Add New Property</h3>
        <Link :href="route('properties.index')" as="button" class="btn btn-primary">List Properties</Link>
      </div>
      <div class="border-t">
        <div class="max-w-3xl mx-auto">
          <form @submit.prevent="submit">
            <div class="px-6 py-4">
              
              <div class="grid grid-cols-2 gap-0 md:gap-x-4">

                <div class="flex">
                  <label class="block font-medium text-sm text-gray-700">Recurring</label>
                  <div class="text-right mx-5">
                    <!-- <ejs-switch v-model="recurringType"></ejs-switch> -->
                    <Switch
                      v-model="recurringType"
                      :class="recurringType ? 'bg-green-700' : 'bg-gray-200'"
                      class="relative inline-flex h-6 w-11 items-center rounded-full"
                    >
                      <span class="sr-only"></span>
                      <span
                        :class="recurringType ? 'translate-x-6' : 'translate-x-1'"
                        class="inline-block h-4 w-4 transform rounded-full bg-white transition"
                      />
                    </Switch>
                  </div>
                </div>

                <div class="md:col-span-1 mt-2">
                  <label class="inline-flex items-center mb-2 mr-3">
                    <CheckBox v-model="isStr" class="form-checkbox" name="is_str"/>
                    <span class="inline-block	ml-2">Is this a STR?</span>
                  </label>
                </div>

                <div v-if="recurringType" class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700 required"
                         for="recurring">Recurring Type</label>
                  <vSelect id="recurring" v-model="form.recurring" :options="recurringTypeList" :reduce="recurringType => recurringType.id"
                           class="mt-1 block w-full" label="name"></vSelect>
                  <InputError :message="errors?.recurring"/>
                </div>

                <div v-if="recurringType" class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700 required" for="start">Start Date</label>
                  <DateTimePicker id="start_date" v-model="form.start" :auto-select="true"
                                  format="yyyy-MM-dd" class="mt-1 block w-full"/>
                  <InputError :message="errors?.start"/>
                </div>

                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700 required"
                         for="office">Office</label>
                  <vSelect id="office" v-model="form.office_id" :options="offices" :reduce="office => office.id"
                           class="mt-1 block w-full" label="name" @update:modelValue="loadCleaners"></vSelect>
                  <InputError :message="errors?.office_id"/>
                </div>

                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700 required" for="host_id">Client</label>
                  <vSelect id="host_id" v-model="form.host_id" :options="hosts" :reduce="host => host.id" class="mt-1 block w-full"
                           label="name"></vSelect>
                  <InputError :message="errors?.host_id"/>
                </div>

                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="name">Name</label>
                  <input id="name" v-model="form.name" class="form-input mt-1 block w-full" type="text"/>
                  <InputError :message="errors?.name"/>
                </div>

                <div v-if="!isStr" class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="price">Price</label>
                  <input id="price" v-model="form.price" class="form-input mt-1 block w-full" type="text"
                         @keydown="validatePrice"/>
                  <InputError :message="errors?.price"/>
                </div>

                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="beds">Bedrooms</label>
                  <select id="beds" v-model="form.beds" class="form-select mt-1 block w-full">
                    <option v-for="bed in range" :key="bed" :value="bed">{{ bed }}</option>
                  </select>
                  <InputError :message="errors?.beds"/>
                </div>

                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="size">Bathrooms</label>
                  <select id="rooms" v-model="form.baths" class="form-select mt-1 block w-full">
                    <option v-for="bath in bathRange" :key="bath" :value="bath">{{ bath }}</option>
                  </select>
                  <InputError :message="errors?.baths"/>
                </div>

                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="entrance_code">
                    Square Feet</label>
                  <input id="square_feet" v-model="form.square_feet" class="form-input mt-1 block w-full"
                         type="text"/>
                  <InputError :message="errors?.square_feet"/>
                </div>

                <div v-if="isStr" class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="accommodation_size">
                    Accommodation Size</label>
                  <input id="accommodation_size" v-model="form.accommodation_size" class="form-input mt-1 block w-full"
                         type="text"/>
                  <InputError :message="errors?.accommodation_size"/>
                </div>

                <div v-if="isStr" class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="entrance_code">
                    Entrance Code</label>
                  <input id="entrance_code" v-model="form.entrance_code" class="form-input mt-1 block w-full"
                         type="text"/>
                  <InputError :message="errors?.entrance_code"/>
                </div>

                <div v-if="isStr" class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="supply_closet_location">
                    Supply Closet Location</label>
                  <input id="supply_closet_location" v-model="form.supply_closet_location" class="form-input mt-1 block w-full"
                         type="text"/>
                  <InputError :message="errors?.supply_closet_location"/>
                </div>

                <div v-if="isStr" class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="supply_closet_code">
                    Supply Closet Code/Key Location</label>
                  <input id="supply_closet_code" v-model="form.supply_closet_code" class="form-input mt-1 block w-full"
                         type="text"/>
                  <InputError :message="errors?.supply_closet_code"/>
                </div>

                <div v-if="isStr" class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="check_in_time">
                    Check In Time</label>
                  <input id="check_in_time" v-model="form.check_in_time" class="form-input mt-1 block w-full" type="text"/>
                  <InputError :message="errors?.check_in_time"/>
                </div>

                <div v-if="isStr" class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="check_out_time">
                    Check Out Time</label>
                  <input type="text" id="check_out_time" v-model="form.check_out_time" class="form-input mt-1 block w-full"/>
                  <InputError :message="errors?.check_out_time"/>
                </div>

                <div class="col-span-2 mt-2">
                  <h3 class="text-base font-medium text-gray-900 my-1">Address</h3>
                </div>

                <div class="col-span-2 lg:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="address_line_1">Address Line
                    1</label>
                  <textarea id="address_line_1" v-model="form.address_line_1" class="form-textarea mt-1 block w-full"
                            rows="2"></textarea>
                  <InputError :message="errors?.address_line_1"/>
                </div>

                <div class="col-span-2 lg:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="address_line_2">Address Line
                    2</label>
                  <textarea id="address_line_2" v-model="form.address_line_2" class="form-textarea mt-1 block w-full"
                            rows="2"></textarea>
                  <InputError :message="errors?.address_line_2"/>
                </div>

                <div class="col-span-2 lg:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="zip_code">Zip Code</label>
                  <input id="zip_code" v-model="form.zip_code" class="form-input mt-1 block w-full" type="text"/>
                  <InputError :message="errors?.zip_code"/>
                </div>

                <div class="col-span-2 lg:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="phone">City</label>
                  <input id="city" v-model="form.city" class="form-input mt-1 block w-full" type="text"/>
                  <InputError :message="errors?.city"/>
                </div>

                <div class="col-span-2 lg:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="state">State</label>
                  <input id="state" v-model="form.state" class="form-input mt-1 block w-full" type="text"/>
                  <InputError :message="errors?.state"/>
                </div>

                <div class="col-span-2 lg:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="country">Country</label>
                  <vSelect id="country" v-model="form.country" :options="countries" :reduce="country => country.country_name"
                           class="mt-1 block w-full" label="country_name"></vSelect>
                  <InputError :message="errors?.country"/>
                </div>

                <div class="col-span-2 mt-2">
                  <h3 class="text-base font-medium text-gray-900 my-1">More Detail</h3>
                </div>

              </div>

              <div v-if="isStr" class="grid grid-cols-3 md:gap-x-4">

                <div class="col-span-3 md:col-span-1 mt-2">
                  <label class="inline-flex items-center mb-2 mr-3">
                    <CheckBox v-model="form.pets_allowed" :checked="form.pets_allowed" class="form-checkbox"
                              name="pets_allowed"/>
                    <span class="inline-block	ml-2">Pets Allowed</span>
                  </label>
                </div>

                <div class="col-span-3 md:col-span-1 mt-2">
                  <label class="inline-flex items-center mb-2 mr-3">
                    <CheckBox v-model="form.laundry_needed" :checked="form.laundry_needed" class="form-checkbox"
                              name="laundry_needed"/>
                    <span class="inline-block	ml-2">Laundry Needed</span>
                  </label>
                </div>

                <div class="col-span-3 md:col-span-1 mt-2">
                  <label class="inline-flex items-center mb-2 mr-3">
                    <CheckBox v-model="form.washer_dryer_on_site" :checked="form.washer_dryer_on_site" class="form-checkbox"
                              name="washer_dryer_on_site"/>
                    <span class="inline-block	ml-2">Washer Dryer On Site</span>
                  </label>
                </div>

              </div>

              <div class="mt-2">
                <label class="block font-medium text-sm text-gray-700" for="notes">Notes</label>
                <textarea id="notes" v-model="form.notes" class="form-textarea mt-1 block w-full" rows="3"></textarea>
                <InputError :message="errors?.notes"/>
              </div>

              <div class="col-span-2 mt-6">
                <h3 class="text-base font-medium text-gray-900 my-1">Reference Photos</h3>
              </div>

              <div class="mt-2">
                <FilePond ref="pondEl" :allow-multiple="true"
                          accepted-file-types="image/jpg, image/jpeg, image/png"
                          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>' max-file-size="2MB" name="image"
                          @init="handleFilePondInit" @processfile="handleProcessedFile"/>
              </div>

              <div v-if="isStr"  class="mt-2">
                <label class="block font-medium text-sm text-gray-700" for="ical_url">
                  ICal Link</label>
                <input id="ical_url" v-model="form.ical_url" class="form-input mt-1 block w-full" type="text"/>
                <InputError :message="errors?.ical_url"/>
              </div>

              <input type="hidden" name="attachments">

            </div>
            <div class="px-6 pb-4 text-right">
              <button :processing="processing" class="ml-2 btn btn-primary" type="submit">Save</button>
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
import DateTimePicker from '@/Components/Common/DateTimePicker'
import CheckBox from '@/Components/Common/CheckBox'
import { reactive, ref, inject, onMounted } from 'vue'
import vueFilePond, { setOptions } from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { Inertia } from '@inertiajs/inertia'
import vSelect from 'vue-select'
import moment from 'moment'
import axios from 'axios';
import findIndex from 'lodash/findIndex';
import { SwitchComponent as EjsSwitch } from "@syncfusion/ej2-vue-buttons";
import { enableRipple } from '@syncfusion/ej2-base';
import { Switch } from '@headlessui/vue';

defineProps({
  errors: Object,
  offices: Array,
  hosts: Array,
  countries: Array
})

// enableRipple(true);

const processing = ref(false)
const iCalFileElm = ref(null)
const cleaners = ref([])
const attachments = ref([])
const isStr = ref(false)
const recurringType = ref(false)

const recurringTypeList = ref([
        { id: 1, name: "Weekly"},
        { id: 2, name: "Bi-Weekly"},
        { id: 3, name: "Monthly"},
      ]) 

let refreshEventsHook = () => {
}
let serverMessage = {};
const pondEl = ref(null)
const handleFilePondInit = () => {
}
const handleProcessedFile = (error, file) => {
  if (!error) {
    refreshEventsHook()
    attachments.value.push(JSON.parse(file.serverId))
  }
}

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginImagePreview
)

const form = reactive({
  office_id: null,
  host_id: null,
  name: '',
  address_line_1: '',
  address_line_2: '',
  zip_code: '',
  city: '',
  state: '',
  country: 'United States',
  beds: 1,
  baths: 1,
  accommodation_size: '',
  price: '',
  entrance_code: '',
  supply_closet_location: '',
  supply_closet_code: '',
  check_in_time: '',
  check_out_time: '',
  notes: '',
  ical_url: '',
  pets_allowed: false,
  laundry_needed: false,
  washer_dryer_on_site: false,
  attachments: [],
  start: '',
  recurring: '',
  square_feet: ''
})
const range = ref([...Array(11).keys()])
const bathRange = ref([...Array.from({length: 19}, (_, i) => i * 0.5 + 1)]);

const toast = inject('toast')

const validatePrice = (event) => {
  const code = (event.keyCode ? event.keyCode : event.which)
  if ((code < 48 && code !== 8 && code !== 46)
    || (code > 57 && code !== 190) || (code === 190 && form.price.indexOf('.') !== -1)) {
    event.preventDefault()
  }
}

const prevOfficeId = ref(null);
const loadCleaners = async () => {
  if (!form.office_id) return;

  const response = await axios.get(route('cleaner-by-office', form.office_id));
  cleaners.value = response.data;

  if (form.office_id != prevOfficeId.value) {
    form.primary_cleaner_id = null;
    form.secondary_cleaner_id = null;
    prevOfficeId.value = form.office_id;
  }
}

const submit = () => {
  if(!recurringType.value) {
    form.recurring = 0
    form.start = new Date();
  }
  form.name = form.name || 'need';
  form.price = form.price || 0;
  form.accommodation_size = form.accommodation_size || 0;
  form.entrance_code = form.entrance_code || 0;
  form.square_feet = form.square_feet || 'need';
  form.address_line_1 = form.address_line_1 || 'need';
  form.zip_code = form.zip_code || 'need';
  form.city = form.city || 'need';
  form.state = form.state || 'need';
  form.price_paying_cleaning = form.price_paying_cleaning || 0;
  form.ical_url = form.ical_url || 'need';
  form.attachments = attachments;

  Inertia.post(route('properties.store'), form, {
    onStart: () => {
      processing.value = true
    },
    onFinish: () => {
      processing.value = false
    }
  })
}

onMounted(() => {
  setOptions({
    files: [],
    server: {
      load: (source, load, error, progress, abort, headers) => {
        const req = new Request(source);
        fetch(req).then(function (response) {
          response.blob().then(function (img) {
            load(img)
          })
        })
      },
      process: {
        url: route('properties.upload-image', 0), // There is no property id, use zero instead
        onerror: (response) => {
          serverMessage = JSON.parse(response)
        },
        headers: {
          'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf_token"]').content
        }
      },
      revert: (uniqueId, load, error) => {
        const file = JSON.parse(uniqueId)
        const fileIndex = findIndex(attachments, {url: file.url})
        if (fileIndex === -1) {
          error('Invalid file url')
        }
        attachments.splice(fileIndex, 1)
      },
      remove: (source, load, error) => {
        console.log(source);
        const fileIndex = findIndex(attachments, {url: source})
        if (fileIndex === -1) {
          error('Invalid file url')
        }
        attachments.value.splice(fileIndex, 1)
      },
    },
    labelFileProcessingError: () => {
      return serverMessage.error
    }
  });
})
</script>

<!-- <style>
  @import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
  @import "../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
</style> -->
