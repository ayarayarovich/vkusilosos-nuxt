import { useQuery, useQueryClient } from '@tanstack/vue-query'
import type { Dish } from '~/interfaces/dishes'
import type { Banner, Story } from '~/interfaces/main'

interface PromoBySum {
  promo: 'sum'
  sum: number
  gift: Dish
}

interface PromoByDish {
  promo: 'dish'
  dish: Dish
  gift: Dish
  count: number
}

interface UseMainResponse {
  banners: Banner[]
  deliver_price: number
  from_deliver: number
  percent_order: number
  time_deliver: string
  recomendation: Dish[]
  stories: Story[]
  promo?: PromoByDish | PromoBySum
}

export const useMain = <SData>(select: (response: UseMainResponse) => SData) => {
  const publicAxios = usePublicAxiosInstance()

  return useQuery({
    queryKey: ['main'],
    queryFn: async () => {
      interface _PromoSum {
        promo: 'sum'
        sum: number
        gift_id: number
      }
      interface _PromoDish {
        promo: 'dish'
        dish_id: number
        gift_id: number
        count: number
      }
      const response = await publicAxios.get<{
        banners: Banner[]
        deliver_price: number
        time_deliver: string
        from_deliver: number
        percent_order: number
        recomendation: Dish[]
        stories: Story[]
        promo: _PromoSum | _PromoDish
      }>('api/main')

      const data: UseMainResponse = {
        banners: response.data.banners,
        deliver_price: response.data.deliver_price,
        from_deliver: response.data.from_deliver,
        time_deliver: response.data.time_deliver,
        percent_order: response.data.percent_order,
        stories: response.data.stories,
        recomendation: response.data.recomendation,
      }

      if (response.data.promo.promo === 'dish') {
        const gift = await publicAxios.get('api/dish', {
          params: {
            id: response.data.promo.gift_id,
          },
        })
        const dish = await publicAxios.get('api/dish', {
          params: {
            id: response.data.promo.dish_id,
          },
        })

        data.promo = {
          promo: 'dish',
          count: response.data.promo.count,
          dish: dish.data,
          gift: gift.data,
        }
      } else if (response.data.promo.promo === 'sum') {
        const gift = await publicAxios.get('api/dish', {
          params: {
            id: response.data.promo.gift_id,
          },
        })

        data.promo = {
          promo: 'sum',
          gift: gift.data,
          sum: response.data.promo.sum,
        }
      }

      return data
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
