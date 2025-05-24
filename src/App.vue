<template>
  <div class="horizontal">
    <span>Selected: </span>
    <Dropdown 
      v-model="selectedBus" 
      :options="busOptions" 
    />
    <ContractsDropdown
      v-model="selectedOption"
      :options="dynamicOptions"
      placeholder="Choose a contract"
      @opened="loadBusOptions"
    />
    <p>You selected: <strong>{{ selectedOption }}</strong></p>
  </div> 
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContractsDropdown from './components/ContractsDropdown.vue'

const selectedOption = ref<string | null>(null)
const dynamicOptions = ref<string[]>([])
const selectedBus = ref<string | null>(null)
const busOptions = ref<string[]>([]) // not populated here, just a placeholder

async function loadBusOptions() {
  if (dynamicOptions.value.length > 0) return // Skip if already loaded
  try {
    const response = await fetch('http://localhost:8080/v1/buses')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
console.log('Fetched data:', data)

    dynamicOptions.value = data.map((bus: { id: number; busNo: string }) => bus.busNo)
  } catch (error) {
    console.error('Failed to fetch buses:', error)
  }
}
</script>

<style>
.horizontal {
  display: flex;
  align-items: center;
  gap: 12px; /* spacing between label and dropdown */
}
</style>
