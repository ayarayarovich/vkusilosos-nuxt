import { useQuery, useQueryClient } from '@tanstack/vue-query'

interface Promo {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  name: string
  img: string
  text: string
}

interface UseBlogsResponse {
  list: Promo[]
  total: number
}

interface QueryConfig {
  offset: MaybeRef<number>
  limit: MaybeRef<number>
}

export const usePromos = (config: QueryConfig) => {
  const publicAxios = usePublicAxiosInstance()

  return useQuery({
    queryKey: ['promos', { offset: config.offset, limit: config.limit }],
    queryFn: async ({ queryKey }) => {
      const offset = (queryKey[1] as any).offset
      const limit = (queryKey[1] as any).limit

      const response = await publicAxios.get<UseBlogsResponse>('api/promos', {
        params: {
          offset,
          limit,
        },
      })

      return response.data
    },
    placeholderData: (prev: any) => prev,
  })
}

interface UsePromoResponse {
  start: string
  end: string
  id: number
  img: string
  name: string
  text: string
}
export const usePromo = <SData>(id: MaybeRef<string>, select: (response: UsePromoResponse) => SData) => {
  const publicAxios = usePublicAxiosInstance()

  return useQuery({
    queryKey: ['promos', { id }],
    queryFn: async ({ queryKey }) => {
      const id = (queryKey[1] as any).id as string

      const response = await publicAxios.get<UsePromoResponse>('api/promo', {
        params: {
          id,
        },
      })

      return response.data
    },
    select,
  })
}

export const useInvalidatePromos = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({
      queryKey: ['promos'],
    })
  }
}
