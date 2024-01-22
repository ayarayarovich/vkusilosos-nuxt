import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'
import type { DishInBasket } from '~/interfaces/main'
import MyToast from '~/components/MyToast.vue'

interface GetResponse {
  total: number
  list: DishInBasket[]
  total_price: number
}

export const useBasket = <SData>(select: (response: GetResponse) => SData) => {
  const privateAxios = usePrivateAxiosInstance()
  const { userCredentials } = useUserCredentials()

  return useQuery({
    queryKey: ['user', 'basket'],
    queryFn: async () => {
      const response = await privateAxios.get<GetResponse>('user/basket', {
        params: {
          offset: 0,
          limit: 99999999,
        },
      })

      response.data.list = response.data.list || []

      if (!response.data.total_price) {
        response.data.total_price = response.data.list.reduce((acc, b) => acc + b.price * b.count, 0)
      }

      return response.data
    },
    select,
    enabled: userCredentials.value.isAuthenticated,
  })
}

export const useInvalidateBasket = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({
      queryKey: ['user', 'basket'],
    })
  }
}

export const useAddToBasket = () => {
  const privateAxios = usePrivateAxiosInstance()
  const invalidate = useInvalidateBasket()
  const toast = useToast()

  return useMutation({
    mutationFn: async (vars: { id?: number; count: number; dish_id: number; dish_name: string }) => {
      const response = await privateAxios.post('user/basket', {
        id: vars.id,
        count: vars.count,
        dish_id: vars.dish_id,
      })
      return response
    },
    onSuccess(_, vars) {
      if (!vars.id) {
        toast({
          component: MyToast,
          props: {
            title: 'Товар добавлен в корзину:',
            detail: vars.dish_name,
          },
        })
      }
      invalidate()
    },
  })
}
