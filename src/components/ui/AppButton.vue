<template>
  <button
    type="button"
    :class="[
      'button',
      { 'button--accent': variant === 'accent' },
      { 'button--dark': variant === 'dark' },
      { 'button--bordered': variant === 'bordered' },
    ]"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  variant: 'accent' | 'dark' | 'bordered'
}>()
</script>
