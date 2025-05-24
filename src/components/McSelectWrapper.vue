<template>
  <mc-select
    :label="label"
    :placeholder="placeholder"
    :name="name"
    data-test="mc-select"
    @input="$emit('input', $event)"
    @optionselected="$emit('optionselected', $event)"
    @opened="$emit('opened', $event)"
    @closed="$emit('closed', $event)"
    @clearbuttonclick="$emit('clearbuttonclick', $event)"
    @trailingiconclick="$emit('trailingiconclick', $event)"
    @focus="$emit('focus', $event)"
    @click="$emit('click', $event)"
  >
    <mc-option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :data-test="`option-${option.value}`"
    >
      {{ option.label }}
    </mc-option>
  </mc-select>
</template>

<script>
export default {
  name: 'McSelectWrapper',
  props: {
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    name: { type: String, default: '' },
    options: {
      type: Array,
      required: true,
      // Format: [{ value: '1', label: 'One' }, { value: '2', label: 'Two' }]
    },
  }
};
</script>
