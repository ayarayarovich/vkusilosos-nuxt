import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthDialogStore = defineStore('authDialog', () => {
  const isOpen = ref(false)

  const open = () => {
    isOpen.value = true
  }
  const close = () => {
    isOpen.value = false
  }

  return { open, close, isOpen }
})
