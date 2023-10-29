import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const userID = ref<string>()
    const userPhone = ref<string>()

    const accessToken = ref<string>()
    const refreshToken = ref<string>()

    const isAuthenticated = ref(false)

    const signOut = () => {
      userID.value = undefined
      userPhone.value = undefined
      accessToken.value = undefined
      refreshToken.value = undefined
      isAuthenticated.value = false
    }

    return { userID, userPhone, accessToken, refreshToken, isAuthenticated, signOut }
  },
  { persist: true }
)
