import { useQuery, useQueryClient } from '@tanstack/vue-query'
import type { Dish, Tag } from '~/interfaces/dishes'

export const useDishes = (categoryID: MaybeRefOrGetter<number>) => {
  interface Response {
    dishes: Dish[]
    tags: Tag[],
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

export const useInvalidateDishes = () => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({
      queryKey: ['dishes'],
    })
  }
}
