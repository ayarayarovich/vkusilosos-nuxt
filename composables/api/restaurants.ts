import { useQuery, useQueryClient } from '@tanstack/vue-query'
import type { AxiosInstance } from 'axios'

export interface IRestaurant {
  id: number
  name: string
  adres: string
  from_hour: string
  description: string
  lat: number
  lng: number
}

type UseRestaurantData = IRestaurant[]

export const parseFromHour = (s: string) => {
  const regex = /^(пн|вт|ср|чт|пт|сб|вс)\s*-\s*(пн|вт|ср|чт|пт|сб|вс)\s*(\d\d)\s*:\s*(\d\d)\s*-\s*(\d\d)\s*:\s*(\d\d)$/g

  const groups = s.matchAll(regex).next().value
  const days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
  let fromDay = days.findIndex((v) => groups[1] === v)
  let toDay = days.findIndex((v) => groups[2] === v)
  fromDay = fromDay === -1 ? 0 : fromDay
  toDay = toDay === -1 ? 6 : toDay

  const fromHours = Number(groups[3] || '11')
  const fromMinutes = Number(groups[4] || '00')
  const toHours = Number(groups[5] || '22')
  const toMinutes = Number(groups[6] || '30')

  return { fromDay, toDay, fromHours, fromMinutes, toHours, toMinutes }
}

export const useRestaurantsQueryFn = async (publicAxios: AxiosInstance) => {
  const response = await publicAxios.get<UseRestaurantData>('api/rests', {
    params: {
      offset: 0,
      limit: 99999999,
    },
  })

  response.data.forEach((i) => parseFromHour(i.from_hour))

  return response.data
}

export const useRestaurants = <SData>(select: (response: UseRestaurantData) => SData, disabled?: MaybeRef<boolean>) => {
  const publicAxios = usePublicAxiosInstance()

  const isEnabled = computed(() => !unref(disabled))

  return useQuery({
    queryKey: ['user', 'restaurants'],
    queryFn: () => useRestaurantsQueryFn(publicAxios),
    select,
    enabled: isEnabled,
  })
}

export const useInvalidateRestaurants = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({
      queryKey: ['user', 'restaurants'],
    })
  }
}
