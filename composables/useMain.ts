import { useQuery } from '@tanstack/vue-query'
import type { Dish } from '~/interfaces/dishes'
import type { Banner, Story } from '~/interfaces/main'

interface GetResponse {
  banners: Banner[]
  percent_order: number
  recomendation: Dish[]
  stories: Story[]
}

export const useMain = <SData>(select: (response: GetResponse) => SData) => {
  const publicAxios = usePublicAxiosInstance()

  return useQuery({
    queryKey: ['main'],
    queryFn: async () => {
      const response = await publicAxios.get<GetResponse>('api/main')
      return response.data
    },
    select,
  })
}
