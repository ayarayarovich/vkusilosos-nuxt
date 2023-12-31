import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { SetUser, User } from '~/interfaces/users'
import { useUserStore } from '~/store/user'

type GetResponse = User

export const useUser = <SData>(select: (response: GetResponse) => SData) => {
  const privateAxios = usePrivateAxiosInstance()
  const userStore = useUserStore()

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await privateAxios.get<GetResponse>('user/me')
      return response.data
    },
    select,
    enabled: userStore.isAuthenticated,
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
    onSuccess: invalidate
  })
}


export const useInvalidateUser = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({
      queryKey: ['user']
    })
  }
}