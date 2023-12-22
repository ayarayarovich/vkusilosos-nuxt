import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthDialogStore } from './authDialog'
import { useUserStore } from './user'

export type ProfileDialogView = 'orders_history' | 'info' | 'addresses' | 'bonus_system' | 'notifications'

export const useProfileDialogStore = defineStore('profileDialog', () => {
  const userStore = useUserStore()
  const authDialogStore = useAuthDialogStore()
  const currentView = ref<ProfileDialogView>('info')

  // Костыль, чтобы watch() в компоненте MobileDialog изменял текущий экран с каждым вызовом метода open()
  // Просто для счета вызовов метода open()
  const openCallCount = ref(0)

  const isOpen = ref(false)

  const open = (view?: ProfileDialogView) => {
    if (userStore.isAuthenticated) {
      isOpen.value = true
      if (view) {
        currentView.value = view
        openCallCount.value = openCallCount.value + 1
      }
    } else {
      authDialogStore.open()
    }
  }
  const close = () => {
    isOpen.value = false
  }

  return { open, close, isOpen, currentView, openCallCount }
})
