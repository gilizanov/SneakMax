import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQuizStore = defineStore('quiz', () => {
  const maxStep = ref(Object.keys(import.meta.glob('@/components/quiz/QuizStep*.vue')).length)
  const currentStep = ref(1)
  const isDisabled = ref(true)

  const nextStep = () => {
    currentStep.value++
    isDisabled.value = true
  }

  const quizData = ref<Record<string, string | string[]>>({})

  return {
    maxStep,
    currentStep,
    isDisabled,
    nextStep,
    quizData,
  }
})
