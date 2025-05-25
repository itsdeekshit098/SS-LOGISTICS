<template>
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
</style>
