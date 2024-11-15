<template>

  <Head title="Calendar"/>
  <AppLayout>
    <div class="bg-white rounded shadow p-4 text-right">
      <button class="btn btn-primary mb-1" @click="addNewJob">ADD</button>
      <FullCalendar ref="calendar" :options="calendarOptions"/>
    </div>
  </AppLayout>
  <!-- Event Modal -->
  <EventModal />
  <ChecklistsModal />
  <AddJobModal />
  <AssignCleanerModal />
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import EventModal from '@/Pages/Calendar/Modals/EventModal'
import ChecklistsModal from '@/Pages/Calendar/Modals/ChecklistsModal'
import AddJobModal from '@/Pages/Calendar/Modals/AddJobModal'
import AssignCleanerModal from '@/Pages/Calendar/Modals/AssignCleanerModal'
import {ref, inject} from 'vue'
import moment from 'moment'

const emitter = inject('emitter')
const toast = inject('toast')
const hasAnyPermission = inject('hasAnyPermission')
const calendar = ref(null)
const endDate = ref(null)

const props = defineProps({
  properties: Array,
  cleaners: Array
})

const addNewJob = (event) => {
  // if(endDate.value) {
  //   emitter.emit('addNewJob', {
  //     end: moment(endDate.value).format('YYYY-MM-DD HH:mm')
  //   })
  // }
  // else {
  //   toast.fire({
  //     icon: 'error',
  //     title: 'You must select the date.'
  //   })
  //   return
  // }

  emitter.emit('addNewJob', {
    event: event
  })
  
}
``
const handleDayClick = (day) => {
  // endDate.value = day.date
  if (!hasAnyPermission('create-appointments')) {
    toast.fire({
      icon: 'error',
      title: 'You are not authorized to create appointment'
    })
    return
  }
  const selectedDate = day.date
  selectedDate.setHours(0, 0, 0, 0)
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)
  // Removed adding new appointment, so it is not necessary
  // if (selectedDate.getTime() < currentDate.getTime()) {
  //   toast.fire({
  //     icon: 'error',
  //     title: 'Please select a future date'
  //   })
  //   return
  // }
  emitter.emit('showEventModal', {
    properties: props.properties,
    cleaners: props.cleaners,
    event: null,
    start: moment(day.date).format('YYYY-MM-DD HH:mm'),
    refreshEvents: () => {
      calendar.value.getApi().refetchEvents()
    }
  })
}

const handleEventClick = ({event}) => {
  if (!hasAnyPermission(['view-appointments', 'create-appointments', 'update-appointment', 'delete-appointments'])) {
    return
  }
  emitter.emit('showEventModal', {
    event: event,
    properties: props.properties,
    cleaners: props.cleaners,
    refreshEvents: () => {
      calendar.value.getApi().refetchEvents()
    }
  })
}

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  eventOverlap: false,
  editable: false,
  selectable: true,
  dateClick: handleDayClick,
  eventClick: handleEventClick,
  displayEventTime: false,
  events: route('calendar-events'),
  eventDidMount: ({el}) => {
    const title = el.querySelector('.fc-event-title')
    title.innerHTML = title.textContent || title.innerText
  }
})
</script>
