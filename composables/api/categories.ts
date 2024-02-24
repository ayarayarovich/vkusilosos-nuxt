import { useQuery, useQueryClient } from '@tanstack/vue-query'
import type { Category } from '~/interfaces/dishes'

export interface UseCategoriesResponse {
  list: Category[]
  total: number
}
export const useCategories = <SData>(select: (response: UseCategoriesResponse) => SData) => {
  const publicAxios = usePublicAxiosInstance()

  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await publicAxios.get<UseCategoriesResponse>('api/categories', {
        params: {
          offset: 0,
          limit: 99999999,
        },
      })
      return response.data
    },
    select,
  })
}

export const useCategory = <SData>(categorySlug: MaybeRef<string>, select: (response: Category) => SData) => {
  const queryClient = useQueryClient()
  const publicAxios = usePublicAxiosInstance()

  return useQuery({
    queryKey: ['categories', { categorySlug }] as [string, { categorySlug: string }],
    queryFn: async ({ queryKey }) => {
      const categories = await queryClient.ensureQueryData({
        queryKey: ['categories'],
        queryFn: async () => {
          const response = await publicAxios.get<UseCategoriesResponse>('api/categories', {
            params: {
              offset: 0,
              limit: 99999999,
            },
          })
          return response.data
        },
      })
      
      return categories.list.find((c) => c.link === queryKey[1].categorySlug)!
    },
    select,
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
