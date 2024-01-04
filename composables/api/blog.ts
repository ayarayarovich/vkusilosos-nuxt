import { useQuery, useQueryClient } from '@tanstack/vue-query'

interface Blog {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  name: string
  img: string
  text: string
}

interface UseBlogsResponse {
  list: Blog[]
  total: number
}

interface QueryConfig {
  offset: MaybeRef<number>
  limit: MaybeRef<number>
}

export const useBlogs = (config: QueryConfig) => {
  const publicAxios = usePublicAxiosInstance()

  return useQuery({
    queryKey: ['blogs', { offset: config.offset, limit: config.limit }],
    queryFn: async ({ queryKey }) => {
      const offset = (queryKey[1] as any).offset
      const limit = (queryKey[1] as any).limit

      const response = await publicAxios.get<UseBlogsResponse>('api/blogs', {
        params: {
          offset,
          limit,
        },
      })

      console.log(response.data)
      return response.data
    },
  })
}

export const useInvalidateBlogs = () => {
  const queryClient = useQueryClient()

  return () => {
    queryClient.invalidateQueries({
      queryKey: ['blogs'],
    })
  }
}
