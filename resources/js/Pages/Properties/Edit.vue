<template>

  <Head title="Update Property" />
  <AppLayout>
    <div class="bg-white rounded shadow">
      <div class="flex items-center justify-between px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900">Update Property</h3>
        <Link class="btn btn-primary" :href="route('properties.index')" as="button">List Properties</Link>
      </div>
      <div class="border-t">
        <div class="max-w-3xl mx-auto">
          <form @submit.prevent="submit">
            <div class="px-6 py-4">
              <div class="grid grid-cols-2 gap-0 md:gap-x-4">

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

                <div class="col-span-2 md:col-span-1 mt-2">
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
                  <label class="block font-medium text-sm text-gray-700" for="accommodation_size">
                    Accommodation Size</label>
                  <input id="accommodation_size" v-model="form.accommodation_size" class="form-input mt-1 block w-full"
                         type="text"/>
                  <InputError :message="errors?.accommodation_size"/>
                </div>

                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="entrance_code">
                    Entrance Code</label>
                  <input id="entrance_code" v-model="form.entrance_code" class="form-input mt-1 block w-full"
                         type="text"/>
                  <InputError :message="errors?.entrance_code"/>
                </div>

                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="supply_closet_location">
                    Supply Closet Location</label>
                  <input id="supply_closet_location" v-model="form.supply_closet_location" class="form-input mt-1 block w-full"
                         type="text"/>
                  <InputError :message="errors?.supply_closet_location"/>
                </div>

                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="supply_closet_code">
                    Supply Closet Code/Key Location</label>
                  <input id="supply_closet_code" v-model="form.supply_closet_code" class="form-input mt-1 block w-full"
                         type="text"/>
                  <InputError :message="errors?.supply_closet_code"/>
                </div>

                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700" for="check_in_time">
                    Check In Time</label>
                  <input id="check_in_time" v-model="form.check_in_time" class="form-input mt-1 block w-full" type="text"/>
                  <InputError :message="errors?.check_in_time"/>
                </div>

                <div class="col-span-2 md:col-span-1 mt-2">
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

              <div class="grid grid-cols-3 md:gap-x-4">
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

              <div v-if="property" class="mt-2">
                <FilePond ref="pondEl" :allow-multiple="true"
                          accepted-file-types="image/jpg, image/jpeg, image/png"
                          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>' max-file-size="2MB" name="image"
                          @init="handleFilePondInit" @processfile="handleProcessedFile"/>
              </div>

              <div class="mt-2">
                <label class="block font-medium text-sm text-gray-700" for="ical_url">ICal Link</label>
                <input id="ical_url" v-model="form.ical_url" class="form-input mt-1 block w-full" type="search"/>
                <InputError :message="errors?.ical_url"/>
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
import DateTimePicker from '@/Components/Common/DateTimePicker'
import CheckBox from '@/Components/Common/CheckBox'
import { reactive, ref, inject, onMounted } from 'vue'
import vueFilePond, { setOptions } from "vue-filepond"
import "filepond/dist/filepond.min.css"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { Inertia } from '@inertiajs/inertia'
import vSelect from 'vue-select'
import moment from 'moment'
import axios from "axios";
import findIndex from "lodash/findIndex";

const props = defineProps({
  errors: Object,
  property: Object,
  offices: Array,
  hosts: Array,
  countries: Array
})

const processing = ref(false)
const iCalFileElm = ref(null)
const cleaners = ref([])
const attachments = ref([])

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
  office_id: props.property.office_id,
  host_id: props.property.host_id,
  name: props.property.name,
  address_line_1: props.property.address_line_1,
  address_line_2: props.property.address_line_2 !== 'null' ? props.property.address_line_2 : '',
  zip_code: props.property.zip_code,
  city: props.property.city,
  state: props.property.state,
  country: props.property.country,
  beds: props.property.beds,
  baths: props.property.baths,
  accommodation_size: props.property.accommodation_size,
  price: props.property.price,
  entrance_code: props.property.entrance_code,
  supply_closet_location: props.property.supply_closet_location,
  supply_closet_code: props.property.supply_closet_code,
  check_in_time: props.property.check_in_time,
  check_out_time: props.property.check_out_time,
  ical_url: props.property.ical_link,
  notes: props.property.notes,
  pets_allowed: props.property.pets_allowed,
  laundry_needed: props.property.laundry_needed,
  washer_dryer_on_site: props.property.washer_dryer_on_site,
})

const range = ref([...Array(11).keys()]);
const bathRange = ref([...Array.from({length: 19}, (_, i) => i * 0.5 + 1)]);

const toast = inject('toast');

const validatePrice = (event) => {
  const code = (event.keyCode ? event.keyCode : event.which)
  if ((code < 48 && code !== 8 && code !== 46)
    || (code > 57 && code !== 190) || (code === 190 && form.price.indexOf('.') !== -1)) {
    event.preventDefault()
  }
}

const prevOfficeId = ref(props.property.office_id);
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
  form.name = form.name || 'need';
  form.price = form.price || 0;
  form.beds = form.beds || 1;
  form.baths = form.baths || 1;
  form.accommodation_size = form.accommodation_size || 0;
  form.entrance_code = form.entrance_code || 0;
  form.address_line_1 = form.address_line_1 || 'need';
  form.zip_code = form.zip_code || 'need';
  form.city = form.city || 'need';
  form.state = form.state || 'need';
  form.ical_url = form.ical_url || 'need';

  Inertia.put(route('properties.update', props.property.id), form, {
    onStart: () => { processing.value = true },
    onFinish: () => { processing.value = false }
  })
}

onMounted(() => {
  loadCleaners();
  setOptions({
    files: props.property.attachments.map(file => {
      return {
        source: file.url,
        options: { type: 'local' }
      }
    }),
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
        url: route('properties.upload-image', props.property.id),
        onerror: (response) => {
          serverMessage = JSON.parse(response)
        },
        headers: {
          'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf_token"]').content
        }
      },
      revert: (uniqueId, load, error) => {
        const file = JSON.parse(uniqueId)
        const fileIndex = findIndex(props.property.attachments, {id: file.id})
        if (fileIndex === -1) {
          error('Invalid file url')
        }
        axios.delete(route('properties.delete-image', file.id))
          .then((response) => {
            props.property.attachments.splice(fileIndex, 1)
            load()
            refreshEventsHook()
          }).catch((err) => {
          toast.fire({
            icon: 'error',
            title: err.response.data.error
          })
        })
      },
      remove: (source, load, error) => {
        const fileIndex = findIndex(props.property.attachments, {url: source})
        if (fileIndex === -1) {
          error('Invalid file url')
        }
        axios.delete(route('properties.delete-image', props.property.attachments[fileIndex].id))
          .then((response) => {
            attachments.value.splice(fileIndex, 1)
            load()
          }).catch((err) => {
          console.log(err.response.data.message)
        })
      },
    },
    labelFileProcessingError: () => {
      return serverMessage.error
    }
  });
})
</script>
