<template>
  <div class="consultation">
    <h3 class="consultation__title">Есть вопросы?</h3>
    <p class="consultation__text">Заполните форму и наш менеджер свяжется с вами</p>
    <AppForm :url="CONSULTATION_URL" button-text="Отправить" />
  </div>
</template>

<script lang="ts" setup>
import AppForm from '@/components/AppForm.vue'
import { CONSULTATION_URL } from '@/constants/api'
</script>

<style scoped>
.consultation {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px;
  background-color: var(--bg);
}

.consultation__title,
.consultation__text {
  text-align: center;
  color: var(--white);
}

.consultation__title {
  font: var(--font-30_700);
  margin-bottom: 16px;
}

.consultation__text {
  font: var(--font-16_400);
  margin-bottom: 32px;
}
</style>
