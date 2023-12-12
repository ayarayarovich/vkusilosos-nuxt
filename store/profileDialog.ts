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
      console.log('атлешна, в акаунт зашел, на тебе профиль')
      isOpen.value = true
    } else {
      console.log('бля, он не вошел в акаунт, надо зайти!')
      authDialogStore.open()
    }
  }
  const close = () => {
    isOpen.value = false
  }

  return { open, close, isOpen }
})
