<template>
  <SectionTitle variant="dark">Мы подберем идеальную пару для вас</SectionTitle>
  <p class="quiz__text">Ответьте на три вопроса и мы вышлем каталог с самыми подходящими для вас моделями</p>
  <h3 class="quiz__subtitle">Какой тип кроссовок рассматриваете?</h3>
  <div class="quiz__step">
    <div class="quiz__list">
      <div v-for="(item, index) in QUIZ_SNEAKERS_TYPES" :key="index" class="quiz__item">
        <div class="quiz__item-image">
          <picture>
            <img loading="lazy" :src="item.imageUrl" class="image" :alt="item.type" />
          </picture>
        </div>
        <QuizCheckbox v-model="types" :text="item.type" :value="item.type" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import QuizCheckbox from '@/components/ui/checkbox/QuizCheckbox.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { QUIZ_SNEAKERS_TYPES } from '@/constants/quiz'
import { useQuizStore } from '@/store/quiz'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const types = ref<string[]>([])

const { quizData, isDisabled } = storeToRefs(useQuizStore())

watch(
  types,
  () => {
    quizData.value.types = types.value

    if (types.value.length > 0) {
      isDisabled.value = false
    } else {
      isDisabled.value = true
    }
  },
  { deep: true },
)
</script>
