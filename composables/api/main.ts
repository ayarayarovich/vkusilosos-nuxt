import { useQuery, useQueryClient } from '@tanstack/vue-query'
import type { Dish } from '~/interfaces/dishes'
import type { Banner, Story } from '~/interfaces/main'

interface UseMainResponse {
  banners: Banner[]
  deliver_price: number
  from_deliver: number
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

export const useInvalidateMain = () => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({
      queryKey: ['main'],
    })
  }
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
      return response.data
    },
    select,
  })
}
