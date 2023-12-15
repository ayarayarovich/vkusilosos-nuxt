import { useQuery, useQueryClient } from '@tanstack/vue-query'
import type { Dish, Tag, DishDetails } from '~/interfaces/dishes'

export const useDishes = (categoryID: MaybeRefOrGetter<number>) => {
  interface Response {
    dishes: Dish[]
    tags: Tag[]
    can_deliver: boolean
    total: number
  }

  const publicAxios = usePublicAxiosInstance()

  return useQuery({
    queryKey: ['dishes', { categoryID }],
    queryFn: async ({ queryKey }) => {
      const _categoryID = (queryKey[1] as any).categoryID

      const response = await publicAxios.get<Response>('api/dishes', {
        params: {
          offset: 0,
          limit: 99999999,
          category: _categoryID,
        },
      })

      return response.data
    },
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

export const useInvalidateDishes = () => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({
      queryKey: ['dishes'],
    })
  }
}
