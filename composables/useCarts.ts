import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { Cart } from '~/interfaces/users'
import { useUserStore } from '~/store/user'

interface GetResponse {
  list: Cart[]
  total: number
}

export const useCarts = <SData>(select: (response: GetResponse) => SData) => {
  const privateAxios = usePrivateAxiosInstance()
  const userStore = useUserStore()

  return useQuery({
    queryKey: ['user', 'carts'],
    queryFn: async () => {
      const response = await privateAxios.get<GetResponse>('user/carts', {
        params: {
          limit: 99999999,
          offset: 0,
        },
      })
      return response.data
    },
    select,
    enabled: userStore.isAuthenticated,
  })
}

export const useInvalidateCarts = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({
      queryKey: ['user', 'carts'],
    })
  }
}

export const useDeleteCart = () => {
  const privateAxios = usePrivateAxiosInstance()
  const invalidate = useInvalidateCarts()

  return useMutation({
    mutationFn: async (vars: any) => {
      const response = await privateAxios.delete('user/carts', {
        params: {
          id: vars.id,
        },
      })
      return response.data
    },
    onSuccess: invalidate,
  })
}
