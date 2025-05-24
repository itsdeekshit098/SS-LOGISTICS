<template>
  <div class="mc-option" @click="select">
    <slot>{{ label }}</slot>
  </div>
</template>

<script setup>
const props = defineProps({
  value: [String, Number, Object],
  label: String,
})

const emit = defineEmits(['select'])

const select = () => {
  emit('select', props.value)
}
</script>

<style scoped>
.mc-option {
  padding: 6px 10px;
  cursor: pointer;
}
.mc-option:hover {
  background-color: #f0f0f0;
}
</style>
