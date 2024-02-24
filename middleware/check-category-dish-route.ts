import { useQueryClient } from '@tanstack/vue-query'
import { type DishDetails } from '~/interfaces/dishes'

export default defineNuxtRouteMiddleware(async (to) => {
  const queryClient = useQueryClient()
  const publicAxios = usePublicAxiosInstance()

  const dishLink = to.params.dish_slug as string

  try {
    await queryClient.ensureQueryData({
      queryKey: ['dishes', { dishLink }],
      queryFn: async ({ queryKey }) => {
        const _dishLink = (queryKey[1] as any).dishLink

        const response = await publicAxios.get<DishDetails>('api/dish', {
          params: {
            dish_link: _dishLink,
          },
        })

        return response.data
      },
    })
  } catch {
    return navigateTo('/not-found', { redirectCode: 404 })
  }
})
