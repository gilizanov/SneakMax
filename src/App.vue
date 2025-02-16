<template>
  <AppHeader />
  <AppModalsContainer />
  <AppLoader v-if="isLoading" />
  <AppNotification />
  <main class="main">
    <AppDescr />
    <AppCatalog />
    <AppAbout />
    <AppQuiz />
    <AppTeam />
    <AppFaq />
    <AppContacts />
    <AppFeedback />
  </main>
  <AppFooter />
</template>

<script lang="ts" setup>
import AppAbout from '@/components/AppAbout.vue'
import AppCatalog from '@/components/AppCatalog.vue'
import AppContacts from '@/components/AppContacts.vue'
import AppDescr from '@/components/AppDescr.vue'
import AppFaq from '@/components/AppFaq.vue'
import AppFeedback from '@/components/AppFeedback.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppModalsContainer from '@/components/AppModalsContainer.vue'
import AppNotification from '@/components/AppNotification.vue'
import AppQuiz from '@/components/AppQuiz.vue'
import AppTeam from '@/components/AppTeam.vue'
import AppLoader from '@/components/ui/AppLoader.vue'
import { useFilterStore } from '@/store/filter'
import { useModalStore } from '@/store/modal'
import { useProductsStore } from '@/store/products'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const { isLoading } = storeToRefs(useProductsStore())

const { modalType } = storeToRefs(useModalStore())
const { filterIsOpen } = storeToRefs(useFilterStore())

const bodyEl = document.querySelector('.page__body')

watch([filterIsOpen, modalType], () => {
  if (modalType.value !== '' || filterIsOpen.value) {
    bodyEl?.classList.add('no-scroll')
  } else {
    bodyEl?.classList.remove('no-scroll')
  }
})
</script>
