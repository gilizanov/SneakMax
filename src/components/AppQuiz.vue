<template>
  <section id="quiz" class="section">
    <div class="container grid">
      <div class="quiz grid">
        <QuizSteps :key="currentStep" />
        <div v-if="currentStep < maxStep" class="quiz__bottom">
          <div class="quiz__counter">{{ currentStep }} из {{ maxStep - 1 }}</div>
          <AppButton :disabled="isDisabled" variant="bordered" @click="nextStep">Следующий шаг</AppButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import QuizSteps from '@/components/QuizSteps.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { useQuizStore } from '@/store/quiz'
import { storeToRefs } from 'pinia'

const { currentStep, maxStep, isDisabled } = storeToRefs(useQuizStore())
const { nextStep } = useQuizStore()
</script>

<style>
.quiz {
  grid-column: span 12;
  padding: 40px 0;
  background-color: var(--light);

  .section-title,
  .quiz__text,
  .quiz__subtitle,
  .quiz__bottom,
  .quiz__step {
    grid-column: 2 / 12;
  }

  .section-title {
    margin-bottom: 24px;
  }
}

.quiz__text {
  margin-bottom: 24px;
  padding-bottom: 8px;
  font: var(--font-16_400);
  border-bottom: 1px solid var(--gray);
  color: var(--gray);
}

.quiz__text.quiz__text--beige {
  color: var(--beige);
  border-color: var(--beige);
}

.quiz__subtitle {
  font: var(--font-24_400);
  color: var(--dark);
}

.quiz__step {
  margin-top: 24px;
}

.quiz__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--dark);
}

.quiz__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: stretch;
}

.quiz__item {
  display: flex;
  flex-direction: column;
  grid-column: span 1;

  .checkbox {
    height: 24px;
  }

  img {
    height: 100%;
  }
}

.quiz__item-image {
  flex-grow: 1;
  margin-bottom: 24px;
  border-radius: var(--radius);
  overflow: hidden;
}

.quiz__sizes {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.quiz__counter {
  font: var(--font-16_400);
  color: var(--dark);
}

.quiz__form-container {
  display: flex;
  align-items: center;
}

.quiz__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  padding: 40px 120px 40px 40px;
  background-color: var(--beige);
}

.quiz__form-image {
  flex-shrink: 0;
  position: relative;
  height: 560px;
  margin-left: -24px;

  img {
    height: 100%;
  }
}

.quiz__form-image.success {
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url(/img/phone-success.png);
    background-repeat: no-repeat;
    background-position: 50% 44%;
    background-size: 90% 94%;
  }
}

.quiz__form-title,
.quiz__form-text {
  color: var(--white);
}

.quiz__form-title {
  font: var(--font-30_700);
  margin-bottom: 16px;
}

.quiz__form-text {
  font: var(--font-16_400);
  margin-bottom: 24px;
}

@media (width <= 1024px) {
  #quiz {
    padding: 0;

    .container {
      padding: 0;
    }
  }

  .quiz {
    grid-column: span 6;
    padding: 24px 20px;

    .section-title,
    .quiz__text,
    .quiz__subtitle,
    .quiz__bottom,
    .quiz__step {
      grid-column: span 6;
    }
  }

  .quiz__text {
    font: var(--font-14_400);
  }

  .quiz__subtitle {
    margin-bottom: 16px;
    font: var(--font-16_400);
  }

  .quiz__list {
    grid-template-columns: repeat(2, 1fr);
  }

  .quiz__step {
    margin-top: 16px;
  }

  .quiz__form {
    padding: 24px 32px 24px 24px;
  }

  .quiz__form-title {
    font: var(--font-20_700);
  }

  .quiz__form-text {
    text-align: center;
    font: var(--font-14_400);
  }

  .quiz__bottom {
    margin-top: 24px;
  }
}

@media (width <= 576px) {
  .quiz {
    grid-column: span 2;

    .section-title,
    .quiz__text,
    .quiz__subtitle,
    .quiz__bottom,
    .quiz__step {
      grid-column: span 2;
    }
  }

  .quiz__list {
    grid-template-columns: repeat(1, 1fr);
  }

  .quiz__sizes {
    justify-content: unset;
    flex-wrap: wrap;
    gap: 16px 24px;
  }

  .quiz__form {
    width: calc(100% + (var(--container-offset) * 2));
    padding: 24px;
    margin-left: calc(var(--container-offset) * (-1));
    margin-right: calc(var(--container-offset) * (-1));
  }

  .quiz__form-image {
    display: none;
  }
}
</style>
