<style>
  .viewTripsByBusDiv > *{
    margin: 20px;

  }
</style>
<template>
  <div class="viewTripsByBusDiv">
    <MyDropdown
      v-model="busNo"
      :options="busNos"
      placeholder="Choose the Bus"
      @opened="loadBusOptions"
    />

    <MyDate
      v-model="startingDate"
      placeholder="Select Date"
    />
    

    <MyDate
      v-model="endingDate"
      placeholder="Select Date"
    />

    <MyButton
            label="View Trips By Bus"
            icon="upload"
            trailingicon="check"
            appearance="secondary"
            variant="outlined"
            width="full-width"
            :loading="loading"
            :disabled="loading"
            data-test="viewTripsByBusButton"
            @click="handleTripsByBus"
      />
  </div>

    <div class="mds-table--scrollable trips-table" style="width: 100%; max-height: 300px;">
    <table class="mds-table mds-table--nowrap mds-table--footer mds-table--zebra-stripes mds-table--vertical-lines-solid mds-table--header-sticky mds-table--footer-sticky mds-table--outer-border-dashed mds-table--outer-border-square-corners" tabindex="0">
      <thead>
        <tr>
          <th class="mds-table__column--sticky">Trip ID</th>
          <th>Bus No</th>
          <th class="mds-table__cell--text-center">Starting KM</th>
          <th class="mds-table__cell--number">Ending KM</th>
          <th class="mds-table__cell--number">Distance</th>  <!-- New column -->
          <th>Date</th> 
        </tr>
      </thead>
      <tbody>
        <tr v-for="trip in tripsByBus" :key="trip.id">
          <th>{{ trip.id }}</th>
          <td>{{ trip.busNo }}</td>
          <td class="mds-table__cell--text-center">{{ trip.startingKm }}</td>
          <td class="mds-table__cell--number">{{ trip.endingKm }}</td>
          <td class="mds-table__cell--number">{{ trip.endingKm - trip.startingKm }}</td> <!-- difference -->
          <td class="mds-table__cell--text-center">{{ trip.date }}</td> <!-- New column -->
        </tr>
      </tbody>
      <tfoot>
    <tr>
      <td colspan="4" class="mds-table__cell--text-right"><strong>Total Distance</strong></td>
      <td class="mds-table__cell--number"><strong>{{ totalDistance }}</strong></td>
      <td></td>
    </tr>
  </tfoot>
    </table>
  </div>


</template>

<script setup lang="ts">
import MyDropdown from './MyDropdown.vue'
import MyButton from './MyButton.vue'
import MyDate from './MyDate.vue'
import { ref , computed} from 'vue'
import { useBusesState, useTripsByBusState } from '../stores/useTripsState.ts'

const startingDate = ref('')
const endingDate = ref('')
const busNo = ref('')
const loading = ref(false)
const { busNos, setBuses } = useBusesState()
const{ tripsByBus, setTripsByBus}=useTripsByBusState()

const totalDistance = computed(() => {
  return tripsByBus.value.reduce((sum, trip) => {
    const distance = trip.endingKm - trip.startingKm
    return sum + distance
  }, 0)
})
async function handleTripsByBus() {
  if (!busNo.value) {
    alert('Please select a bus number first.')
    return
  }
  loading.value = true
  try {
    const response = await fetch(
  `http://localhost:8080/v1/trips/${encodeURIComponent(busNo.value)}?startDate=${encodeURIComponent(startingDate.value)}&endDate=${encodeURIComponent(endingDate.value)}`
)

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const data = await response.json()
    setTripsByBus(data)
    console.log("trips by bussssssssssss",tripsByBus)
    alert('Trips by bus fetched successfully!')
    console.log('Fetched trips by bus:', tripsByBus.value)
  } catch (error) {
    console.error('Error fetching trips by bus:', error)
    alert('Failed to fetch trips by bus')
  } finally {
    loading.value = false
  }
}

async function loadBusOptions() {
  if (busNos.value.length > 0) return
  try {
    const response = await fetch('http://localhost:8080/v1/buses')
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()
    setBuses(data)
    console.log('Bus list loaded:', busNos.value)
  } catch (error) {
    console.error('Failed to fetch buses:', error)
  }
}
</script>

