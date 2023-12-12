import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useQueryClient } from '@tanstack/vue-query'

export const useUserStore = defineStore(
  'user',
  () => {
    const queryClient = useQueryClient()

    const userID = ref<string>()
    const userPhone = ref<string>()

    const accessToken = ref<string>()
    const refreshToken = ref<string>()

    const isAuthenticated = ref(false)

    const forgetCredentials = () => {
      userID.value = undefined
      userPhone.value = undefined
      accessToken.value = undefined
      refreshToken.value = undefined
      isAuthenticated.value = false
    }

    const signOut = () => {
      forgetCredentials()
      queryClient.removeQueries({
        queryKey: ['user'],
      })
    }

    return { userID, userPhone, accessToken, refreshToken, isAuthenticated, signOut, forgetCredentials }
  },
  { persist: true }
)
