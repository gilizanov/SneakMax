<template>
  <component :is="component"></component>
</template>

<script lang="ts" setup>
import { useQuizStore } from '@/store/quiz'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent } from 'vue'

const { currentStep } = storeToRefs(useQuizStore())

const component = defineAsyncComponent(async () => await import(`@/components/quiz/QuizStep${currentStep.value}.vue`))
</script>
