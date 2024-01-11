import { useQuery } from '@tanstack/vue-query'

export const useQRCode = (enabled: MaybeRefOrGetter<boolean>) => {
  const publicAxios = usePublicAxiosInstance()

  interface Response {
    img: string
    data: string
  }

  return useQuery({
    queryKey: ['auth-qr-code'],
    queryFn: async () => {
      const response = await publicAxios.get<Response>('auth/get_qr')
      return response.data
    },
    staleTime: 0,
    gcTime: 0,
    enabled,
  })
}

export const useCheckQRData = (data: MaybeRef<string>, enabled: MaybeRef<boolean>) => {
  const publicAxios = usePublicAxiosInstance()

  interface Response {
    token: string
    refreshToken: string
  }

  return useQuery({
    queryKey: ['auth-qr-code', 'check-data', data],
    queryFn: async () => {
      const response = await publicAxios.get<Response>('auth/data_qr', {
        params: {
          data: unref(data),
        },
      })
      return response.data
    },
    retryDelay: 2000,
    retry: true,
    enabled,
  })
}
