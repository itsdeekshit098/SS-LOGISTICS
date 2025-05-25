<!-- 
<template>
  <div class="dropdown" @click.outside="closeDropdown">
    <button
      @click="toggleDropdown"
      :class="['dropdown-button', { active: isOpen }]"
      data-test="dropdown-button"
    >
      <span :style="{ color: selected ? 'rgb(90, 90, 90)' : 'rgb(181, 181, 181)' }">
        {{ selected || placeholder }}
      </span>
      <svg
        class="dropdown-arrow"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        :style="{ transform: isOpen ? 'translateY(-50%) rotate(0deg)' : 'translateY(-50%) rotate(180deg)' }"
      >
        <path fill="rgb(95, 95, 95)"
              d="M10.517 7H9.483l-5.1 6.072-.766-.644 5.1-6.071A1 1 0 0 1 9.483 6h1.034a1 1 0 0 1 .766.357l5.1 6.071-.766.644L10.517 7z" />
      </svg>
    </button>

    <div v-if="isOpen" class="dropdown-content" data-test="dropdown-options">
      <a href="#" class="placeholder" @click.prevent="resetSelection">{{ placeholder }}</a>
      <a
        v-for="(option, index) in options"
        :key="index"
        href="#"
        @click.prevent="selectOption(option)"
      >
        {{ option }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  modelValue: string | null
  options: string[]
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const placeholder = computed(() => props.placeholder || 'Select an option')
const isOpen = ref(false)

const selected = computed<string | null>({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectOption(option: string) {
  selected.value = option
  isOpen.value = false
}

function resetSelection() {
  selected.value = null
  isOpen.value = false
}

function closeDropdown(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.dropdown')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
.dropdown {
  position: relative;
  width: 200px;
}

.dropdown-button {
  width: 100%;
  padding: 10px 36px 10px 12px;
  font-size: 16px;
  color: rgb(181, 181, 181);
  background-color: white;
  border: 1px solid rgb(207, 207, 207);
  border-radius: 5px;
  cursor: pointer;
  text-align: left;
  position: relative;
  transition: border-color 0.3s;
}

.dropdown-button:hover {
  border-color: rgb(135, 135, 135);
}

.dropdown-button.active {
  outline: 2px solid rgb(181, 224, 225);
  outline-offset: -1px;
}

.dropdown-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transition: transform 0.3s ease;
  pointer-events: none;
}

.dropdown-content {
  position: absolute;
  top: 105%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid rgb(207, 207, 207);
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  z-index: 1;
}

.dropdown-content a {
  padding: 10px 16px;
  display: block;
  text-decoration: none;
  color: rgb(90, 90, 90);
  cursor: pointer;
}

.dropdown-content a.placeholder {
  color: rgb(181, 181, 181);
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}
</style> -->
<!-- 
<template>
  <div class="dropdown" @click.outside="closeDropdown">
    <button
      @click="toggleDropdown"
      :class="['dropdown-button', { active: isOpen }]"
      data-test="dropdown-button"
    >
      <span :style="{ color: selected ? 'rgb(90, 90, 90)' : 'rgb(181, 181, 181)' }">
        {{ selected || placeholder }}
      </span>
      <svg
        class="dropdown-arrow"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        :style="{ transform: isOpen ? 'translateY(-50%) rotate(0deg)' : 'translateY(-50%) rotate(180deg)' }"
      >
        <path fill="rgb(95, 95, 95)"
              d="M10.517 7H9.483l-5.1 6.072-.766-.644 5.1-6.071A1 1 0 0 1 9.483 6h1.034a1 1 0 0 1 .766.357l5.1 6.071-.766.644L10.517 7z" />
      </svg>
    </button>

    <div v-if="isOpen" class="dropdown-content" data-test="dropdown-options">
      <a href="#" class="placeholder" @click.prevent="resetSelection">{{ placeholder }}</a>
      <a
        v-for="(option, index) in options"
        :key="index"
        href="#"
        @click.prevent="selectOption(option)"
      >
        {{ option }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  modelValue: string | null
  options: string[]
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
  (e: 'opened'): void
}>()

const placeholder = computed(() => props.placeholder || 'Select an option')
const isOpen = ref(false)

const selected = computed<string | null>({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    emit('opened')
  }
}

function selectOption(option: string) {
  selected.value = option
  isOpen.value = false
}

function resetSelection() {
  selected.value = null
  isOpen.value = false
}

function closeDropdown(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.dropdown')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
.dropdown {
  position: relative;
  width: 200px;
}

.dropdown-button {
  width: 200px;
  padding: 10px 12px;
  font-size: 16px;
  color: rgb(181, 181, 181);
  background-color: white;
  border: 1px solid rgb(207, 207, 207);
  border-radius: 5px;
  cursor: pointer;
  text-align: left;
  position: relative;
  transition: border-color 0.3s;
}

.dropdown-button:hover {
  border-color: rgb(135, 135, 135);
}

.dropdown-button.active {
  outline: 2px solid rgb(181, 224, 225);
  outline-offset: -1px;
}

.dropdown-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transition: transform 0.3s ease;
  pointer-events: none;
}

.dropdown-content {
  position: absolute;
  top: 105%;
  left: 0;
  width: 200px;
  background-color: white;
  border: 1px solid rgb(207, 207, 207);
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  z-index: 1;
}

.dropdown-content a {
  padding: 10px 16px;
  display: block;
  text-decoration: none;
  color: rgb(90, 90, 90);
  cursor: pointer;
}

.dropdown-content a.placeholder {
  color: rgb(181, 181, 181);
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}
</style> -->
<template>
  <div class="dropdown" @click.outside="closeDropdown">
    <button
      type="button"
      @click="toggleDropdown"
      :class="['dropdown-button', { active: isOpen }]"
      data-test="dropdown-button"
    >
      <span :style="{ color: selected ? 'rgb(90, 90, 90)' : 'rgb(181, 181, 181)' }">
        {{ selected || placeholder }}
      </span>
      <svg
        class="dropdown-arrow"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        :style="{ transform: isOpen ? 'translateY(-50%) rotate(0deg)' : 'translateY(-50%) rotate(180deg)' }"
      >
        <path fill="rgb(95, 95, 95)"
              d="M10.517 7H9.483l-5.1 6.072-.766-.644 5.1-6.071A1 1 0 0 1 9.483 6h1.034a1 1 0 0 1 .766.357l5.1 6.071-.766.644L10.517 7z" />
      </svg>
    </button>

    <div v-if="isOpen" class="dropdown-content" data-test="dropdown-options">
      <a href="#" class="placeholder" @click.prevent="resetSelection">{{ placeholder }}</a>
      <a
        v-for="(option, index) in options"
        :key="index"
        href="#"
        @click.prevent="selectOption(option)"
      >
        {{ option }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  modelValue: string | null
  options: string[]
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
  (e: 'opened'): void
}>()

const placeholder = computed(() => props.placeholder || 'Select an option')
const isOpen = ref(false)

const selected = computed<string | null>({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

function toggleDropdown() {
  if (!isOpen.value) {
    isOpen.value = true
    emit('opened')
  } else {
    isOpen.value = false
  }
}

function selectOption(option: string) {
  selected.value = option
  isOpen.value = false
}

function resetSelection() {
  selected.value = null
  isOpen.value = false
}

function closeDropdown(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.dropdown')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
.dropdown {
  position: relative;
  width: 200px;
}

.dropdown-button {
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  background-color: white;
  border: 1px solid rgb(207, 207, 207);
  border-radius: 5px;
  cursor: pointer;
  text-align: left;
  position: relative;
  transition: border-color 0.3s;
}

.dropdown-button:hover {
  border-color: rgb(135, 135, 135);
}

.dropdown-button.active {
  outline: 2px solid rgb(181, 224, 225);
  outline-offset: -1px;
}

.dropdown-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transition: transform 0.3s ease;
  pointer-events: none;
}

.dropdown-content {
  position: absolute;
  top: 105%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid rgb(207, 207, 207);
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
  z-index: 1;
}

.dropdown-content a {
  padding: 10px 16px;
  display: block;
  text-decoration: none;
  color: rgb(90, 90, 90);
  cursor: pointer;
}

.dropdown-content a.placeholder {
  color: rgb(181, 181, 181);
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}
</style>
