import { computed, unref } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { Order } from '~/interfaces/users'

interface GetResponse {
  active_orders: Order[]
  last_orders: Order[]
  total: number
}

export const useOrders = <SData>(select: (response: GetResponse) => SData) => {
  const privateAxios = usePrivateAxiosInstance()
  const { userCredentials } = useUserCredentials()

  return useQuery({
    queryKey: ['user', 'orders'],
    queryFn: async () => {
      const response = await privateAxios.get<GetResponse>('user/orders/stories', {
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

interface UseOrderData {
  list: {
    name: string
    price: number
    count: number
  }[]
  id: number
  total: number
}

interface UseOrderConfig<SData> {
  orderID: MaybeRefOrGetter<number>
  select: (response: UseOrderData) => SData
  enabled: MaybeRefOrGetter<boolean>
}

export const useOrder = <SData>({ orderID, select, enabled }: UseOrderConfig<SData>) => {
  const privateAxios = usePrivateAxiosInstance()
  const { userCredentials } = useUserCredentials()

  const isEnabled = computed(() => unref(enabled) && userCredentials.value.isAuthenticated)

  return useQuery({
    queryKey: ['user', 'orders', { orderID }],
    queryFn: async ({ queryKey }) => {
      const _orderID = (queryKey as any)[2].orderID
      const response = await privateAxios.get<UseOrderData>('user/order/story', {
        params: {
          id: _orderID,
        },
      })

      return response.data
    },
    select,
    enabled: isEnabled,
  })
}

export const useInvalidateOrders = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({
      queryKey: ['user', 'orders'],
    })
  }
}

export const useCreateOrder = () => {
  const privateAxios = usePrivateAxiosInstance()

  return useMutation({
    mutationFn: async (vals: any) => {
      const response = await privateAxios.post('user/order', vals)
      return response.data
    },
  })
}
