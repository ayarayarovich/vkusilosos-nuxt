import { useQuery, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from 'vue'
import { useCurrentReceptionWay } from './addresses'
import type { Dish, Tag, DishDetails } from '~/interfaces/dishes'

export const useInvalidateDishes = () => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({
      queryKey: ['dishes'],
    })
  }
}

export const useDishes = (categoryID: MaybeRef<number>) => {
  interface Response {
    dishes: Dish[]
    tags: Tag[]
    can_deliver: boolean
    total: number
  }

  const publicAxios = usePublicAxiosInstance()
  const privateAxios = usePrivateAxiosInstance()
  const { data: currentReceptionWay, isSuccess } = useCurrentReceptionWay()

  return useQuery({
    queryKey: ['dishes', { categoryID, currentReceptionWay }],
    queryFn: async ({ queryKey }) => {
      const _categoryID = (queryKey[1] as any).categoryID

      if (currentReceptionWay.value) {
        const params = {
          offset: 0,
          limit: 99999999,
          category: _categoryID,
          adres_id: currentReceptionWay.value.type === 'delivery' ? currentReceptionWay.value.id : undefined,
          rest_id: currentReceptionWay.value.type === 'restaurant' ? currentReceptionWay.value.id : undefined,
        }

        const response = await privateAxios.get<Response>('api/dishes', {
          params,
        })

        for (const d of response.data.dishes) {
          d.can_deliver = response.data.can_deliver
        }

        return response.data
      }

      const params = {
        offset: 0,
        limit: 99999999,
        category: _categoryID,
      }

      const response = await publicAxios.get<Response>('api/dishes', {
        params,
      })

      for (const d of response.data.dishes) {
        d.can_deliver = response.data.can_deliver
      }

      return response.data
    },
    enabled: isSuccess,
  })
}

export const useDish = (dishID: MaybeRefOrGetter<number>, enabled: MaybeRefOrGetter<boolean>) => {
  type Response = DishDetails

  const publicAxios = usePublicAxiosInstance()

  return useQuery({
    queryKey: ['dishes', { dishID }],
    queryFn: async ({ queryKey }) => {
      const _dishID = (queryKey[1] as any).dishID

      const response = await publicAxios.get<Response>('api/dish', {
        params: {
          id: _dishID,
        },
      })

      return response.data
    },
    enabled,
  })
}

export interface Addition {
  id: number
  name: string
  img: string
  price: number
  weight: number
  count: number
}

type UseAdditionsResponse = Addition[]

export const useAdditions = <SData>(select: (response: UseAdditionsResponse) => SData) => {
  const publicAxios = usePublicAxiosInstance()
  return useQuery({
    queryKey: ['additions'],
    queryFn: async () => {
      const response = await publicAxios.get<UseAdditionsResponse>('api/adds')
      return response.data
    },
    select,
  })
}
