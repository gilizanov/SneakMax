<template>
  <SectionTitle variant="dark">Мы подберем идеальную пару для вас</SectionTitle>
  <p class="quiz__text">Ответьте на три вопроса и мы вышлем каталог с самыми подходящими для вас моделями</p>
  <h3 class="quiz__subtitle">Уточните какие-либо моменты</h3>
  <div class="quiz__step">
    <AppTextarea v-model="userMessage" placeholder="Введите сообщение" />
  </div>
</template>

<script lang="ts" setup>
import AppTextarea from '@/components/ui/AppTextarea.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { useQuizStore } from '@/store/quiz'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'

const userMessage = ref('')

const { quizData, isDisabled } = storeToRefs(useQuizStore())

watch(
  userMessage,
  () => {
    quizData.value.userMessage = userMessage.value
  },
  { deep: true },
)

onMounted(() => {
  isDisabled.value = false
})
</script>
