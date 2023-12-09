import { useQuery, useQueryClient } from '@tanstack/vue-query'
import type { Category } from '~/interfaces/dishes'

export const useCategories = () => {
  const publicAxios = usePublicAxiosInstance()

  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await publicAxios.get<{ list: Category[]; total: number }>('api/categories', {
        params: {
          offset: 0,
          limit: 99999999,
        },
      })
      return response.data.list
    },
  })
}

export const useInvalidateCategories = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({
      queryKey: ['categories'],
    })
  }
}
