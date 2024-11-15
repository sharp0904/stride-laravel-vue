<template>

  <Head title="Dashboard"/>
  <AppLayout>
    <div class="bg-white rounded shadow">
      <div class="px-6 py-3">
        <h3 class="text-lg font-medium text-gray-900 mb-2 lg:mb-0 text-left">Dashboard</h3>
      </div>
      <div class="border-t border-gray-200 p-4">
        <div class="md:flex items-center justify-end">
          <div class="flex items-center mb-3 md:mb-0">
            <label class="flex items-center cursor-pointer mr-2">
              <input v-model="reportType" class="form-radio mr-2" name="graph-type" type="radio" value="daily"/>
              <span class="inline-block pt-1">Daily</span>
            </label>
            <label class="flex items-center cursor-pointer mr-2">
              <input v-model="reportType" class="form-radio mr-2" name="graph-type" type="radio" value="weekly"/>
              <span class="inline-block pt-1">Weekly</span>
            </label>
            <label class="flex items-center cursor-pointer md:mr-2">
              <input v-model="reportType" class="form-radio mr-3" name="graph-type" type="radio" value="monthly"/>
              <span class="inline-block pt-1">Monthly</span>
            </label>
          </div>
          <div class="flex items-center justify-between">
            <Datepicker v-model="date" :autoApply="true" :clearable="false" format="yyyy-MM-dd"/>
            <Link :href="route('dashboard', {'type': reportType, date: date})" class="btn btn-primary ml-3">
              Search
            </Link>
          </div>
        </div>
        <div class="text-left mt-5 bg-gray-100 text-xl p-5">
          <p><span class="text-blue-600 text-2xl">{{ totalJobs }}</span> of  cleans</p>
        </div>
        <div class="text-left mt-5 bg-gray-100 text-xl p-5">
          <p><span class="text-blue-600 text-2xl">{{ completedJobs }}</span> of completed cleans and <span class="text-blue-600 text-2xl">{{ uncompletedJobs }}</span> of uncompleted cleans</p>
        </div>
        <div class="text-left mt-5 bg-gray-100 text-xl p-5">
          <p>Revenue : <span class="text-blue-600 text-2xl">{{ revenue }}</span></p>
        </div>
        <!-- <BarChart v-bind="barChartProps" /> -->
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '@/Layouts/AppLayout'
import { BarChart, useBarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { watch, ref } from 'vue'
import moment from 'moment'

Chart.register(...registerables)

const props = defineProps({
  chart_data: Object,
  type: String,
  date: String,
  totalJobs: Number,
  completedJobs: Number,
  uncompletedJobs: Number
})

const reportType = ref(props.type)
const selectedDate = new Date(props.date.replace(/-/g, '/'))
const date = ref(selectedDate)
const formatted_date = ref(props.date)
// const revenue = []
const totalJobs = ref(props.totalJobs)
const completedJobs = ref(props.completedJobs)
const uncompletedJobs = ref(props.uncompletedJobs)
const revenue = 0

// Object.keys(props.chart_data.revenue).forEach(r => {
//   const amount = props.chart_data.revenue[r].revenue
//   const jobs = props.chart_data.revenue[r].jobs
//   revenue.push(amount)
//   averageRevenue.push(jobs > 0 ? amount / jobs : 0)
//   totalJobs.push(jobs)
// })

// watch(() => date.value, (val) => {
//   if (val) {
//     formatted_date.value = moment(val).format('YYYY-MM-DD')
//   }
// })

// const chartData = {
//   labels: props.chart_data.labels,
//   datasets: [
//     {
//       label: 'Revenue',
//       data: revenue,
//       backgroundColor: '#123E6B'
//     },
//     {
//       label: 'Average Revenue',
//       data: averageRevenue,
//       backgroundColor: '#4a6bdc'
//     },
//     {
//       label: 'Completed Jobs',
//       data: totalJobs,
//       backgroundColor: '#00b54b'
//     }
//   ],
// }

// const {barChartProps} = useBarChart({
//   chartData,
//   options: {
//     plugins: {
//       title: {
//         display: true,
//         text: 'Revenue'
//       },
//     },
//     interaction: {
//       intersect: false,
//       mode: 'index',
//     },
//     responsive: true,
//     scales: {
//       x: {
//         stacked: true,
//       },
//       y: {
//         stacked: true
//       }
//     }
//   }
// })

</script>
