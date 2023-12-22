import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'
import type { DishInBasket } from '~/interfaces/main'
import { useUserStore } from '~/store/user'
import MyToast from '~/components/MyToast.vue'

interface GetResponse {
  total: number
  list: DishInBasket[]
  total_price: number
}

export const useBasket = <SData>(select: (response: GetResponse) => SData) => {
  const privateAxios = usePrivateAxiosInstance()
  const userStore = useUserStore()

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

      return response.data
    },
    select,
    enabled: userStore.isAuthenticated,
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
    mutationFn: async (vars: any) => {
      const response = await privateAxios.post('user/basket', vars)
      return response
    },
    onSuccess(_, vars: any) {
      if (!vars.id) {
        toast({
          component: MyToast,
          props: {
            title: 'Товар добавлен в корзину:',
            detail: `id: ${vars.dish_id}`,
          },
        })
      }
      invalidate()
    },
  })
}
