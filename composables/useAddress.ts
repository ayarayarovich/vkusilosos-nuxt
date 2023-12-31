import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useInvalidateDishes } from './useDishes'
import { useInvalidateCategories } from './useCategories'
import type { Address } from '~/interfaces/main'
import { useLocationStore } from '~/store/location'
import { useUserStore } from '~/store/user'

interface UseAddressesData {
  list: Address[]
  total: number
}

export const useAddresses = <SData>(select: (response: UseAddressesData) => SData, disabled?: MaybeRef<boolean>) => {
  const privateAxios = usePrivateAxiosInstance()
  const userStore = useUserStore()

  const isEnabled = computed(() => userStore.isAuthenticated && !unref(disabled))

  return useQuery({
    queryKey: ['user', 'addresses'],
    queryFn: async () => {
      const response = await privateAxios.get<any>('user/adres', {
        params: {
          offset: 0,
          limit: 99999999,
        },
      })

      response.data.list.forEach((v: any) => {
        v.user_id = v.user_id || v.UserID
        delete v.UserID
      })

      return response.data as UseAddressesData
    },
    select,
    enabled: isEnabled,
  })
}

export type UseAddressSearchData = {
  lat: number
  lon: number
  display_name: string
}[]

export const useAddressSearch = <SData>(
  search: MaybeRef<string>,
  select: (response: UseAddressSearchData) => SData,
  enabled: MaybeRef<boolean>
) => {
  const privateAxios = usePrivateAxiosInstance()
  const userStore = useUserStore()

  const isEnabled = computed(() => userStore.isAuthenticated && unref(enabled))

  return useQuery({
    queryKey: ['user', 'addresses', { search }],
    queryFn: async ({ queryKey }) => {
      const _search = (queryKey as any)[2].search
      const response = await privateAxios.get<UseAddressSearchData>('user/adres/search', {
        params: {
          search: _search,
        },
      })

      return response.data
    },
    select,
    enabled: isEnabled,
    placeholderData: (prev) => prev,
  })
}

export const useAddressSearchByCoords = <SData>(
  coords: MaybeRef<[number, number]>,
  select: (response: UseAddressSearchData) => SData,
  enabled: MaybeRef<boolean>
) => {
  const privateAxios = usePrivateAxiosInstance()
  const userStore = useUserStore()

  const isEnabled = computed(() => userStore.isAuthenticated && unref(enabled))

  return useQuery({
    queryKey: ['user', 'addresses', { coords }],
    queryFn: async ({ queryKey }) => {
      const _coords = (queryKey as any)[2].coords
      const response = await privateAxios.get<UseAddressSearchData>('user/adres/search', {
        params: {
          latitude: _coords[0],
          longitude: _coords[1],
        },
      })

      return response.data
    },
    select,
    enabled: isEnabled,
    placeholderData: (prev) => prev,
  })
}

export const useInvalidateAddresses = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({
      queryKey: ['user', 'addresses'],
    })
  }
}

export const useAddAddress = () => {
  const privateAxios = usePrivateAxiosInstance()
  const invalidate = useInvalidateAddresses()

  return useMutation({
    mutationFn: async (vars: any) => {
      const response = await privateAxios.post('user/adres', vars)
      return response.data
    },
    onSuccess() {
      invalidate()
    },
  })
}

export const useUpdateAddress = () => {
  const privateAxios = usePrivateAxiosInstance()
  const invalidate = useInvalidateAddresses()

  return useMutation({
    mutationFn: async (vars: any) => {
      const response = await privateAxios.put('user/adres', vars)
      return response.data
    },
    onSuccess() {
      invalidate()
    },
  })
}

export const useDeleteAddress = () => {
  const privateAxios = usePrivateAxiosInstance()
  const invalidate = useInvalidateAddresses()

  return useMutation({
    mutationFn: async (addressID: number) => {
      const response = await privateAxios.delete('user/adres', {
        params: {
          id: addressID,
        },
      })
      return response.data
    },
    onSuccess() {
      invalidate()
    },
  })
}

interface CurrentRestaurant extends IRestaurant {
  type: 'restaurant'
}

interface CurrentDelivery extends Address {
  type: 'delivery'
}
export const useCurrentReciptionWay = () => {
  const locationStore = useLocationStore()
  const { data: user } = useUser((v) => v)
  const { data: addresses } = useAddresses((v) => v.list)
  const { data: rests } = useRestaurants((v) => v)

  return computed(() => {
    if (locationStore.reciptionWay === 'delivery') {
      if (user.value?.adres_id) {
        const addr = addresses.value?.find((v) => v.id === user.value.adres_id)
        if (addr) {
          const retAddr: CurrentDelivery = {
            type: 'delivery',
            ...addr,
          }
          return retAddr
        }
      }
    } else if (locationStore.reciptionWay === 'restaurant') {
      if (user.value?.rest_id) {
        const rest = rests.value?.find((v) => v.id === user.value.rest_id)
        if (rest) {
          const retRest: CurrentRestaurant = {
            type: 'restaurant',
            ...rest,
          }
          return retRest
        }
      }
    }
  })
}

export const useSetCurrentReciptionWay = () => {
  const locationStore = useLocationStore()
  const invalidateDishes = useInvalidateDishes()
  const invalidateCategories = useInvalidateCategories()
  const { mutateAsync } = useSetUser()

  return (reciptionWay: CurrentRestaurant | CurrentDelivery) => {
    if (reciptionWay.type === 'delivery') {
      mutateAsync({
        rest: 0,
        adres: reciptionWay.id,
      }).then(() => {
        locationStore.reciptionWay = 'delivery'
        invalidateCategories()
        invalidateDishes()
      })
    } else if (reciptionWay.type === 'restaurant') {
      mutateAsync({
        adres: 0,
        rest: reciptionWay.id,
      }).then(() => {
        locationStore.reciptionWay = 'restaurant'
        invalidateCategories()
        invalidateDishes()
      })
    }
  }
}
