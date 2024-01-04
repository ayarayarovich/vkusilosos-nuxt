import { useQuery, useQueryClient } from '@tanstack/vue-query'

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

export const useRestaurants = <SData>(select: (response: UseRestaurantData) => SData, disabled?: MaybeRef<boolean>) => {
  const publicAxios = usePublicAxiosInstance()
  const {userCredentials} = useUserCredentials()


  const isEnabled = computed(() => userCredentials.value.isAuthenticated && !unref(disabled))

  return useQuery({
    queryKey: ['user', 'restaurants'],
    queryFn: async () => {
      const response = await publicAxios.get<UseRestaurantData>('api/rests', {
        params: {
          offset: 0,
          limit: 99999999,
        },
      })

      return response.data
    },
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
