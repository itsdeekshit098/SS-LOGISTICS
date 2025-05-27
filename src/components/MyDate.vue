<!-- <template>
  <input
    class="styled-input"
    type="date"
    :placeholder="placeholder"
    :value="selectedDate"
    @input="onInput"
    @keydown.prevent
  />
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Select a date'
  }
})

const emit = defineEmits(['update:modelValue'])

// Format today's date as YYYY-MM-DD
function getTodayDate(): string {
  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = String(today.getMonth() + 1).padStart(2, '0')
  const dd = String(today.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

// Internal reactive value for date input
const selectedDate = ref(props.modelValue || getTodayDate())

// Sync prop changes with internal state
watch(() => props.modelValue, (newVal) => {
  selectedDate.value = newVal || getTodayDate()
})

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  selectedDate.value = target.value
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.styled-input {
  width: 180px;
  padding: 10px 12px;
  font-size: 16px;
  color: rgb(90, 90, 90);
  background-color: white;
  border: 1px solid rgb(207, 207, 207);
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s, outline 0.3s;
}

.styled-input:hover {
  border-color: rgb(135, 135, 135);
}

.styled-input:focus {
  border-color: rgb(135, 135, 135);
  outline: 2px solid rgb(181, 224, 225);
  outline-offset: -1px;
}
</style> -->






<!-- 
<template>
  <div class="date-input-wrapper" @click="focusInput">
    <input
      ref="dateInput"
      class="styled-input"
      type="date"
      :value="modelValue"
      @input="onInput"
      @keydown.prevent
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'

defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const dateInput = ref<HTMLInputElement | null>(null)

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function focusInput() {
  dateInput.value?.showPicker?.() || dateInput.value?.focus()
}
</script>

<style scoped>
.date-input-wrapper {
  display: inline-block;
  cursor: pointer;
}

.styled-input {
  width: 180px;
  padding: 10px 12px;
  font-size: 16px;
  color: rgb(90, 90, 90);
  background-color: white;
  border: 1px solid rgb(207, 207, 207);
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s, outline 0.3s;
  appearance: none;
}

.styled-input:hover {
  border-color: rgb(135, 135, 135);
}

.styled-input:focus {
  border-color: rgb(135, 135, 135);
  outline: 2px solid rgb(181, 224, 225);
  outline-offset: -1px;
}
</style> -->



<template>
  <div class="date-input-wrapper" @click="focusInput">
    <input
      ref="dateInput"
      class="styled-input"
      type="date"
      :value="modelValue"
      @input="onInput"
      @keydown.prevent
    />
    <!-- Label only shown if modelValue is not empty -->
    <label v-if="modelValue" class="floating">Select a date</label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const dateInput = ref<HTMLInputElement | null>(null)

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function focusInput() {
  dateInput.value?.showPicker?.() || dateInput.value?.focus()
}
</script>

<style scoped>
.date-input-wrapper {
  position: relative;
  display: inline-block;
  cursor: text;
  width: 180px;
}

.styled-input {
  width: 100%;
  padding: 12px 12px 12px 12px;
  font-size: 16px;
  color: rgb(30, 30, 30);
  background-color: white;
  border: 1px solid rgb(207, 207, 207);
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s, outline 0.3s;
  appearance: auto;
  -webkit-appearance: auto;
  -moz-appearance: auto;
}

.styled-input:hover {
  border-color: rgb(135, 135, 135);
}

.styled-input:focus {
  border-color: rgb(135, 135, 135);
  outline: 2px solid rgb(181, 224, 225);
  outline-offset: -1px;
}

/* Floating label styling */
.floating {
  position: absolute;
  top: -8px;
  left: 8px;
  font-size: 12px;
  color: #444;
  background: white;
  padding: 0 4px;
  border-radius: 3px;
  pointer-events: none;
  user-select: none;
}
</style>
