<template>
  <SectionTitle variant="dark">Ваша подборка готова!</SectionTitle>
  <p class="quiz__text quiz__text--beige">
    Оставьте ваши контактные данные, чтобы мы могли отправить вам подготовленный каталог
  </p>
  <div class="quiz__step">
    <div class="quiz__form-container">
      <div class="quiz__form">
        <h4 class="quiz__form-title">Получить предложение</h4>
        <p class="quiz__form-text">Получите подборку подходящих для вас моделей на почту</p>
        <AppForm
          button-text="Получить"
          :url="QUIZ_URL"
          :class="{ disabled: isDisabled }"
          :quiz-data="quizData"
          @form-submitted="onSubmittedForm"
        />
      </div>
      <div :class="['quiz__form-image', { success: isDisabled }]">
        <picture>
          <img loading="lazy" src="/img/phone.png" class="image" alt="Предложение" />
        </picture>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppForm from '@/components/AppForm.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { QUIZ_URL } from '@/constants/api'
import { useQuizStore } from '@/store/quiz'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { quizData } = storeToRefs(useQuizStore())

const isDisabled = ref(false)
const onSubmittedForm = () => (isDisabled.value = true)
</script>
