<template>
  <h2
    :class="[
      'section-title',
      { 'section-title--dark': variant === 'dark' },
      { 'section-title--white': variant === 'white' },
    ]"
  >
    <slot></slot>
  </h2>
</template>

<script lang="ts" setup>
defineProps<{
  variant: 'dark' | 'white'
}>()
</script>

<style scoped>
.section-title {
  margin-bottom: 40px;
  font: var(--font-30_700);
}

.section-title--white {
  color: var(--white);
}

.section-title--dark {
  color: var(--dark);
}

@media (width <= 1024px) {
  .section-title {
    grid-column: span 6;
    margin-bottom: 24px;
    font: var(--font-20_700);
  }
}

@media (width <= 576px) {
  .section-title {
    grid-column: span 2;
  }
}
</style>
