import { useQuery } from '@tanstack/vue-query'

export const useQRCode = (enabled: MaybeRefOrGetter<boolean>) => {
  const publicAxios = usePublicAxiosInstance()

  return useQuery({
    queryKey: ['auth-qr-code'],
    queryFn: async () => {
      const response = await publicAxios.get('auth/get_qr')
      return response.data
    },
    staleTime: 0,
    enabled,
  })
}
