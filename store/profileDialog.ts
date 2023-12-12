import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthDialogStore } from './authDialog'
import { useUserStore } from './user'

export const useProfileDialogStore = defineStore('profileDialog', () => {
  const userStore = useUserStore()
  const authDialogStore = useAuthDialogStore()

  const isOpen = ref(false)

  const open = () => {
    if (userStore.isAuthenticated) {
      isOpen.value = true
    } else {
      authDialogStore.open()
    }
  }
  const close = () => {
    isOpen.value = false
  }

  return { open, close, isOpen }
})
