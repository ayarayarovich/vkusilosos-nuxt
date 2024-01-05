import { useQuery, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from "vue";
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
  const {data: currentReceptionWay, isSuccess} = useCurrentReceptionWay()

  return useQuery({
    queryKey: ['dishes', { categoryID, currentReceptionWay }],
    queryFn: async ({ queryKey }) => {
      const _categoryID = (queryKey[1] as any).categoryID

      const params = {
        offset: 0,
        limit: 99999999,
        category: _categoryID,
        adres_id: currentReceptionWay.value?.type === 'delivery' ? currentReceptionWay.value.id : undefined,
        rest_id: currentReceptionWay.value?.type === 'restaurant' ? currentReceptionWay.value.id : undefined
      }

      console.log(params)

      const response = await publicAxios.get<Response>('api/dishes', {
        params
      })

      return response.data
    },
    enabled: isSuccess
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

