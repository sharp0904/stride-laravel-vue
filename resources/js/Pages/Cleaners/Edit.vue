<template>

  <Head title="Update Cleaner" />
  <AppLayout>
    <div class="bg-white rounded shadow">
      <div class="flex items-center justify-between px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900">Update Cleaner</h3>
        <Link class="btn btn-default" :href="route('cleaners.index')" as="button">Back</Link>
      </div>
      <div class="border-t">
        <div class="max-w-3xl mx-auto">
          <form @submit.prevent="submit">
            <div class="px-6 py-4">
              <div class="grid grid-cols-2 gap-0 lg:gap-4">
                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700 required" for="firstName">First Name</label>
                  <input id="firstName" type="text" class="form-input mt-1 block w-full" v-model="form.first_name"
                         autofocus />
                  <InputError :message="errors?.first_name" />
                </div>

                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700 required" for="lastName">Last Name</label>
                  <input id="lastName" type="text" class="form-input mt-1 block w-full" v-model="form.last_name" />
                  <InputError :message="errors?.last_name" />
                </div>

                <div class="mt-2">
                  <label class="block font-medium text-sm text-gray-700 required" for="email">Email</label>
                  <input id="email" type="email" class="form-input mt-1 block w-full" v-model="form.email" />
                  <InputError :message="errors?.email" />
                </div>

                <div class="mt-2">
                  <label class="block font-medium text-sm text-gray-700 required" for="phone">Phone Number</label>
                  <input id="phone" type="text" class="form-input mt-1 block w-full" v-model="form.phone_number" />
                  <InputError :message="errors?.phone_number" />
                </div>

                <div class="col-span-2 md:col-span-1 mt-2">
                  <label class="block font-medium text-sm text-gray-700 required"
                         for="office">Region</label>
                  <vSelect id="region" v-model="form.region_id" :options="regions" :reduce="region => region.id"
                           class="mt-1 block w-full" label="name" @update:modelValue="loadOffices" autofocus></vSelect>
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

              <div class="col-span-2 mt-6">
                <label class="block font-medium text-sm text-gray-700" for="phone">Company's Agreement</label>
                <FilePond ref="pondAgreement" :allow-multiple="true" id="pond_agreement"
                          :files="generateFilePondFiles(props.cleaner.agreements)"
                          :server="generateFilePondServer('agreement', props.cleaner.agreements)"
                          :labelFileProcessingError="serverMessage.error"
                          accepted-file-types="image/jpg, image/jpeg, image/png, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain"
                          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>' max-file-size="2MB" name="pond_agreement"/>
              </div>

              <div class="col-span-2 mt-2">
                <label class="block font-medium text-sm text-gray-700" for="phone">Insurance</label>
                <FilePond ref="pondInsurance" :allow-multiple="true" id="pond_insurance"
                          :files="generateFilePondFiles(props.cleaner.insurances)"
                          :server="generateFilePondServer('insurance', props.cleaner.insurances)"
                          :labelFileProcessingError="serverMessage.error"
                          accepted-file-types="image/jpg, image/jpeg, image/png, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain"
                          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>' max-file-size="2MB" name="pond_insurance"/>
              </div>

              <div class="col-span-2 mt-2">
                <label class="block font-medium text-sm text-gray-700" for="phone">Other Documents</label>
                <FilePond ref="pondOther" :allow-multiple="true" id="pond_other"
                          :files="generateFilePondFiles(props.cleaner.others)"
                          :server="generateFilePondServer('other', props.cleaner.others)"
                          :labelFileProcessingError="serverMessage.error"
                          accepted-file-types="image/jpg, image/jpeg, image/png, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, text/plain"
                          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>' max-file-size="2MB" name="pond_other"/>
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
import { onMounted, reactive, ref } from 'vue'
import { Inertia } from '@inertiajs/inertia'
import vSelect from 'vue-select'
import axios from 'axios'
import vueFilePond, { setOptions } from 'vue-filepond'
import findIndex from 'lodash/findIndex';
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

const props = defineProps({
  errors: Object,
  cleaner: Object,
  regions: Array,
  offices: Array
})

const form = reactive({
  first_name: props.cleaner.first_name,
  last_name: props.cleaner.last_name,
  region_id: props.cleaner.office.region.id,
  office_id: props.cleaner.office_id,
  email: props.cleaner.email,
  phone_number: props.cleaner.phone_number
})

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginImagePreview
);

let serverMessage = {};
const processing = ref(false);
const offices = ref(props.offices);
const prevRegionId = ref(props.cleaner.office.region.id);

const loadOffices = async () => {
  if (!form.region_id) return;

  const response = await axios.get(`/settings/offices/region/${form.region_id}`);
  offices.value = response.data;

  if (form.region_id != prevRegionId.value) {
    form.office_id = null;
    prevRegionId.value = form.region_id;
  }
}

const generateFilePondFiles = (attachments) => {
  return attachments.map(file => {
    return {
      source: '/storage/' + file.url,
      options: { type: 'local' }
    }
  });
}

const generateFilePondServer = (routeSuffix, attachments) => {
  return {
    load: (source, load, error, progress, abort, headers) => {
      const req = new Request(source);
      fetch(req).then(function (response) {
        response.blob().then(function (img) {
          load(img)
        })
      })
    },
    process: {
      url: route(`cleaner-upload-${routeSuffix}`, props.cleaner.id),
      onerror: (response) => {
        serverMessage = JSON.parse(response)
      },
      headers: {
        'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf_token"]').content
      }
    },
    revert: (uniqueId, load, error) => {
      const file = JSON.parse(uniqueId)
      const fileIndex = findIndex(attachments, {id: file.id})
      if (fileIndex === -1) {
        error('Invalid file url')
      }
      axios.delete(route('cleaner-delete-file', file.id))
        .then((response) => {
          attachments.splice(fileIndex, 1)
          load()
        }).catch((err) => {
        toast.fire({
          icon: 'error',
          title: err.response.data.error
        })
      })
    },
    remove: (source, load, error) => {
      const fileIndex = findIndex(attachments, {url: source})
      if (fileIndex === -1) {
        error('Invalid file url')
      }
      axios.delete(route('cleaner-delete-file', attachments[fileIndex].id))
        .then((response) => {
          attachments.splice(fileIndex, 1)
          load()
        }).catch((err) => {
        console.log(err.response.data.message)
      })
    },
  };
}

const submit = () => {
  Inertia.put(route('cleaners.update', props.cleaner.id), form, {
    onStart: () => { processing.value = true },
    onFinish: () => { processing.value = false }
  })
}

onMounted(() => {
  loadOffices();
})
</script>
