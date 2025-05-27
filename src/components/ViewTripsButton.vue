<!-- src/components/ViewTripsButton.vue -->
<template>
    <div class="viewTripsButton">
        <MyButton
            label="View Trips"
            icon="upload"
            trailingicon="check"
            appearance="secondary"
            variant="outlined"
            width="full-width"
            :loading="loading"
            :disabled="loading"
            data-test="viewTripsTable"
            @click="handleTrips"
        />
    </div>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MyButton from './MyButton.vue'
import { useTripsState } from "../stores/useTripsState.ts";
import { API_BASE_URL } from '../apiEndpoint.ts'

const { setTrips, trips } = useTripsState()
const loading = ref(false)

async function handleTrips() {
  loading.value = true
  try {
    const response = await fetch(`${API_BASE_URL}/trips`)
    console.log('Fetching trips from:333', `${API_BASE_URL}/trips`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const data = await response.json()
    setTrips(data) // update global store
    alert('Trips fetched successfully!')
    console.log('Fetched trips:', trips.value)
  } catch (error) {
    console.error('Error fetching trips:', error)
    alert('Failed to fetch trips')
  } finally {
    loading.value = false
  }
}
</script>

<style>
    .viewTripsButton{
        margin: 20px;
    }
</style>

