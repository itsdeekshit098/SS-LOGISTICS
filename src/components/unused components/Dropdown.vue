<!-- components/Dropdown.vue -->
<template>
  <div class="dropdown">
    <button @click="toggleDropdown" class="dropdown-toggle">
      {{ selectedLabel }}
    </button>
    <ul v-if="isOpen" class="dropdown-list">
      <li
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option.value)"
        class="dropdown-item"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default: () => [] // [{ label: 'Bus 1', value: 'BUS1' }, ...]
  },
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (value) => {
  emit('update:modelValue', value)
  isOpen.value = false
}

const selectedLabel = computed(() => {
  return props.options.find(o => o.value === props.modelValue)?.label || 'Select an option'
})
</script>

<style scoped>
.dropdown {
  position: relative;
  width: 200px;
}
.dropdown-toggle {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
}
.dropdown-list {
  position: absolute;
  background: white;
  width: 100%;
  border: 1px solid #ccc;
  list-style: none;
  margin: 0;
  padding: 0;
}
.dropdown-item {
  padding: 8px;
  cursor: pointer;
}
.dropdown-item:hover {
  background-color: #eee;
}
</style>
