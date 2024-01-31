import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { AxiosError, AxiosInstance } from 'axios'
import { md5 } from 'js-md5'
import { useToast } from 'vue-toastification'
import type { SetUser, User } from '~/interfaces/users'
import MyToast from '~/components/MyToast.vue'

type GetResponse = User

export const useUserCredentials = () => {
  const cookie = useCookie<{
    accessToken: string
    refreshToken: string
    isAuthenticated: boolean
  }>('user_credentials', {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false,
    watch: true,
    maxAge: 30 * 24 * 60 * 60,
    default: () => ({
      accessToken: '',
      refreshToken: '',
      isAuthenticated: false,
    }),
  })

  const reset = () => {
    cookie.value = {
      accessToken: '',
      refreshToken: '',
      isAuthenticated: false,
    }
  }

  return { userCredentials: cookie, resetUserCredentials: reset }
}

export const useSignOut = () => {
  const { resetUserCredentials } = useUserCredentials()
  const queryClient = useQueryClient()
  const privateAxios = usePrivateAxiosInstance()

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await privateAxios.get('auth/logout')
      return response
    },
    onSuccess: () => {
      resetUserCredentials()
      queryClient.clear()
      queryClient.removeQueries()
      location.reload()
    },
  })

  return mutate
}

export const useUserQueryFn = async (privateAxios: AxiosInstance) => {
  const response = await privateAxios.get<GetResponse>('user/me')
  return response.data
}

export const useUser = <SData>(select: (response: GetResponse) => SData) => {
  const privateAxios = usePrivateAxiosInstance()
  const { userCredentials } = useUserCredentials()

  return useQuery({
    queryKey: ['user'],
    queryFn: () => useUserQueryFn(privateAxios),
    select,
    enabled: !!userCredentials.value,
  })
}

export const useSetUser = () => {
  const privateAxios = usePrivateAxiosInstance()
  const invalidate = useInvalidateUser()

  return useMutation({
    mutationFn: async (data: SetUser) => {
      if (data.last_password) {
        data.last_password = md5(data.last_password)
      }
      if (data.new_password) {
        data.new_password = md5(data.new_password)
      }
      const response = await privateAxios.post('user/me', data)
      return response.data
    },
    onSuccess: invalidate,
  })
}

export const useSendRecovery = () => {
  const publicAxios = usePublicAxiosInstance()

  return useMutation({
    mutationFn: async (vals: { email: string }) => {
      const response = await publicAxios.post('auth/forgot', {
        email: vals.email,
      })
      return response.data
    },
  })
}

export const useSendReview = () => {
  const privateAxios = usePrivateAxiosInstance()

  return useMutation({
    mutationFn: async (vals: any) => {
      const response = await privateAxios.post('api/review', vals)
      return response.data
    },
  })
}

interface UseSendOtpVals {
  phone: string
}
export const useSendOtp = (config: { onCheckCode?: (v: UseSendOtpVals) => void }) => {
  const privateAxios = usePrivateAxiosInstance()
  const toast = useToast()

  return useMutation({
    mutationFn: (vals: UseSendOtpVals) => {
      return privateAxios.post<{ action: string }>('auth/registr', vals).then((r) => r.data)
    },

    onSuccess(data, vals) {
      if (data.action === 'check code') {
        if (config.onCheckCode) config.onCheckCode(vals)
      }
    },

    onError(error: AxiosError) {
      if (error.response?.status === 408) {
        toast({
          component: MyToast,
          props: {
            title: 'Вы уже есть в системе',
            detail: 'Пожалуйста, авторизуйтесь',
          },
        })
      }
    },
  })
}

export const useInvalidateUser = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({
      queryKey: ['user'],
    })
  }
}

export const useFCMToken = () => {
  return useState<string | undefined>('fbToken')
}
