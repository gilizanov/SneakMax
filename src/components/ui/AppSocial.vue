<template>
  <div class="social">
    <a href="#" class="social__link">
      <SvgIcon icon-name="tg" />
    </a>
    <a href="#" class="social__link">
      <SvgIcon icon-name="vk" />
    </a>
    <a href="#" class="social__link">
      <SvgIcon icon-name="inst" />
    </a>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/ui/SvgIcon.vue'
</script>

<style scoped>
.social {
  display: flex;
  align-items: center;
  gap: 16px;
}

.social__link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: var(--black);
  border-radius: 50%;

  svg {
    fill: var(--white);
    width: 24px;
    height: 24px;
  }
}
</style>
