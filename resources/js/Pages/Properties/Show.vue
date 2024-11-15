<template>

  <Head :title="property.name" />
  <AppLayout>
    <div class="bg-white rounded shadow">
      <div class="md:flex md:items-center md:justify-between px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900 mb-2 lg:mb-0 text-left">
          Property Detail -
          <label class="badge badge-default">{{ property.name }}</label>
        </h3>
        <div>
          <Link class="btn btn-primary mr-2" :href="route('hosts.show', property.host.id)" as="button">View Host</Link>
          <Link class="btn btn-primary mr-2" :href="route('properties.index')" as="button">View All Properties</Link>
        </div>
      </div>
      <div class="pb-2 border-t px-6 py-4">
        <div class="grid grid-cols-2 lg:gap-x-4">

          <div class="col-span-2 mb-2">
            <div class="flex items-center">
              <p class="w-64">Account Number:</p>
              <p>{{ property.property_number }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Client:</p>
              <p>{{ `${property.host.first_name} ${property.host.last_name}` }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Office:</p>
              <p>{{ property.office.name }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Property Name:</p>
              <p>{{ property.name }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Price:</p>
              <p>{{ formatCurrency(property.price) }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Bedrooms:</p>
              <p>{{ property.beds }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Bathrooms:</p>
              <p>{{ property.baths }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Accommodation Size:</p>
              <p>{{ property.accommodation_size }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Entrance Code:</p>
              <p>{{ property.entrance_code }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Supply Closet Location:</p>
              <p>{{ property.supply_closet_location }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Supply Closet Code/Key Location:</p>
              <p>{{ property.supply_closet_code }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Check In Time:</p>
              <p>{{ property.check_in_time }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Check Out Time:</p>
              <p>{{ property.check_out_time }}</p>
            </div>
          </div>

          <div class="col-span-2">
            <h3 class="text-base font-medium text-gray-900 mb-1">Address</h3>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Address Line 1:</p>
              <p>{{ property.address_line_1 }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Address Line 2:</p>
              <p>{{ property.address_line_2 !== 'null' ? property.address_line_2 : '-' }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Zip Code:</p>
              <p>{{ property.zip_code }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">City:</p>
              <p>{{ property.city }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">State:</p>
              <p>{{ property.state }}</p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Country:</p>
              <p>{{ property.country }}</p>
            </div>
          </div>

          <div class="col-span-2">
            <h3 class="text-base font-medium text-gray-900 mb-1">More Detail</h3>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Pets Allowed:</p>
              <p>
                <label class="badge" :class="[property.pets_allowed ? 'badge-success' : 'badge-danger']">
                  {{ property.pets_allowed ? 'Yes' : 'No' }}
                </label>
              </p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Laundry Needed:</p>
              <p>
                <label class="badge" :class="[property.laundry_needed ? 'badge-success' : 'badge-danger']">
                  {{ property.laundry_needed ? 'Yes' : 'No' }}
                </label>
              </p>
            </div>
          </div>

          <div class="col-span-2 lg:col-span-1 mb-2">
            <div class="flex items-center">
              <p class="w-64">Washer/Dryer On Site:</p>
              <p>
                <label class="badge" :class="[property.washer_dryer_on_site ? 'badge-success' : 'badge-danger']">
                  {{ property.washer_dryer_on_site ? 'Yes' : 'No' }}
                </label>
              </p>
            </div>
          </div>

          <div class="col-span-2 mb-2">
            <div class="flex items-center">
              <p class="w-64">Notes:</p>
              <p>{{ property.notes }}</p>
            </div>
          </div>

          <div v-if="property && property.attachments.length > 0" class="mb-2">
            <h3 class="font-semibold text-gray-800 mt-2">Reference Photos</h3>
            <div class="grid grid-cols-3 gap-2 justify-evenly mt-4">
              <div v-for="attachment in property.attachments" :key="attachment.id">
                <img :alt="attachment.file_name" :src="attachment.url" class="w-full h-full object-cover rounded"/>
              </div>
            </div>
          </div>

          <div class="col-span-2 mb-2">
            <div class="flex items-center">
              <p class="w-64">ICal Url:</p>
              <a class="ical-link" v-if="property.ical_link" v-bind:href="property.ical_link" target="_blank">Click here to download</a>
              <p class="ical-no-link" v-if="!property.ical_link">No links have been uploaded.</p>
            </div>
          </div>
        </div>

        <div class="px-6 pb-4 text-right">
          <Link class="btn btn-primary mr-2" :href="route('properties.edit', property.id)" v-if="hasAnyPermission('update-properties')" as="button">Edit</Link>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout'
import { formatCurrency } from '@/utils'
import { inject } from "vue";

const hasAnyPermission = inject('hasAnyPermission')

defineProps({
  property: Object,
  primaryCleaner: Object,
  secondaryCleaner: Object
})

</script>
<style>
.ical-link:link, .ical-link:visited {
  background-color: darkgreen;
  color: white;
  padding: 5px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
}

.ical-link:hover, .ical-link:active {
  background-color: green;
}

.ical-no-link {
  color: red;
}
</style>
