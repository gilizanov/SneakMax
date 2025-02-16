<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__container">
        <a href="/" class="logo">SneakMax</a>
        <AppNav />
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import AppNav from '@/components/AppNav.vue'
</script>

<style scoped>
.footer {
  padding: 16px 0;
  background-color: var(--dark);
}

.footer__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
