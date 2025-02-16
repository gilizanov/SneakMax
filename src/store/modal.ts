import { IProduct } from '@/interfaces'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const modalType = ref('')
  const modalPayload = ref<IProduct | undefined>()

  const closeModal = () => {
    modalType.value = ''
    modalPayload.value = undefined
  }

  const openModal = (type: string, payload?: IProduct) => {
    modalType.value = type
    modalPayload.value = payload
  }

  return {
    modalType,
    modalPayload,
    closeModal,
    openModal,
  }
})
