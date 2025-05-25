<!-- <script setup lang="ts">
import TripsForm from './components/TripsForm.vue';

</script> -->

<!-- <template>
  <div class="horizontal">
    <span>Selected: </span>
    <Dropdown 
      v-model="selectedBus" 
      :options="busOptions" 
    />
    <ContractsDropdown
      v-model="selectedOption"
      :options="busesList"
      placeholder="Choose a contract"
      @opened="loadBusOptions"
    />
    <p>You selected: <strong>{{ selectedOption }}</strong></p>

    <Input
      v-model="form.startingkm"
      placeholder="Starting KM"
    />
    <p>Value: {{ form.startingkm }}</p>
  </div> 
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContractsDropdown from './components/ContractsDropdown.vue'
import Input from './components/Input.vue'

const selectedOption = ref<string | null>(null)
const busesList = ref<string[]>([])
const selectedBus = ref<string | null>(null)
const busOptions = ref<string[]>([])
const form = ref({
  startingkm: ''
})

async function loadBusOptions() {
  if (busesList.value.length > 0) return
  try {
    const response = await fetch('http://localhost:8080/v1/buses')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    busesList.value = data.map((bus: { id: number; busNo: string }) => bus.busNo)
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
</style> -->


<!-- <template>
  <form class="horizontal" @submit.prevent="submitForm">

    ContractsDropdown with loaded bus options
    <ContractsDropdown
      v-model="form.busNo"
      :options="busesList"
      placeholder="Choose a contract"
      @opened="loadBusOptions"
    />

    Starting KM Input
    <Input
      v-model="form.startingKm"
      placeholder="Starting KM"
      data-test="starting-km-input"
    />

    Starting KM Input
    <Input
      v-model="form.endingKm"
      placeholder="Ending KM"
      data-test="ending-km-input"
    />

    <button type="submit">Submit</button>

    <p>You selected: <strong>{{ form.busNo}}</strong></p>
    <p>Value: {{ form.startingKm }}</p>
    <p>Value: {{ form.endingKm}}</p>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import ContractsDropdown from './components/ContractsDropdown.vue'
  import Input from './components/Input.vue'

  const busesList = ref<string[]>([])
  const form = ref({
    busNo: '',
    startingKm: '',
    endingKm: ''
  })

  let hasLoaded = false

async function loadBusOptions() {
  if (hasLoaded) return
  try {
    const response = await fetch('http://localhost:8080/v1/buses')
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()
    busesList.value = data.map((bus: { id: number; busNo: string }) => bus.busNo)
    hasLoaded = true
  } catch (error) {
    console.error('Failed to fetch buses:', error)
  }
}

  async function submitForm() {
  const payload = {
    busNo: form.value.busNo,
    startingKm: form.value.startingKm,
    endingKm: form.value.endingKm
  }

  try {
    const response = await fetch('http://localhost:8080/v1/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log('Trip saved:', result)
    alert('Trip saved successfully!')
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('Failed to save trip')
  }
}



</script>

<style>
.horizontal {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px; 
}
.horizontal > * {
  width: 200px; 
}

button[type="submit"] {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button[type="submit"]:hover {
  background-color: #0056b3;
}
</style> -->

<template>
  <div class="formPage">
      <div class="formTitle">
        
      </div>
    <div class="formWrapper">
    
      <TripsForm class="form" />
    </div>
  </div>
</template>

<script setup lang="ts">
import TripsForm from './components/TripsForm.vue';
</script>

<style scoped>
.formTitle {
  text-align: center;
  margin-bottom: 20px;
}
.formPage {
  position: relative;
  min-height: max-content;
}

.formWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
