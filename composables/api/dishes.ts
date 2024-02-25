import { useQuery, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from 'vue'
import { useCurrentReceptionWay } from './addresses'
import type { Dish, Tag, DishDetails } from '~/interfaces/dishes'
import { useLocationStore } from '~/store/location'

export const useInvalidateDishes = () => {
  const queryClient = useQueryClient()
  const locationStore = useLocationStore()
  return () => {
    locationStore.canDeliver = true
    queryClient.invalidateQueries({
      queryKey: ['dishes'],
    })
  }
}

interface UseDishesParams {
  categorySlug?: MaybeRef<string>
}
export const useDishes = ({ categorySlug }: UseDishesParams) => {
  interface Response {
    dishes: Dish[]
    tags: Tag[]
    can_deliver: boolean
    total: number
  }

  const publicAxios = usePublicAxiosInstance()
  const privateAxios = usePrivateAxiosInstance()
  const { data: currentReceptionWay, isSuccess } = useCurrentReceptionWay()
  const locationStore = useLocationStore()

  return useQuery({
    queryKey: ['dishes', { currentReceptionWay, categorySlug }],
    queryFn: async ({ queryKey }) => {
      const _categorySlug = (queryKey[1] as any).categorySlug

      if (!_categorySlug) {
        return {
          dishes: [],
          tags: [],
          can_deliver: false,
          total: 0,
        }
      }

      if (currentReceptionWay.value) {
        const params = {
          offset: 0,
          limit: 99999999,
          category_link: _categorySlug,
          adres_id: currentReceptionWay.value.type === 'delivery' ? currentReceptionWay.value.id : undefined,
          rest_id: currentReceptionWay.value.type === 'restaurant' ? currentReceptionWay.value.id : undefined,
        }

        const response = await privateAxios.get<Response>('api/dishes', {
          params,
        })

        for (const d of response.data.dishes) {
          d.can_deliver = response.data.can_deliver
          if (locationStore.canDeliver == null) {
            locationStore.canDeliver = d.can_deliver
          }
          locationStore.canDeliver = d.can_deliver && locationStore.canDeliver
        }

        return response.data
      }

      const params = {
        offset: 0,
        limit: 99999999,
        category_link: _categorySlug,
      }

      const response = await publicAxios.get<Response>('api/dishes', {
        params,
      })

      for (const d of response.data.dishes) {
        d.can_deliver = response.data.can_deliver
      }
      locationStore.canDeliver = true

      return response.data
    },
    enabled: isSuccess,
  })
}

export const useDish = (dishLink: MaybeRefOrGetter<string>, enabled: MaybeRefOrGetter<boolean>) => {
  type Response = DishDetails

  const publicAxios = usePublicAxiosInstance()

  return useQuery({
    queryKey: ['dishes', { dishLink }],
    queryFn: async ({ queryKey }) => {
      const _dishLink = (queryKey[1] as any).dishLink

      const response = await publicAxios.get<Response>('api/dish', {
        params: {
          dish_link: _dishLink,
        },
      })

      return response.data
    },
    enabled,
  })
}

export interface Addition {
  id: number
  name: string
  img: string
  price: number
  weight: number
  count: number
}

type UseAdditionsResponse = Addition[]

export const useAdditions = <SData>(select: (response: UseAdditionsResponse) => SData) => {
  const publicAxios = usePublicAxiosInstance()
  return useQuery({
    queryKey: ['additions'],
    queryFn: async () => {
      const response = await publicAxios.get<UseAdditionsResponse>('api/adds')
      return response.data
    },
    select,
  })
}
