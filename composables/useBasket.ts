import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { DishInBasket } from '~/interfaces/main'

interface GetResponse {
  total: number
  list: DishInBasket[]
  total_price: number
  total_count: number
}

export const useBasket = <SData>(select: (response: GetResponse) => SData) => {
  const privateAxios = usePrivateAxiosInstance()

  return useQuery({
    queryKey: ['basket'],
    queryFn: async () => {
      const response = await privateAxios.get<GetResponse>('user/basket', {
        params: {
          offset: 0,
          limit: 99999999
        }
      })
      
      response.data.list = response.data.list || []
      
      return response.data
    },
    select,
  })
}

export const useInvalidateBasket = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({
      queryKey: ['basket']
    })
  }
}

export const useAddToBasket = () => {
  const privateAxios = usePrivateAxiosInstance()
  const invalidate = useInvalidateBasket()

  return useMutation({
    mutationFn: async (vars: any) => {
      const response = await privateAxios.post('user/basket', vars)
      return response
    },
    onSuccess() {
      invalidate()
    }
  })
}