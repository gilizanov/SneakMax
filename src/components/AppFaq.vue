<template>
  <section id="faq" class="section faq">
    <div class="container grid">
      <SectionTitle variant="dark">Часто задаваемые вопросы</SectionTitle>
      <ul class="faq__list">
        <li v-for="faqItem in faqItems" :key="faqItem.id" class="faq__item">
          <AppAccordion :title="faqItem.title" :content="faqItem.content"></AppAccordion>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
import AppAccordion from '@/components/ui/AppAccordion.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { FAQ_URL } from '@/constants/api.ts'
import { TypeFaqItem } from '@/interfaces'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const faqItems = ref<TypeFaqItem[]>()

const getFaqItems = async () => {
  try {
    const data = await axios.get(FAQ_URL)
    faqItems.value = data?.data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}

onMounted(() => getFaqItems())
</script>

<style scoped>
.faq__list {
  grid-column: 2 / 12;
  border-top: 1px solid var(--dark-gray);
}

@media (width <= 1024px) {
  .faq__list {
    grid-column: span 6;
  }
}

@media (width <= 576px) {
  .faq__list {
    grid-column: span 2;
  }
}
</style>
