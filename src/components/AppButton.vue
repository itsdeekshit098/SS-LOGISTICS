<template>
  <component
    :is="href ? 'a' : 'button'"
    class="app-button"
    :class="[
      `fit-${fit}`,
      `appearance-${appearance}`,
      `variant-${variant}`,
      `padding-${padding}`,
      `width-${width}`,
      `justify-${justifyitems}`,
      { loading, disabled, active }
    ]"
    :type="type"
    :href="href"
    :rel="rel"
    :target="target"
    :aria-label="ariaLabel"
    :aria-current="ariaCurrent"
    :role="ariaRole"
    :name="name"
    :disabled="disabled || loading"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <span v-if="loading" class="spinner" />
    <span v-else class="icon" v-if="icon">
      <slot name="icon">
        <i :class="`icon-${icon}`" />
      </slot>
    </span>
    <span v-if="!hiddenLabel" class="label">
      <slot name="label">{{ label }}</slot>
    </span>
    <span v-else class="sr-only">{{ label }}</span>
    <span v-if="!loading && trailingicon" class="trailing-icon">
      <slot name="trailingicon">
        <i :class="`icon-${trailingicon}`" />
      </slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['click', 'focus', 'blur']);

const props = defineProps({
  label: String,
  hiddenLabel: Boolean,
  loading: Boolean,
  fit: { type: String, default: 'medium' },
  appearance: { type: String, default: 'primary' },
  variant: { type: String, default: 'filled' },
  padding: { type: String, default: 'default' },
  width: { type: String, default: 'auto' },
  justifyitems: { type: String, default: 'center' },
  icon: String,
  trailingicon: String,
  disabled: Boolean,
  active: Boolean,
  href: String,
  rel: String,
  target: String,
  ariaLabel: String,
  ariaCurrent: String,
  ariaRole: String,
  name: String,
  type: { type: String, default: 'button' },
});

function handleClick(event: Event) {
  if (!props.loading && !props.disabled) {
    emit('click', event);
  }
}

function handleFocus(event: Event) {
  emit('focus', event);
}

function handleBlur(event: Event) {
  emit('blur', event);
}
</script>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.2s;
  text-decoration: none;
}
.app-button.loading {
  pointer-events: none;
  opacity: 0.6;
}
.app-button .spinner {
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
.app-button .icon,
.app-button .trailing-icon {
  display: flex;
  align-items: center;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.appearance-secondary{
  background-color: rgb(66, 176, 213);
  color: white;
}
.appearance-secondary:hover {
  background-color: rgb(42, 160, 213);
}
.appearance-primary {
  background-color: rgb(0, 115, 171);
  color: white;
}
.appearance-primary:hover {
  background-color: rgb(0, 90, 171);
}

.justify-center {
  justify-content: center;
}

/* Add your own classes here for fit, appearance, variant, padding, etc. */
</style>
