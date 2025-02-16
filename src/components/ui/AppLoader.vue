<template>
  <div class="loader">
    <SvgIcon icon-name="loader" />
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/ui/SvgIcon.vue'
</script>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--dark-70);
  z-index: 50;

  svg {
    width: 80px;
    height: 80px;
    fill: var(--white);
    animation: spin 1s infinite linear;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
