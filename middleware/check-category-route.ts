import { useQueryClient } from '@tanstack/vue-query'
import { type UseCategoriesResponse } from '~/composables/api/categories'

export default defineNuxtRouteMiddleware(async (to) => {
  const queryClient = useQueryClient()
  const publicAxios = usePublicAxiosInstance()

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

  if (!categories.list.find((c) => c.link === to.params.category_slug)) {
    return navigateTo('/not-found', { redirectCode: 404 })
  }
})
