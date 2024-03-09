import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useToast } from 'vue-toastification'
import type { DishInBasket } from '~/interfaces/main'
import MyToast from '~/components/MyToast.vue'

interface GetBasketResponse {
  total: number
  gifts: {
    coins_can_use: number
    discount_all: number
  }
  list: DishInBasket[]
  total_price: number
}

export const useBasket = <SData>(select: (response: GetBasketResponse) => SData) => {
  const privateAxios = usePrivateAxiosInstance()
  const { userCredentials } = useUserCredentials()

  return useQuery({
    queryKey: ['user', 'basket'],
    queryFn: async () => {
      const response = await privateAxios.get<GetBasketResponse>('user/basket', {
        params: {
          offset: 0,
          limit: 99999999,
        },
      })

      response.data.list = response.data.list || []

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

interface UseBasketWithGiftsOptions {
  enabled?: MaybeRef<boolean>
  coupon?: MaybeRef<string>
}

export const useBasketWithGifts = <SData>(
  select: (response: GetBasketResponse) => SData,
  options: UseBasketWithGiftsOptions = {}
) => {
  const { coupon = '', enabled = false } = options
  const privateAxios = usePrivateAxiosInstance()
  const { userCredentials } = useUserCredentials()

  return useQuery({
    queryKey: ['user', 'basket', 'with-gifts', { coupon }] as [string, string, string, { coupon: string }],
    queryFn: async ({ queryKey }) => {
      const response = await privateAxios.get<GetBasketResponse>('user/basket', {
        params: {
          offset: 0,
          limit: 99999999,
          check_basket: true,
          coupon: queryKey[3].coupon || undefined,
        },
      })

      response.data.list = response.data.list || []

      return response.data
    },
    select,
    enabled: computed(() => userCredentials.value.isAuthenticated && unref(enabled)),
    placeholderData: (v) => v,
  })
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
