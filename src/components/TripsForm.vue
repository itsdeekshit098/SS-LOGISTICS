
<template>
 <div>
  <h1 class="formTitle">Trip Sheet</h1>
  <form class="horizontal" @submit.prevent="submitForm">
    <!-- ContractsDropdown with loaded bus options -->
    <ContractsDropdown
      v-model="form.busNo"
      :options="busesList"
      placeholder="Choose a contract"
      @opened="loadBusOptions"
      :class="{ 'invalid': isFieldInvalid('busNo') }"
    />

    <!-- Starting KM Input -->
    <Input
      v-model="form.startingKm"
      placeholder="Starting KM"
      data-test="starting-km-input"
      :class="{ 'invalid': isFieldInvalid('startingKm') }"
    />

    <!-- Ending KM Input -->
    <Input
      v-model="form.endingKm"
      placeholder="Ending KM"
      data-test="ending-km-input"
      :class="{ 'invalid': isFieldInvalid('endingKm') }"
    />
    <AppButton
      type="submit"
      label="Submit"
      icon="upload"
      trailingicon="check"
      appearance="secondary"
      variant="outlined"
      width="full-width"
      :loading="false"
      :disabled="false"
    />


    <p>You selected: <strong>{{ form.busNo}}</strong></p>
    <p>Value: {{ form.startingKm }}</p>
    <p>Value: {{ form.endingKm}}</p>
  </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContractsDropdown from './ContractsDropdown.vue'
import AppButton from './AppButton.vue'
import Input from './Input.vue'


const busesList = ref<string[]>([])
const form = ref({
  busNo: '',
  startingKm: '',
  endingKm: ''
})

const hasSubmitted = ref(false)

async function loadBusOptions() {
  if (busesList.value.length > 0) return
  try {
    const response = await fetch('http://localhost:8080/v1/buses')
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()
    busesList.value = data.map((bus: { id: number; busNo: string }) => bus.busNo)
  } catch (error) {
    console.error('Failed to fetch buses:', error)
  }
}

//if hassSubmitted is true and there is no value in the field, then the field is invalid and should be highlighted with a red outline
const isFieldInvalid = (field: keyof typeof form.value) => {
  return hasSubmitted.value && !form.value[field]
}

async function submitForm() {
  // Set hasSubmitted to true to trigger validation isFieldInvalid to highlight fields if they are empty
  hasSubmitted.value = true

  // Check if all required fields are filled if not no api call is made and the fields are highlighted
  if (!form.value.busNo || !form.value.startingKm || !form.value.endingKm) {
    // Form invalid - don't submit, just highlight fields
    return
  }

  const payload = {
    busNo: form.value.busNo,
    startingKm: form.value.startingKm,
    endingKm: form.value.endingKm
  }

  try {
    const response = await fetch('http://localhost:8080/v1/trips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log('Trip saved:', result)
    alert('Trip saved successfully!')

  
    console.log('Form reset after submission',isFieldInvalid('busNo'), isFieldInvalid('startingKm'), isFieldInvalid('endingKm'))
    // Optionally reset form and submission state:
    form.value = { busNo: '', startingKm: '', endingKm: '' }
    hasSubmitted.value = false
    
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('Failed to save trip')
  }
}
</script>

<style>
.formTitle {
  text-align: center;
  margin-bottom: 20px;
}
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
  background-color: rgb(0, 115, 171);
}

/* Style for invalid fields: red outline */
.invalid {
  outline: 2px solid red !important;
}
</style>
