<template>
  <SectionTitle variant="dark">Мы подберем идеальную пару для вас</SectionTitle>
  <p class="quiz__text">Ответьте на три вопроса и мы вышлем каталог с самыми подходящими для вас моделями</p>
  <h3 class="quiz__subtitle">Какой размер вам подойдет?</h3>
  <div class="quiz__step">
    <div class="quiz__sizes">
      <QuizCheckbox
        v-for="(size, index) in QUIZ_SNEAKERS_SIZES"
        :key="index"
        v-model="sizes"
        :text="size"
        :value="size"
      />
    </div>
    <picture>
      <img loading="lazy" src="/img/quiz/10.jpg" class="image" alt="Выберите размер" />
    </picture>
  </div>
</template>

<script lang="ts" setup>
import QuizCheckbox from '@/components/ui/checkbox/QuizCheckbox.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { QUIZ_SNEAKERS_SIZES } from '@/constants/quiz'
import { useQuizStore } from '@/store/quiz'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const sizes = ref<string[]>([])

const { quizData, isDisabled } = storeToRefs(useQuizStore())

watch(
  sizes,
  () => {
    quizData.value.sizes = sizes.value

    if (sizes.value.length > 0) {
      isDisabled.value = false
    } else {
      isDisabled.value = true
    }
  },
  { deep: true },
)
</script>
