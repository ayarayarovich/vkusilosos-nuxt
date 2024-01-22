import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { AxiosInstance } from 'axios'
import { useInvalidateDishes } from './dishes'
import { useInvalidateCategories } from './categories'
import type { Address } from '~/interfaces/main'
import { useUserQueryFn, useUserCredentials, useSetUser } from '~/composables/api/user'
import { useRestaurantsQueryFn } from '~/composables/api/restaurants'

interface UseAddressesData {
  list: Address[]
  total: number
}

export const useAddressesQueryFn = async (privateAxios: AxiosInstance) => {
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
}

export const useAddresses = <SData>(select: (response: UseAddressesData) => SData, disabled?: MaybeRef<boolean>) => {
  const privateAxios = usePrivateAxiosInstance()
  const { userCredentials } = useUserCredentials()

  const isEnabled = computed(() => userCredentials.value.isAuthenticated && !unref(disabled))

  return useQuery({
    queryKey: ['user', 'addresses'],
    queryFn: () => useAddressesQueryFn(privateAxios),
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
  const { userCredentials } = useUserCredentials()

  const isEnabled = computed(() => userCredentials.value.isAuthenticated && unref(enabled))

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
  const { userCredentials } = useUserCredentials()

  const isEnabled = computed(() => userCredentials.value.isAuthenticated && unref(enabled))

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
export const useUsersReceptionWay = () => {
  const cookie = useCookie<'delivery' | 'restaurant' | null>('user_reception_way', {
    watch: true,
    default: () => null,
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60,
    secure: process.env.NODE_ENV === 'production',
  })

  const reset = () => {
    cookie.value = null
  }

  return { usersReceptionWay: cookie, resetUsersReceptionWay: reset }
}

export const useCurrentReceptionWay = () => {
  const { userCredentials } = useUserCredentials()
  const { usersReceptionWay } = useUsersReceptionWay()
  const publicAxios = usePublicAxiosInstance()
  const privateAxios = usePrivateAxiosInstance()

  const authenticated = computed(() => (userCredentials.value.isAuthenticated ? 'auth' : 'no-auth'))

  return useQuery({
    queryKey: ['user', 'reception_way', usersReceptionWay, authenticated],
    queryFn: async () => {
      if (userCredentials.value.isAuthenticated) {
        const user = useUserQueryFn(privateAxios)
        const addresses = useAddressesQueryFn(privateAxios)
        const restaurants = useRestaurantsQueryFn(publicAxios)

        return await Promise.all([user, addresses, restaurants]).then(([u, a, r]) => {
          if (usersReceptionWay.value === 'delivery') {
            if (u.adres_id) {
              const addr = a.list.find((v) => v.id === u.adres_id)
              if (addr) {
                const retAddr: CurrentDelivery = {
                  type: 'delivery',
                  ...addr,
                }
                return retAddr
              } else {
                return null
              }
            } else {
              return null
            }
          } else if (usersReceptionWay.value === 'restaurant') {
            if (u.rest_id) {
              const rest = r.find((v) => v.id === u.rest_id)
              if (rest) {
                const retRest: CurrentRestaurant = {
                  type: 'restaurant',
                  ...rest,
                }
                return retRest
              } else {
                return null
              }
            } else {
              return null
            }
          } else {
            return null
          }
        })
      } else {
        return null
      }
    },
  })
}

export const useInvalidateCurrentReceptionWay = () => {
  const queryClient = useQueryClient()
  return () => {
    queryClient.invalidateQueries({
      queryKey: ['user', 'reception_way'],
    })
  }
}

export const useSetCurrentReceptionWay = () => {
  const { usersReceptionWay } = useUsersReceptionWay()
  const invalidateDishes = useInvalidateDishes()
  const invalidateCategories = useInvalidateCategories()
  const invalidateReceptionWay = useInvalidateCurrentReceptionWay()
  const { mutateAsync } = useSetUser()

  return (receptionWay: CurrentRestaurant | CurrentDelivery) => {
    if (receptionWay.type === 'delivery') {
      mutateAsync({
        rest: 0,
        adres: receptionWay.id,
      }).then(() => {
        usersReceptionWay.value = 'delivery'
        invalidateCategories()
        invalidateDishes()
        invalidateReceptionWay()
      })
    } else if (receptionWay.type === 'restaurant') {
      mutateAsync({
        adres: 0,
        rest: receptionWay.id,
      }).then(() => {
        usersReceptionWay.value = 'restaurant'
        invalidateCategories()
        invalidateDishes()
        invalidateReceptionWay()
      })
    }
  }
}
