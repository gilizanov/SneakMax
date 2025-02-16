<template>
  <div v-if="modalType !== ''" class="overlay" @click.self="closeModal">
    <component :is="component"></component>
  </div>
</template>

<script lang="ts" setup>
import { useModalStore } from '@/store/modal'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent } from 'vue'

const { closeModal } = useModalStore()
const { modalType } = storeToRefs(useModalStore())

const component = defineAsyncComponent(async () => await import(`@/components/modals/App${modalType.value}.vue`))
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background-color: var(--dark-70);
  z-index: 10;
}
</style>
