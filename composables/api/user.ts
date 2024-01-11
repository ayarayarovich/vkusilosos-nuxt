import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { AxiosInstance } from 'axios'
import { useUsersReceptionWay } from './addresses'
import type { SetUser, User } from '~/interfaces/users'

type GetResponse = User

export const useUserCredentials = () => {
  const cookie = useCookie<{
    accessToken: string
    refreshToken: string
    isAuthenticated: boolean
  }>('user_credentials', {
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false,
    watch: true,
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
  const { resetUsersReceptionWay } = useUsersReceptionWay()
  const queryClient = useQueryClient()
  const privateAxios = usePrivateAxiosInstance()

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await privateAxios.get('auth/logout')
      return response
    },
    onSuccess: () => {
      resetUserCredentials()
      resetUsersReceptionWay()
      queryClient.removeQueries({
        queryKey: ['user'],
      })
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
      const response = await privateAxios.post('user/me', data)
      return response.data
    },
    onSuccess: invalidate,
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
