import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { Cart } from '~/interfaces/users'

interface GetResponse {
  list: Cart[]
  total: number
}

export const useCarts = <SData>(select: (response: GetResponse) => SData) => {
  const privateAxios = usePrivateAxiosInstance()
  const {userCredentials} = useUserCredentials()


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
    enabled: userCredentials.value.isAuthenticated,
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
      const response = await privateAxios.delete('user/cart', {
        params: {
          id: vars.id,
        },
      })
      return response.data
    },
    onSuccess: invalidate,
  })
}
