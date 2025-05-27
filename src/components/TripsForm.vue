
<template>
 <div>
  <h1 class="formTitle">Trip Sheet</h1>
  <form class="horizontal" @submit.prevent="submitForm">

    <!-- MyDropdown with loaded bus options -->
    <MyDropdown
      v-model="form.busNo"
      :options="busNos"
      placeholder="Choose a contract"
      :class="{ 'invalid': isFieldInvalid('busNo') }"
    />

    <!-- Starting KM Input -->
    <MyInput
      v-model="form.startingKm"
      placeholder="Starting KM"
      type="number"
      data-test="starting-km-input"
      :class="{ 'invalid': isFieldInvalid('startingKm') || kmValidationError }"
    />

    <!-- Ending KM Input -->
    <MyInput
      v-model="form.endingKm"
      placeholder="Ending KM"
      type="number"
      data-test="ending-km-input"
      :class="{ 'invalid': isFieldInvalid('endingKm') || kmValidationError }"
    />

    <!--Date-->
    <MyDate
      v-model="form.date"
      placeholder="Select Date"
      :class="{ 'invalid': isFieldInvalid('date') }"
    />


    <!-- Submit Button -->
    <MyButton
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
    <div style="max-width: 200px;">
      <p>
        You selected: <strong>{{ form.busNo}}</strong>
        Value: {{ form.startingKm }}
        Value: {{ form.endingKm}}
      </p>
    </div>
  </form>
  </div>
</template>





<script setup lang="ts">
import { ref, watch} from 'vue'
import MyDropdown from './MyDropdown.vue'
import MyButton from './MyButton.vue'
import MyInput from './MyInput.vue'
import { useBusesState } from '../stores/useTripsState'
import MyDate from './MyDate.vue'
import { API_BASE_URL } from '../apiEndpoint.ts'

const form = ref({
  busNo: '',
  startingKm: '',
  endingKm: '',
  date:''
})

const hasSubmitted = ref(false)
const kmValidationError = ref(false)

const { busNos} = useBusesState()

watch([() => form.value.startingKm, () => form.value.endingKm], ([start, end]) => {
  if (hasSubmitted.value && start !== '' && end !== '') {
    kmValidationError.value = Number(start) > Number(end)
  }
})

// async function loadBusOptions() {
//   if (busNos.value.length > 0) return
//   try {
//     const response = await fetch(`${API_BASE_URL}/buses`)
//     console.log('Fetching buses from: 111', `${API_BASE_URL}/buses`)
//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
//     const data = await response.json()
//     setBuses(data)
//     console.log('Buses loaded:', data)
//     console.log(busNos.value.length)
//   } catch (error) {
//     console.error('Failed to fetch buses:', error)
//   }
// }

//if hassSubmitted is true and there is no value in the field, then the field is invalid and should be highlighted with a red outline
const isFieldInvalid = (field: keyof typeof form.value) => {
  return hasSubmitted.value && !form.value[field]
}

async function submitForm() {
  // Set hasSubmitted to true to trigger validation isFieldInvalid to highlight fields if they are empty
  hasSubmitted.value = true

  // Check if all required fields are filled if not no api call is made and the fields are highlighted
  if (!form.value.busNo || !form.value.startingKm || !form.value.endingKm || !form.value.date) {
    // Form invalid - don't submit, just highlight fields
    return
  }
  console.log('Submitting form with values:', form.value)
  console.log('Form values:', form.value.busNo, form.value.startingKm, form.value.endingKm, form.value.date)

if (Number(form.value.startingKm) > Number(form.value.endingKm))  {
  kmValidationError.value = true
  alert('Starting KM must be less than or equal to Ending KM')
  return
} else {
  kmValidationError.value = false
}


  const payload = {
    busNo: form.value.busNo,
    startingKm: form.value.startingKm,
    endingKm: form.value.endingKm,
    date: form.value.date
  }

  try {
    const response = await fetch(`${API_BASE_URL}/trips`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    console.log('Submitting form to:22222', `${API_BASE_URL}/trips`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log('Trip saved:', result)
    alert('Trip saved successfully!')

  
    console.log('Form reset after submission',isFieldInvalid('busNo'), isFieldInvalid('startingKm'), isFieldInvalid('endingKm'))
    // Optionally reset form and submission state:
    form.value = { busNo: '', startingKm: '', endingKm: '', date:''}
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
