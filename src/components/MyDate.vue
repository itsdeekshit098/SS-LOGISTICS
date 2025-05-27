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
  <div class="date-input-wrapper" @click="openPicker">
    <!-- Hidden native date input -->
    <input
      ref="dateInput"
      type="date"
      class="native-date-input"
      :value="modelValue"
      @input="onInput"
    />
    <!-- Fake visible input -->
    <div class="fake-input" :class="{ 'empty': !modelValue }">
      {{ displayText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const dateInput = ref<HTMLInputElement | null>(null)

// Format date from yyyy-mm-dd to dd-mm-yyyy for display
function formatDateDisplay(dateStr: string) {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-')
  return `${day}-${month}-${year}`
}

const displayText = computed(() => {
  return props.modelValue ? formatDateDisplay(props.modelValue) : 'Select a date'
})

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function openPicker() {
  dateInput.value?.showPicker?.() || dateInput.value?.focus()
}
</script>

<style scoped>
.date-input-wrapper {
  position: relative;
  width: 205px;
  cursor: pointer;
  display: inline-block;
}

/* Hide native date input but keep it focusable */
.native-date-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  opacity: 0;
  pointer-events: none;
  /* Keep accessible for keyboard and screen readers */
}

/* Fake input styling */
.fake-input {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 10px 12px;
  font-size: 16px;
  line-height: 1.2;
  color: rgb(30, 30, 30);
  background-color: white;
  border: 1px solid rgb(207, 207, 207);
  border-radius: 5px;
  user-select: none;
  display: flex;
  align-items: center;
  transition: border-color 0.3s, outline 0.3s;
}

.fake-input.empty {
  color: #999;
  font-style: italic;
}

.date-input-wrapper:hover .fake-input {
  border-color: rgb(135, 135, 135);
}

.date-input-wrapper:focus-within .fake-input {
  border-color: rgb(135, 135, 135);
  outline: 2px solid rgb(181, 224, 225);
  outline-offset: -1px;
}
</style>
