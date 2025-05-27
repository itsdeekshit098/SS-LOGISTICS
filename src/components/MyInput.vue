<!-- <template>
  <input
    class="styled-input"
    type="text"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps({
  placeholder: {
    type: String,
    default: 'Enter value'
  },
  modelValue: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);
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

<template>
  <input
    class="styled-input"
    :type="inputType"
    :placeholder="placeholder"
    :value="modelValue"
    @input="onInput"
    @keypress="handleKeyPress"
    :inputmode="inputMode"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  type?: 'text' | 'number' | 'email' | 'password'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputType = computed(() => props.type || 'text')

// Optional: improves mobile keyboard behavior
const inputMode = computed(() => {
  if (props.type === 'number') return 'decimal'
  if (props.type === 'email') return 'email'
  return 'text'
})

// Input sanitization and update
function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  let value = target.value

  if (props.type === 'number') {
    // Allow only digits, no dot, no minus sign
    value = value.replace(/[^0-9]/g, '')  
  }

  emit('update:modelValue', value)
}

// Prevent invalid keypresses in number mode
function handleKeyPress(event: KeyboardEvent) {
  if (props.type === 'number') {
    const allowed = /[\d.-]/
    if (!allowed.test(event.key)) {
      event.preventDefault()
    }
  }
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
</style>
