<template>
  <div v-if="notificationIsVisible" class="notification">
    <p class="notification__text">{{ notificationText }}</p>
  </div>
</template>

<script lang="ts" setup>
import { notificationIsVisible, notificationText } from '@/utils/notifications'
</script>

<style scoped>
.notification {
  position: fixed;
  right: 32px;
  top: 32px;
  background-color: var(--dark-gray);
  padding: 24px 48px;
  font: var(--font-16_400);
  color: var(--light);
  z-index: 20;
  animation: notification 0.4s linear;
}

@media (width <= 1024px) {
  .notification {
    top: 16px;
    right: 16px;
    padding: 16px 24px;
  }
}

@keyframes notification {
  0% {
    right: -100%;
  }
}
</style>
