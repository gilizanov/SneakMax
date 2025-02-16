<template>
  <svg>
    <use :href="`/sprite.svg#${iconName}`"></use>
  </svg>
</template>

<script lang="ts" setup>
defineProps<{
  iconName: string
}>()
</script>

<style scoped></style>
