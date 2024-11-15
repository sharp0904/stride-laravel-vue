<template>
  <modal :show="show" @close="closeModal()">
    <template #title> Checklists </template>
    <template #content>
      <form @submit.prevent="submit($event)">
        <div class="px-6 py-4">
          <div class="mt-2">
            <label class="block font-medium text-sm text-gray-700" for="property_id">Property: </label>
            {{ event.value.extendedProps.property.name || '' }}
          </div>
          <div class="grid grid-cols-2 w-full mt-2">
            <div class="col-span-2 lg:col-span-1 mt-2">
              <label class="block font-medium text-sm text-gray-700" for="property_id">Start: </label>
              {{ formatDate(new Date(event.value.extendedProps.start_time)) }}
            </div>
            <div class="col-span-2 lg:col-span-1 mt-2">
              <label class="block font-medium text-sm text-gray-700" for="property_id">End: </label>
              {{ formatDate(new Date(event.value.extendedProps.end_time)) }}
            </div>
          </div>

          <div class="font-extrabold text-xl mt-4">Cleaning</div>
          <div class="font-bold mt-4">Beginning Walkthrough</div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="begin_check_damage" v-model="form.begin_check_damage" />
            <label for="begin_check_damage">Check for any damages, tears or stains throughout the property- report if necessary.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="begin_personal_belongings" v-model="form.begin_personal_belongings" />
            <label for="begin_personal_belongings">Make sure no personal belongings were left behind.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="begin_temperature" v-model="form.begin_temperature" />
            <label for="begin_temperature">Set thermostats to the agreed-upon temperature for an empty house or an upcoming arrival if told to do so.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="begin_washing_linen" v-model="form.begin_washing_linen" />
            <label for="begin_washing_linen">Begin the first load of washing linens as this is what takes the longest.</label>
          </div>

          <div class="font-bold mt-4">Kitchen</div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="kitchen_dishwasher" v-model="form.kitchen_dishwasher" />
            <label for="kitchen_dishwasher">Load, run, and empty dishwasher.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="kitchen_leftover_food" v-model="form.kitchen_leftover_food" />
            <label for="kitchen_leftover_food">Discard any leftover food.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="kitchen_trash" v-model="form.kitchen_trash" />
            <label for="kitchen_trash">Remove trash and recyclables; clean and sanitize trash can and replace trash bags.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="kitchen_clean_disinfect" v-model="form.kitchen_clean_disinfect" />
            <label for="kitchen_clean_disinfect">Clean and disinfect counters, cabinets, tables, and chairs.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="kitchen_backsplashes" v-model="form.kitchen_backsplashes" />
            <label for="kitchen_backsplashes">Clean, scrub, and sanitize sinks and backsplashes.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="kitchen_appliances" v-model="form.kitchen_appliances" />
            <label for="kitchen_appliances">Clean and disinfect appliances.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="kitchen_freezer" v-model="form.kitchen_freezer" />
            <label for="kitchen_freezer">Empty and clean interior and exterior of refrigerator and freezer.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="kitchen_floor" v-model="form.kitchen_floor" />
            <label for="kitchen_floor">Sweep and mop the floor.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="kitchen_towels" v-model="form.kitchen_towels" />
            <label for="kitchen_towels">Refill soap dispenser and restock paper towels if needed.</label>
          </div>

          <div class="font-bold mt-4">Bedrooms</div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="bedrooms_sheets_pillowcases" v-model="form.bedrooms_sheets_pillowcases" />
            <label for="bedrooms_sheets_pillowcases">Change sheets and pillowcases.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="bedrooms_floor_beds" v-model="form.bedrooms_floor_beds" />
            <label for="bedrooms_floor_beds">Vacuum floor and under beds.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="bedrooms_trash" v-model="form.bedrooms_trash" />
            <label for="bedrooms_trash">Remove trash and clean trash cans.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="bedrooms_mirrors" v-model="form.bedrooms_mirrors" />
            <label for="bedrooms_mirrors">Dust furniture, ceiling fans, blinds, and clean mirrors as needed.</label>
          </div>

          <div class="font-bold mt-4">Living room</div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="livingroom_tv" v-model="form.livingroom_tv" />
            <label for="livingroom_tv">Clean and disinfect TVs and remotes.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="livingroom_floors" v-model="form.livingroom_floors" />
            <label for="livingroom_floors">Sweep, vacuum, and mop floors as needed.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="livingroom_cushions_couches" v-model="form.livingroom_cushions_couches" />
            <label for="livingroom_cushions_couches">Clean under cushions and couches for debris and other items.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="livingroom_pillows_blankets" v-model="form.livingroom_pillows_blankets" />
            <label for="livingroom_pillows_blankets">Straighten and stage decor like pillows and blankets.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="livingroom_games_movies" v-model="form.livingroom_games_movies" />
            <label for="livingroom_games_movies">Make sure all games, movies, and books are organized.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="livingroom_furniture" v-model="form.livingroom_furniture" />
            <label for="livingroom_furniture">Dust and clean furniture, blinds, picture frames, ceiling fans, and lamps Wipe interior of windows and sliding glass doors as needed.</label>
          </div>

          <div class="font-bold mt-4">Bathrooms</div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="bathrooms_backsplashes" v-model="form.bathrooms_backsplashes" />
            <label for="bathrooms_backsplashes">Clean, scrub, disinfect, and sanitize showers, bathtubs, vanity, sink, and backsplashes.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="bathrooms_mirrors" v-model="form.bathrooms_mirrors" />
            <label for="bathrooms_mirrors">Wipe and clean mirrors.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="bathrooms_toilets" v-model="form.bathrooms_toilets" />
            <label for="bathrooms_toilets">Clean and sanitize toilets- interior and exterior.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="bathrooms_trash" v-model="form.bathrooms_trash" />
            <label for="bathrooms_trash">Remove trash and clean trash cans.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="bathrooms_soap" v-model="form.bathrooms_soap" />
            <label for="bathrooms_soap">Replenish soap if needed.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="bathrooms_toilet_paper" v-model="form.bathrooms_toilet_paper" />
            <label for="bathrooms_toilet_paper">Replenish toilet paper if needed.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="bathrooms_drawers_cabinets" v-model="form.bathrooms_drawers_cabinets" />
            <label for="bathrooms_drawers_cabinets">Clean out drawers and cabinets as needed.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="bathrooms_floors" v-model="form.bathrooms_floors" />
            <label for="bathrooms_floors">Sweep and mop floors as needed</label>
          </div>

          <div class="font-bold mt-4">End of Cleaning Walkthrough</div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="end_walkthrough_check_in_ready" v-model="form.end_walkthrough_check_in_ready" />
            <label for="end_walkthrough_check_in_ready">Ensure everything is check-in ready and all cleaning supplies are picked up and taken.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="end_walkthrough_submit_photos" v-model="form.end_walkthrough_submit_photos" />
            <label for="end_walkthrough_submit_photos">Take and submit photos of required areas including kitchen, living area, all bathrooms and all bedrooms.</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="end_walkthrough_trash_doors" v-model="form.end_walkthrough_trash_doors" />
            <label for="end_walkthrough_trash_doors">Make sure all trash is taken out and doors are locked.</label>
          </div>

          <div class="font-extrabold text-xl mt-4">Inventory</div>
          <div class="font-bold mt-4">Kitchen</div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="inventory_kitchen_garbage" v-model="form.inventory_kitchen_garbage" />
            <label for="inventory_kitchen_garbage">Garbage bags</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="inventory_kitchen_paper_towels" v-model="form.inventory_kitchen_paper_towels" />
            <label for="inventory_kitchen_paper_towels">Paper Towels</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="inventory_kitchen_hand_soap" v-model="form.inventory_kitchen_hand_soap" />
            <label for="inventory_kitchen_hand_soap">Hand Soap</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="inventory_kitchen_dishwasher_pods" v-model="form.inventory_kitchen_dishwasher_pods" />
            <label for="inventory_kitchen_dishwasher_pods">Dishwasher Pods</label>
          </div>

          <div class="font-bold mt-4">Bathrooms</div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="inventory_bathrooms_hand_soap" v-model="form.inventory_bathrooms_hand_soap" />
            <label for="inventory_bathrooms_hand_soap">Hand Soap</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="inventory_bathrooms_toilet_paper" v-model="form.inventory_bathrooms_toilet_paper" />
            <label for="inventory_bathrooms_toilet_paper">Toilet Paper</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="inventory_bathrooms_shampoo" v-model="form.inventory_bathrooms_shampoo" />
            <label for="inventory_bathrooms_shampoo">Shampoo & Conditioner</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="inventory_bathrooms_body_wash" v-model="form.inventory_bathrooms_body_wash" />
            <label for="inventory_bathrooms_body_wash">Body Wash</label>
          </div>

          <div class="font-bold mt-4">Misc.</div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="inventory_misc_laundry" v-model="form.inventory_misc_laundry" />
            <label for="inventory_misc_laundry">Laundry Detergent</label>
          </div>

          <div class="font-bold text-xl mt-4">Photos</div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="photos_bathroom" v-model="form.photos_bathroom" />
            <label for="photos_bathroom">Each Bathroom</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="photos_bedroom" v-model="form.photos_bedroom" />
            <label for="photos_bedroom">Each Bedroom</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="photos_living_room" v-model="form.photos_living_room" />
            <label for="photos_living_room">Living Room</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="photos_kitchen" v-model="form.photos_kitchen" />
            <label for="photos_kitchen">Kitchen</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="photos_fridge" v-model="form.photos_fridge" />
            <label for="photos_fridge">Fridge (interior)</label>
          </div>
          <div class="flex w-full mt-2 gap-2">
            <input type="checkbox" id="photos_microwave" v-model="form.photos_microwave" />
            <label for="photos_microwave">Microwave (interior)</label>
          </div>
        </div>
        <div class="flex px-6 py-4 bg-gray-100 justify-end">
          <button v-if="hasAnyPermission('update-appointments')" :disabled="processing"
                  class="ml-2 btn btn-primary" type="submit">Save
          </button>
        </div>
      </form>
    </template>
  </modal>
</template>
<script setup>
import Modal from '@/Components/Common/Modal.vue';
import { inject, onMounted, onUnmounted, reactive, ref } from 'vue';
import axios from "axios";

const show = ref(false);
const event = ref(null);
const isEditable = ref(false);
const emitter = inject('emitter');
const hasAnyPermission = inject('hasAnyPermission');
const processing = ref(false);
const errors = ref({});

const form = reactive({
  begin_check_damage: false,
  begin_personal_belongings: false,
  begin_temperature: false,
  begin_washing_linen: false,
  kitchen_dishwasher: false,
  kitchen_leftover_food: false,
  kitchen_trash: false,
  kitchen_clean_disinfect: false,
  kitchen_backsplashes: false,
  kitchen_appliances: false,
  kitchen_freezer: false,
  kitchen_floor: false,
  kitchen_towels: false,
  bedrooms_sheets_pillowcases: false,
  bedrooms_floor_beds: false,
  bedrooms_trash: false,
  bedrooms_mirrors: false,
  livingroom_tv: false,
  livingroom_floors: false,
  livingroom_cushions_couches: false,
  livingroom_pillows_blankets: false,
  livingroom_games_movies: false,
  livingroom_furniture: false,
  bathrooms_backsplashes: false,
  bathrooms_mirrors: false,
  bathrooms_toilets: false,
  bathrooms_trash: false,
  bathrooms_soap: false,
  bathrooms_toilet_paper: false,
  bathrooms_drawers_cabinets: false,
  bathrooms_floors: false,
  end_walkthrough_check_in_ready: false,
  end_walkthrough_submit_photos: false,
  end_walkthrough_trash_doors: false,
  inventory_kitchen_garbage: false,
  inventory_kitchen_paper_towels: false,
  inventory_kitchen_hand_soap: false,
  inventory_kitchen_dishwasher_pods: false,
  inventory_bathrooms_hand_soap: false,
  inventory_bathrooms_toilet_paper: false,
  inventory_bathrooms_shampoo: false,
  inventory_bathrooms_body_wash: false,
  inventory_misc_laundry: false,
  photos_bathroom: false,
  photos_bedroom: false,
  photos_living_room: false,
  photos_kitchen: false,
  photos_fridge: false,
  photos_microwave: false
});

const showModal = (args) => {
  event.value = args.event || null
  isEditable.value = false

  loadChecklists()
  show.value = true
}

const closeModal = () => {
  show.value = false;
}

onMounted(() => {
  emitter.on('showChecklistsModal', showModal)
})

onUnmounted(() => {
  emitter.off('showChecklistsModal', showModal)
})

const submit = (evt) => {
  evt.preventDefault();
  processing.value = true;
  axios.post(route('appointments.save-checklists', event.value.value.id), form)
    .then(response => {
      processing.value = false
      closeModal()
      toast.fire({
        icon: 'success',
        title: response.data.message
      })
    }).catch(err => {
      processing.value = false
      errors.value = err.response.data.errors
    });
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

const loadChecklists = async () => {
  if (!event.value) return;

  const response = await axios.get(route('appointments.checklists', event.value.value.id));
  const checklists = response.data;

  // Initialize all checks to false.
  Object.keys(form).forEach(key => {
    form[key] = false;
  });

  // Update form based on checklists
  if (Object.keys(checklists).length !== 0) {
    Object.keys(form).forEach(key => {
      form[key] = checklists[key] ? true : false;
    });
  }
}
</script>
