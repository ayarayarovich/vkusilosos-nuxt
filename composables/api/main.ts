import { useQuery } from '@tanstack/vue-query'
import type { Dish } from '~/interfaces/dishes'
import type { Banner, Story } from '~/interfaces/main'

interface UseMainResponse {
  banners: Banner[]
  percent_order: number
  recomendation: Dish[]
  stories: Story[]
}

export const useMain = <SData>(select: (response: UseMainResponse) => SData) => {
  const publicAxios = usePublicAxiosInstance()

  return useQuery({
    queryKey: ['main'],
    queryFn: async () => {
      const response = await publicAxios.get<UseMainResponse>('api/main')
      return response.data
    },
    select,
  })
}

interface UseSiteInfoResponse {
  email: string
  insta: string
  phone: string
  viber: string
  whatsapp: string
  vk: string
  youtube: string
}
export const useSiteInfo = <SData>(select: (response: UseSiteInfoResponse) => SData) => {
  const publicAxios = usePublicAxiosInstance()

  return useQuery({
    queryKey: ['site-info'],
    queryFn: async () => {
      const response = await publicAxios.get<UseSiteInfoResponse>('api/info')
      console.log(response.data)
      return response.data
    },
    select,
  })
}
