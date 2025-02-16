<template>
  <AppModals :key="modalType" />
</template>

<script lang="ts" setup>
import { useModalStore } from '@/store/modal'
import { storeToRefs } from 'pinia'
import AppModals from './AppModals.vue'

const { modalType } = storeToRefs(useModalStore())
</script>
