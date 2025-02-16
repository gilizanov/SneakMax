<template>
  <div :class="['accordion', { 'accordion-is-open': isOpen }]">
    <div class="accordion__toggler" @click="toggleAccordion">
      <h3 class="accordion__title">{{ title }}</h3>
      <div class="accordion__icon">
        <SvgIcon icon-name="plus" />
      </div>
    </div>
    <div ref="accordionBody" class="accordion__body">
      <p class="accordion__text">{{ content }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/ui/SvgIcon.vue'
import { ref } from 'vue'

defineProps<{
  title: string
  content: string
}>()

const accordionBody = ref()
const isOpen = ref(false)

const toggleAccordion = () => {
  if (!isOpen.value) {
    accordionBody.value.style.maxHeight = accordionBody.value.scrollHeight + 'px'
  } else {
    accordionBody.value.style.maxHeight = 0
  }

  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.accordion {
  padding: 32px 0;
  border-bottom: 1px solid var(--dark-gray);
}

.accordion.accordion-is-open {
  .accordion__body {
    padding-top: 24px;
    opacity: 1;
  }

  .accordion__icon svg {
    transform: rotate(45deg);
  }
}

.accordion__toggler {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
}

.accordion__title {
  font: var(--font-20_700);
  color: var(--dark-gray);
}

.accordion__icon {
  svg {
    fill: var(--dark-gray);
    width: 24px;
    height: 24px;
    transition: transform 0.4s;
  }
}

.accordion__body {
  max-height: 0;
  will-change: max-height;
  transition: all 0.4s;
  overflow: hidden;
  opacity: 0;
  box-sizing: content-box;
}

.accordion__text {
  font: var(--font-16_400);
  color: var(--dark);
}

@media (width <= 1024px) {
  .accordion {
    padding: 24px 0;
  }

  .accordion.accordion-is-open {
    .accordion__body {
      padding-top: 16px;
    }
  }

  .accordion__title {
    font: var(--font-16_700);
  }

  .accordion__txt {
    font: var(--font-14_400);
  }
}
</style>
