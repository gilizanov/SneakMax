import { ref } from 'vue'

export const notificationIsVisible = ref(false)
export const notificationText = ref('')

export const showNotification = (text: string) => {
  notificationIsVisible.value = true
  notificationText.value = text

  setTimeout(() => {
    notificationIsVisible.value = false
    notificationText.value = ''
  }, 4000)
}
